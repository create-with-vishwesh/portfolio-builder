import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Types for portfolio data
interface PortfolioData {
  aboutMe?: string
  jobTitle?: string
  profileImage?: string
  socialLinks?: Record<string, string>
  projects?: ProjectData[]
  skills?: SkillData[]
  isPublic?: boolean
}

interface ProjectData {
  title: string
  description?: string
  projectUrl?: string
  githubUrl?: string
  imageUrl?: string
  technologies?: string[]
}

interface SkillData {
  name: string
  category?: string
  level?: string
}

// GET - Fetch user's portfolio
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: session.user.id },
      include: {
        projects: {
          orderBy: { order: 'asc' }
        },
        skills: {
          orderBy: { order: 'asc' }
        }
      }
    })

    return NextResponse.json({ portfolio })
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create or update user's portfolio
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const portfolioData: PortfolioData = await request.json()
    
    // Validate required fields
    if (!portfolioData) {
      return NextResponse.json({ error: "Portfolio data is required" }, { status: 400 })
    }

    const {
      aboutMe,
      jobTitle,
      profileImage,
      socialLinks,
      projects = [],
      skills = [],
      isPublic = false
    } = portfolioData

    // Generate slug from user name/email
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const slug = (user.name || user.email || 'user').toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') + '-' + session.user.id.slice(-4)

    // Use transaction to ensure data consistency
    const portfolio = await prisma.$transaction(async (tx) => {
      // Upsert portfolio
      const portfolioData = await tx.portfolio.upsert({
        where: { userId: session.user.id },
        update: {
          aboutMe: aboutMe || "",
          jobTitle: jobTitle || "",
          profileImage: profileImage || "",
          socialLinks: socialLinks || {},
          isPublic,
          updatedAt: new Date()
        },
        create: {
          userId: session.user.id,
          slug,
          aboutMe: aboutMe || "",
          jobTitle: jobTitle || "",
          profileImage: profileImage || "",
          socialLinks: socialLinks || {},
          isPublic,
        }
      })

      // Delete existing projects and skills, then recreate
      await tx.project.deleteMany({
        where: { portfolioId: portfolioData.id }
      })

      await tx.skill.deleteMany({
        where: { portfolioId: portfolioData.id }
      })

      // Create new projects if any
      if (projects.length > 0) {
        const validProjects = projects.filter((project: ProjectData) => 
          project.title && project.title.trim() !== ""
        )
        
        if (validProjects.length > 0) {
          await tx.project.createMany({
            data: validProjects.map((project: ProjectData, index: number) => ({
              portfolioId: portfolioData.id,
              title: project.title,
              description: project.description || "",
              projectUrl: project.projectUrl || "",
              githubUrl: project.githubUrl || "",
              imageUrl: project.imageUrl || "",
              technologies: project.technologies || [],
              order: index
            }))
          })
        }
      }

      // Create new skills if any
      if (skills.length > 0) {
        const validSkills = skills.filter((skill: SkillData) => 
          skill.name && skill.name.trim() !== ""
        )
        
        if (validSkills.length > 0) {
          await tx.skill.createMany({
            data: validSkills.map((skill: SkillData, index: number) => ({
              portfolioId: portfolioData.id,
              name: skill.name,
              category: skill.category || "Other",
              level: skill.level || "Intermediate",
              order: index
            }))
          })
        }
      }

      // Return updated portfolio with relations
      return await tx.portfolio.findUnique({
        where: { id: portfolioData.id },
        include: {
          projects: {
            orderBy: { order: 'asc' }
          },
          skills: {
            orderBy: { order: 'asc' }
          }
        }
      })
    })

    return NextResponse.json({ 
      message: "Portfolio saved successfully",
      portfolio 
    })

  } catch (error) {
    console.error("Error saving portfolio:", error)
    return NextResponse.json({ 
      error: "Failed to save portfolio",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}