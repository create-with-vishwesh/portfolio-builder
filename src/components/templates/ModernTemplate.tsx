"use client"

import Image from "next/image"
import Link from "next/link"
import { LinkIcon, ArrowTopRightOnSquareIcon, EnvelopeIcon, CodeBracketIcon, GlobeAltIcon } from "@heroicons/react/24/outline"

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

// Social link icons mapping for Modern theme
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
      className="bg-white/10 p-3 rounded-xl text-blue-200 hover:text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
    >
      {icons[platform as keyof typeof icons] || icons.website}
    </a>
  )
}

export default function ModernTemplate({ user, portfolio }: TemplateProps) {
  const frontendSkills = portfolio.skills?.filter(skill => 
    ['frontend', 'ui/ux', 'design', 'web', 'client'].some(category => 
      skill.category.toLowerCase().includes(category)
    )
  ) || []

  const backendSkills = portfolio.skills?.filter(skill => 
    ['backend', 'server', 'database', 'api', 'infrastructure'].some(category => 
      skill.category.toLowerCase().includes(category)
    )
  ) || []

  const otherSkills = portfolio.skills?.filter(skill => 
    !frontendSkills.includes(skill) && !backendSkills.includes(skill)
  ) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="text-center mb-20">
          <div className="mb-8">
            {portfolio.profileImage ? (
              <div className="relative inline-block">
                <Image
                  src={portfolio.profileImage}
                  alt={user.name || "Profile"}
                  width={150}
                  height={150}
                  className="rounded-full border-4 border-blue-400/50 shadow-2xl"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/20 to-purple-400/20 animate-pulse"></div>
              </div>
            ) : (
              <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-tr from-blue-400 to-purple-600 border-4 border-blue-400/50 flex items-center justify-center shadow-2xl">
                <span className="text-4xl text-white font-bold">
                  {user.name?.[0]?.toUpperCase() || "F"}
                </span>
              </div>
            )}
          </div>

          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            {user.name || "Full Stack Developer"}
          </h1>
          
          {portfolio.jobTitle && (
            <h2 className="text-2xl text-blue-200 mb-8 font-light">
              {portfolio.jobTitle}
            </h2>
          )}

          {/* Tech Stack Icons */}
          <div className="flex justify-center space-x-6 mb-8">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <CodeBracketIcon className="w-8 h-8 text-yellow-400" />
              <div className="text-white text-xs mt-2">Frontend</div>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <GlobeAltIcon className="w-8 h-8 text-green-400" />
              <div className="text-white text-xs mt-2">Backend</div>
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
          <section className="mb-20">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">
              <h3 className="text-4xl font-bold text-white mb-8 text-center">
                About Me
              </h3>
              <p className="text-blue-100 text-xl leading-relaxed text-center max-w-4xl mx-auto">
                {portfolio.aboutMe}
              </p>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="mb-20">
            <h3 className="text-4xl font-bold text-white mb-12 text-center">
              Technical Expertise
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Frontend Skills */}
              {frontendSkills.length > 0 && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <h4 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
                    <CodeBracketIcon className="w-6 h-6 mr-3" />
                    Frontend Development
                  </h4>
                  <div className="space-y-4">
                    {frontendSkills
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map((skill) => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{skill.name}</span>
                            <span className="text-blue-200 text-sm">{skill.level}/5</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${(skill.level / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Backend Skills */}
              {backendSkills.length > 0 && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <h4 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
                    <GlobeAltIcon className="w-6 h-6 mr-3" />
                    Backend Development
                  </h4>
                  <div className="space-y-4">
                    {backendSkills
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map((skill) => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{skill.name}</span>
                            <span className="text-blue-200 text-sm">{skill.level}/5</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${(skill.level / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Other Skills */}
            {otherSkills.length > 0 && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h4 className="text-2xl font-bold text-purple-400 mb-6">
                  Additional Skills
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherSkills
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((skill) => (
                      <div key={skill.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{skill.name}</span>
                          <span className="text-blue-200 text-sm">{skill.level}/5</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${(skill.level / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="mb-20">
            <h3 className="text-4xl font-bold text-white mb-12 text-center">
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {portfolio.projects
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((project, index) => (
                  <div
                    key={project.id}
                    className="group bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 shadow-2xl"
                  >
                    {project.imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    )}
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                        {project.title}
                      </h4>
                      {project.description && (
                        <p className="text-blue-100 mb-4 line-clamp-3">
                          {project.description}
                        </p>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-white/20 text-blue-200 rounded-full text-sm backdrop-blur-sm border border-white/30"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-3 py-1 bg-white/20 text-blue-200 rounded-full text-sm backdrop-blur-sm border border-white/30">
                              +{project.technologies.length - 4}
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
                            className="flex items-center text-blue-200 hover:text-white transition-colors bg-blue-600/30 px-4 py-2 rounded-xl backdrop-blur-sm border border-blue-400/30"
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
                            className="flex items-center text-blue-200 hover:text-white transition-colors bg-gray-600/30 px-4 py-2 rounded-xl backdrop-blur-sm border border-gray-400/30"
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

        {/* Contact Section */}
        <section className="text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">
            <h3 className="text-4xl font-bold text-white mb-6">
              Let's Build Something Amazing
            </h3>
            <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
              Ready to turn your ideas into reality? I'm always excited to work on innovative projects 
              that challenge the boundaries of web development.
            </p>
            <a
              href={`mailto:${user.email}`}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:scale-105"
            >
              <EnvelopeIcon className="w-6 h-6 mr-3" />
              Start a Conversation
            </a>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}