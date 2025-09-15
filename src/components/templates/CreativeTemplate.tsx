"use client"

import Image from "next/image"
import Link from "next/link"
import { LinkIcon, ArrowTopRightOnSquareIcon, EnvelopeIcon, PaintBrushIcon, SwatchIcon } from "@heroicons/react/24/outline"

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

// Social link icons mapping for Creative theme
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
    dribbble: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
      </svg>
    ),
    behance: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.34.5-.84.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.67 1.42.67 2.29 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.69.767-.64.17-1.31.25-2.016.25h-6.429V4.503h6.938v.002zm16.056-1.116c-.913 0-1.68.027-2.3.082-.62.055-1.122.145-1.52.27-.396.125-.69.29-.88.495-.19.205-.29.46-.29.763 0 .302.1.557.29.762.19.205.484.37.88.495.398.125.9.215 1.52.27.62.055 1.387.082 2.3.082.91 0 1.68-.027 2.297-.082.62-.055 1.123-.145 1.52-.27.398-.125.69-.29.88-.495.19-.205.29-.46.29-.762 0-.303-.1-.558-.29-.763-.19-.205-.482-.37-.88-.495-.397-.125-.9-.215-1.52-.27-.617-.055-1.387-.082-2.297-.082zM8.217 16.815c.617 0 1.096-.085 1.437-.256.34-.17.512-.454.512-.85 0-.396-.172-.68-.512-.85-.34-.17-.82-.256-1.437-.256H6.22v2.212h1.997zm7.624.256c.454 0 .834-.046 1.14-.14.305-.093.563-.25.773-.47.21-.22.37-.51.482-.87.11-.36.166-.82.166-1.37h-6.615c.05-.97.279-1.65.688-2.04.41-.39.96-.59 1.657-.59.58 0 1.066.11 1.458.33.39.22.712.54.97.96h2.037c-.24-.97-.68-1.74-1.32-2.33-.64-.59-1.527-.88-2.66-.88-1.736 0-3.04.48-3.912 1.44-.872.96-1.31 2.38-1.31 4.26 0 1.88.438 3.3 1.31 4.26.872.96 2.176 1.44 3.912 1.44 1.133 0 2.02-.29 2.66-.88.64-.59 1.08-1.36 1.32-2.33h-2.037c-.258.42-.58.74-.97.96-.392.22-.878.33-1.458.33-.697 0-1.247-.2-1.657-.59-.41-.39-.638-1.07-.688-2.04h6.615c0-.55-.056-1.01-.166-1.37-.112-.36-.272-.65-.482-.87-.21-.22-.468-.377-.773-.47-.306-.094-.686-.14-1.14-.14zm-2.604-7.55c-.41 0-.77-.075-1.085-.225-.316-.15-.585-.36-.806-.63-.22-.27-.39-.59-.51-.96-.12-.37-.18-.77-.18-1.2 0-.88.21-1.54.63-1.98.42-.44.99-.66 1.71-.66.72 0 1.29.22 1.71.66.42.44.63 1.1.63 1.98 0 .43-.06.83-.18 1.2-.12.37-.29.69-.51.96-.22.27-.49.48-.806.63-.315.15-.675.225-1.085.225z"/>
      </svg>
    ),
    website: <LinkIcon className="w-6 h-6" />
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-purple-400 hover:text-purple-300 transition-colors duration-200 p-2 bg-white/10 rounded-full backdrop-blur-sm"
    >
      {icons[platform as keyof typeof icons] || icons.website}
    </a>
  )
}

export default function CreativeTemplate({ user, portfolio }: TemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-yellow-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-pink-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-40 w-28 h-28 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="text-center mb-16">
          <div className="mb-8">
            {portfolio.profileImage ? (
              <div className="relative inline-block">
                <Image
                  src={portfolio.profileImage}
                  alt={user.name || "Profile"}
                  width={140}
                  height={140}
                  className="rounded-full border-4 border-white/30 shadow-2xl"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-400/20"></div>
              </div>
            ) : (
              <div className="w-32 h-32 mx-auto rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>

          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            {user.name || "Your Name"}
          </h1>
          
          {portfolio.jobTitle && (
            <h2 className="text-2xl text-white/90 mb-6 font-light">
              {portfolio.jobTitle}
            </h2>
          )}

          {/* Creative Design Icons */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <PaintBrushIcon className="w-6 h-6 text-white" />
            </div>
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <SwatchIcon className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Social Links */}
          {portfolio.socialLinks && Object.keys(portfolio.socialLinks).length > 0 && (
            <div className="flex justify-center space-x-4">
              {Object.entries(portfolio.socialLinks).map(([platform, url]) => (
                <SocialIcon key={platform} platform={platform} url={url} />
              ))}
            </div>
          )}
        </header>

        {/* About Section */}
        {portfolio.aboutMe && (
          <section className="mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-pink-400 rounded-full mr-4"></div>
                About Me
              </h3>
              <p className="text-white/90 text-lg leading-relaxed font-light">
                {portfolio.aboutMe}
              </p>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
              <div className="w-2 h-8 bg-gradient-to-b from-green-400 to-blue-400 rounded-full mr-4"></div>
              Creative Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.projects
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((project, index) => (
                  <div
                    key={project.id}
                    className="group bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                  >
                    {project.imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                    )}
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">
                        {project.title}
                      </h4>
                      {project.description && (
                        <p className="text-white/80 mb-4 line-clamp-3">
                          {project.description}
                        </p>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-sm backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-sm backdrop-blur-sm">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex space-x-3">
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-white/90 hover:text-white transition-colors bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm"
                          >
                            <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" />
                            View
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-white/90 hover:text-white transition-colors bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm"
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
                ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
              <div className="w-2 h-8 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full mr-4"></div>
              Design Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.skills
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((skill, index) => (
                  <div
                    key={skill.id}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
                      <span className="px-2 py-1 bg-white/20 text-white/90 rounded-full text-xs backdrop-blur-sm">
                        {skill.category}
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-right mt-2">
                      <span className="text-white/80 text-sm">{skill.level}/5</span>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-6">Let's Create Together</h3>
            <p className="text-white/90 text-lg mb-6">
              Ready to bring your ideas to life? Let's collaborate on something amazing!
            </p>
            <a
              href={`mailto:${user.email}`}
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-white/90 transition-all duration-300 shadow-2xl hover:scale-105"
            >
              <EnvelopeIcon className="w-5 h-5 mr-3" />
              Get In Touch
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}