import Image from "next/image"
import Link from "next/link"
import { LinkIcon, ArrowTopRightOnSquareIcon, EnvelopeIcon } from "@heroicons/react/24/outline"

interface TemplateProps {
  user: {
    name: string | null
    email: string | null
    image: string | null
    username: string
  }
  portfolio: {
    aboutMe: string | null
    jobTitle: string | null
    profileImage: string | null
    socialLinks: Record<string, string>
    projects: any[]
    skills: any[]
  }
}

// Social link icons mapping for Onyx theme
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
    website: <LinkIcon className="w-6 h-6" />
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-white transition-colors duration-200"
    >
      {icons[platform as keyof typeof icons] || icons.website}
    </a>
  )
}

// Skill badge component for Onyx theme
const SkillBadge = ({ skill }: { skill: any }) => {
  const levelColors = {
    Beginner: "bg-gray-600 text-gray-200 border-gray-500",
    Intermediate: "bg-gray-700 text-gray-100 border-gray-600", 
    Advanced: "bg-gray-800 text-white border-gray-700"
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

// Project card component for Onyx theme
const ProjectCard = ({ project }: { project: any }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl hover:border-gray-600 transition-all duration-300">
      {project.imageUrl && (
        <div className="relative h-48 bg-gray-700">
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
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        {project.description && (
          <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
        )}
        
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech: string, index: number) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-700 text-gray-200 text-sm rounded-md border border-gray-600"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex space-x-3">
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
              className="inline-flex items-center px-4 py-2 border border-gray-600 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
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

export default function OnyxTemplate({ user, portfolio }: TemplateProps) {
  const socialLinks = portfolio.socialLinks || {}

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Profile Image */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              {(portfolio.profileImage || user.image) ? (
                <Image
                  src={portfolio.profileImage || user.image!}
                  alt={user.name || "Profile"}
                  fill
                  className="rounded-full object-cover border-4 border-gray-700"
                  sizes="128px"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-700 border-4 border-gray-600 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-300">
                    {user.name?.charAt(0) || user.username.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Name and Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {user.name || user.username}
            </h1>
            {portfolio.jobTitle && (
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {portfolio.jobTitle}
              </p>
            )}

            {/* About Me */}
            {portfolio.aboutMe && (
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
                {portfolio.aboutMe}
              </p>
            )}

            {/* Social Links */}
            {Object.entries(socialLinks).length > 0 && (
              <div className="flex justify-center space-x-6 mb-8">
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <SocialIcon key={platform} platform={platform} url={url} />
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
      </div>

      {/* Projects Section */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {portfolio.skills.map((skill, index) => (
                <SkillBadge key={index} skill={skill} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} {user.name || user.username}.
            <span className="ml-2">
              Built with{" "}
              <Link
                href="/"
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Port4lio
              </Link>
            </span>
          </p>
        </div>
      </footer>
    </div>
  )
}