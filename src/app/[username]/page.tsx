import { notFound } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import OnyxTemplate from "@/components/templates/OnyxTemplate"
import QuartzTemplate from "@/components/templates/QuartzTemplate"
import SapphireTemplate from "@/components/templates/SapphireTemplate"
import CreativeTemplate from "@/components/templates/CreativeTemplate"
import TerminalTemplate from "@/components/templates/TerminalTemplate"
import ModernTemplate from "@/components/templates/ModernTemplate"
import DataTemplate from "@/components/templates/DataTemplate"
import ProTemplate from "@/components/templates/ProTemplate"
import CustomLayoutPortfolio from "../../components/CustomLayoutPortfolio"

const prisma = new PrismaClient()

// Server-side data fetching
async function getPortfolioByUsername(username: string) {
  try {
    // For now, we'll use the portfolio slug to find the user
    // After schema update, this will use the username field
    const portfolio = await prisma.portfolio.findUnique({
      where: { slug: username },
      include: {
        user: true,
        projects: {
          orderBy: { order: 'asc' }
        },
        skills: {
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!portfolio || !portfolio.isPublic) {
      return null
    }

    // Increment view count
    await prisma.portfolio.update({
      where: { id: portfolio.id },
      data: { viewCount: { increment: 1 } } as any
    })

    return {
      user: {
        name: portfolio.user.name,
        email: portfolio.user.email,
        image: portfolio.user.image,
        username: username // This will be portfolio.user.username after schema update
      },
      portfolio
    }
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}

// Main portfolio page component
export default async function PortfolioPage({
  params,
}: {
  params: { username: string }
}) {
  const data = await getPortfolioByUsername(params.username)

  if (!data) {
    notFound()
  }

  const { user, portfolio } = data
  
  // Get the template from portfolio data, fallback to "onyx" if not set
  const template = (portfolio as any).template || "onyx"
  
  // Check if user has a custom layout
  const hasCustomLayout = (portfolio as any).layout && Array.isArray((portfolio as any).layout) && (portfolio as any).layout.length > 0

  // If there's a custom layout, use the CustomLayoutPortfolio component
  if (hasCustomLayout) {
    return (
      <CustomLayoutPortfolio
        user={user}
        portfolio={{
          aboutMe: portfolio.aboutMe || undefined,
          jobTitle: portfolio.jobTitle || undefined,
          profileImage: portfolio.profileImage || undefined,
          socialLinks: (portfolio.socialLinks as Record<string, string>) || {},
          projects: portfolio.projects || [],
          skills: portfolio.skills || [],
          template: template,
          layout: (portfolio as any).layout
        }}
      />
    )
  }
  
  // Otherwise, use the original template components
  const templateProps = {
    user: {
      name: user.name,
      email: user.email,
      image: user.image,
      username: params.username
    },
    portfolio: {
      aboutMe: portfolio.aboutMe,
      jobTitle: portfolio.jobTitle,
      profileImage: portfolio.profileImage,
      socialLinks: (portfolio.socialLinks as Record<string, string>) || {},
      projects: portfolio.projects || [],
      skills: portfolio.skills || []
    }
  }

  // Render the appropriate template based on user's choice
  switch (template) {
    case "pro":
      return <ProTemplate {...templateProps} />
    case "creative":
      return <CreativeTemplate {...templateProps} />
    case "terminal":
      return <TerminalTemplate {...templateProps} />
    case "modern":
      return <ModernTemplate {...templateProps} />
    case "data":
      return <DataTemplate {...templateProps} />
    case "quartz":
      return <QuartzTemplate {...templateProps} />
    case "sapphire":
      return <SapphireTemplate {...templateProps} />
    case "onyx":
    default:
      return <OnyxTemplate {...templateProps} />
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { username: string }
}) {
  const data = await getPortfolioByUsername(params.username)

  if (!data) {
    return {
      title: "Portfolio Not Found",
      description: "The requested portfolio could not be found."
    }
  }

  const { user, portfolio } = data

  return {
    title: `${user.name || user.username} - Portfolio`,
    description: portfolio.aboutMe ? 
      `${portfolio.aboutMe.substring(0, 160)}...` :
      `Check out ${user.name || user.username}'s professional portfolio.`,
    openGraph: {
      title: `${user.name || user.username} - Portfolio`,
      description: portfolio.aboutMe ? 
        `${portfolio.aboutMe.substring(0, 160)}...` :
        `Check out ${user.name || user.username}'s professional portfolio.`,
      images: portfolio.profileImage || user.image ? [
        {
          url: portfolio.profileImage || user.image || "",
          width: 1200,
          height: 630,
          alt: `${user.name || user.username}'s Profile`
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.name || user.username} - Portfolio`,
      description: portfolio.aboutMe ? 
        `${portfolio.aboutMe.substring(0, 160)}...` :
        `Check out ${user.name || user.username}'s professional portfolio.`,
      images: portfolio.profileImage || user.image ? [portfolio.profileImage || user.image] : [],
    }
  }
}