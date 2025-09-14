import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { layout } = await request.json()

    // Validate layout data
    if (!Array.isArray(layout)) {
      return NextResponse.json({ error: "Layout must be an array" }, { status: 400 })
    }

    // Find the current user's portfolio
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { portfolio: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (!user.portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    // Update the portfolio with the new layout
    await prisma.portfolio.update({
      where: { id: user.portfolio.id },
      data: { layout: layout as any }
    })

    return NextResponse.json({ 
      message: "Layout saved successfully",
      layout: layout 
    })

  } catch (error) {
    console.error("Error saving layout:", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}