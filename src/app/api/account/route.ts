import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { newUsername } = await request.json()

    // Validate username
    if (!newUsername || typeof newUsername !== 'string') {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const trimmedUsername = newUsername.trim()

    // Basic validation
    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
      return NextResponse.json(
        { error: "Username must be between 3 and 20 characters" }, 
        { status: 400 }
      )
    }

    // Check if username contains only allowed characters
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUsername)) {
      return NextResponse.json(
        { error: "Username can only contain letters, numbers, hyphens, and underscores" }, 
        { status: 400 }
      )
    }

    // Check if username is already taken by another user's portfolio
    const existingPortfolio = await prisma.portfolio.findFirst({
      where: {
        slug: trimmedUsername,
        user: { email: { not: session.user.email } } // Exclude current user
      }
    })

    if (existingPortfolio) {
      return NextResponse.json(
        { error: "Username already taken" }, 
        { status: 409 }
      )
    }

    // Find the current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { portfolio: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update the portfolio slug (this serves as the username)
    if (user.portfolio) {
      await prisma.portfolio.update({
        where: { id: user.portfolio.id },
        data: { slug: trimmedUsername }
      })
    } else {
      // Create a portfolio if one doesn't exist
      await prisma.portfolio.create({
        data: {
          userId: user.id,
          slug: trimmedUsername,
          isPublic: false
        }
      })
    }

    return NextResponse.json({ 
      message: "Username updated successfully",
      username: trimmedUsername 
    })

  } catch (error) {
    console.error("Error updating username:", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        portfolio: {
          include: {
            projects: true,
            skills: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Perform cascading delete
    // Delete all projects and skills first (due to foreign key constraints)
    if (user.portfolio) {
      // Delete projects
      if (user.portfolio.projects.length > 0) {
        await prisma.project.deleteMany({
          where: { portfolioId: user.portfolio.id }
        })
      }

      // Delete skills
      if (user.portfolio.skills.length > 0) {
        await prisma.skill.deleteMany({
          where: { portfolioId: user.portfolio.id }
        })
      }

      // Delete portfolio
      await prisma.portfolio.delete({
        where: { id: user.portfolio.id }
      })
    }

    // Finally, delete the user
    await prisma.user.delete({
      where: { id: user.id }
    })

    return NextResponse.json({ 
      message: "Account deleted successfully" 
    })

  } catch (error) {
    console.error("Error deleting account:", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}