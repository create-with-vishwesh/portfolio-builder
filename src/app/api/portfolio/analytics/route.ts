import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET - Fetch user's portfolio analytics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find user's portfolio
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: session.user.id },
      select: {
        viewCount: true,
        slug: true,
        isPublic: true,
        createdAt: true
      } as any
    })

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    return NextResponse.json({
      viewCount: (portfolio as any).viewCount || 0,
      slug: portfolio.slug,
      isPublic: portfolio.isPublic,
      createdAt: (portfolio as any).createdAt.toISOString()
    })

  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ 
      error: "Failed to fetch analytics",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}