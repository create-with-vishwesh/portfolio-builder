import { notFound } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { 
  LinkIcon, 
  ArrowTopRightOnSquareIcon,
  EnvelopeIcon,
  MapPinIcon 
} from "@heroicons/react/24/outline"

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

// Social link icons mapping
const SocialIcon = ({ platform, url }: { platform: string; url: string }) => {
  const icons = {
    linkedin: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    github: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    twitter: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    website: (
      <LinkIcon className="w-6 h-6" />
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
      aria-label={`Visit ${platform}`}
    >
      {icons[platform as keyof typeof icons] || <LinkIcon className="w-6 h-6" />}
    </a>
  )
}

// Skill badge component
const SkillBadge = ({ skill }: { skill: any }) => {
  const levelColors = {
    Beginner: "bg-green-100 text-green-800 border-green-200",
    Intermediate: "bg-blue-100 text-blue-800 border-blue-200", 
    Advanced: "bg-purple-100 text-purple-800 border-purple-200"
  }

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${levelColors[skill.level as keyof typeof levelColors] || levelColors.Intermediate}`}>
      <span>{skill.name}</span>
      {skill.level && (
        <span className="ml-2 text-xs opacity-75">
          {skill.level}
        </span>
      )}
    </div>
  )
}

// Project card component
const ProjectCard = ({ project }: { project: any }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {project.imageUrl && (
        <div className="relative h-48 bg-gray-100">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {project.title}
        </h3>
        
        {project.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {project.description}
          </p>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" />
              Live Demo
            </a>
          )}
          
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
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
  const socialLinks = portfolio.socialLinks as Record<string, string> || {}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Profile Image */}
            {(user.image || portfolio.profileImage) && (
              <div className="relative w-32 h-32 mx-auto mb-8">
                <Image
                  src={portfolio.profileImage || user.image || ""}
                  alt={user.name || "Profile"}
                  fill
                  className="rounded-full object-cover border-4 border-white shadow-lg"
                  sizes="128px"
                />
              </div>
            )}

            {/* Name and Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {user.name || `@${user.username}`}
            </h1>
            
            {portfolio.jobTitle && (
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                {portfolio.jobTitle}
              </p>
            )}

            {/* Social Links */}
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex justify-center gap-4 mb-8">
                {Object.entries(socialLinks).map(([platform, url]) => (
                  url && (
                    <SocialIcon key={platform} platform={platform} url={url} />
                  )
                ))}
              </div>
            )}

            {/* Contact Button */}
            {user.email && (
              <a
                href={`mailto:${user.email}`}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                <EnvelopeIcon className="w-5 h-5 mr-2" />
                Get In Touch
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About Me Section */}
        {portfolio.aboutMe && (
          <section className="mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                About Me
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {portfolio.aboutMe}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Skills & Expertise
            </h2>
            
            {/* Group skills by category */}
            {Array.from(new Set(portfolio.skills.map((skill: any) => skill.category || 'Other'))).map((category) => (
              <div key={category} className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {portfolio.skills
                    .filter((skill: any) => (skill.category || 'Other') === category)
                    .map((skill: any, index: number) => (
                      <SkillBadge key={index} skill={skill} />
                    ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Featured Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.projects.map((project: any) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} {user.name || user.username}. 
            <span className="ml-2">
              Built with{" "}
              <Link
                href="/"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Portfolio Builder
              </Link>
            </span>
          </p>
        </div>
      </footer>
    </div>
  )
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