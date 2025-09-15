import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Valid template options
const VALID_TEMPLATES = [
  "onyx", 
  "quartz", 
  "sapphire", 
  "creative", 
  "terminal", 
  "modern", 
  "data", 
  "pro"
]

// POST - Update user's portfolio template
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { template } = body

    // Validate template
    if (!template || !VALID_TEMPLATES.includes(template)) {
      return NextResponse.json({ 
        error: "Invalid template. Must be one of: " + VALID_TEMPLATES.join(", ") 
      }, { status: 400 })
    }

    // Find or create portfolio
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { userId: session.user.id }
    })

    let portfolio

    if (existingPortfolio) {
      // Update existing portfolio template
      portfolio = await prisma.portfolio.update({
        where: { userId: session.user.id },
        data: { template } as any
      })
    } else {
      // Create new portfolio with template
      const user = await prisma.user.findUnique({
        where: { id: session.user.id }
      })
      
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      // Generate slug for new portfolio
      const slug = (user.name || user.email || 'user').toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') + '-' + session.user.id.slice(-4)

      portfolio = await prisma.portfolio.create({
        data: {
          userId: session.user.id,
          slug,
          template,
          isPublic: false
        } as any
      })
    }

    return NextResponse.json({ 
      message: "Template updated successfully",
      portfolio: {
        id: portfolio.id,
        template: (portfolio as any).template,
        slug: portfolio.slug
      }
    })

  } catch (error) {
    console.error("Error updating template:", error)
    return NextResponse.json({ 
      error: "Failed to update template",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}