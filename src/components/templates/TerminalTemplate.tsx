"use client"

import Image from "next/image"
import Link from "next/link"
import { LinkIcon, ArrowTopRightOnSquareIcon, EnvelopeIcon, ServerIcon, CommandLineIcon } from "@heroicons/react/24/outline"

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

// Social link icons mapping for Terminal theme
const SocialIcon = ({ platform, url }: { platform: string; url: string }) => {
  const icons = {
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    stackoverflow: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154Z"/>
      </svg>
    ),
    website: <LinkIcon className="w-5 h-5" />
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-400 hover:text-green-300 transition-colors duration-200 font-mono text-sm flex items-center"
    >
      <span className="mr-2">$</span>
      {icons[platform as keyof typeof icons] || icons.website}
      <span className="ml-2">{platform}</span>
    </a>
  )
}

export default function TerminalTemplate({ user, portfolio }: TemplateProps) {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Terminal Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-gray-300 text-sm">
            portfolio@{user.username || 'developer'}:~$ cat about.txt
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header Section */}
        <header className="mb-12">
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">
              Last login: {new Date().toLocaleString()}
            </div>
            <div className="text-green-400">
              <span className="text-gray-500">portfolio@{user.username || 'developer'}:~$</span> whoami
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-6">
              {portfolio.profileImage ? (
                <div className="flex-shrink-0">
                  <Image
                    src={portfolio.profileImage}
                    alt={user.name || "Profile"}
                    width={80}
                    height={80}
                    className="rounded border-2 border-green-400"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 bg-gray-800 border-2 border-green-400 flex items-center justify-center text-green-400 text-2xl font-bold">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-green-400 mb-2">
                  {user.name || "Backend Developer"}
                </h1>
                {portfolio.jobTitle && (
                  <div className="text-gray-300 mb-2">
                    Role: {portfolio.jobTitle}
                  </div>
                )}
                <div className="text-gray-300 mb-2">
                  Email: {user.email}
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <ServerIcon className="w-5 h-5 text-green-400" />
                  <CommandLineIcon className="w-5 h-5 text-green-400" />
                  <span className="text-xs text-gray-500">Backend Systems & API Development</span>
                </div>
              </div>
            </div>
          </div>

          {/* Command Prompt */}
          <div className="text-green-400 mb-4">
            <span className="text-gray-500">portfolio@{user.username || 'developer'}:~$</span> ls -la social_links/
          </div>

          {/* Social Links */}
          {portfolio.socialLinks && Object.keys(portfolio.socialLinks).length > 0 && (
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
              <div className="text-xs text-gray-500 mb-2">total {Object.keys(portfolio.socialLinks).length}</div>
              <div className="space-y-1">
                {Object.entries(portfolio.socialLinks).map(([platform, url]) => (
                  <div key={platform} className="flex items-center text-sm">
                    <span className="text-gray-500 mr-4">-rw-r--r--</span>
                    <SocialIcon platform={platform} url={url} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* About Section */}
        {portfolio.aboutMe && (
          <section className="mb-12">
            <div className="text-green-400 mb-4">
              <span className="text-gray-500">portfolio@{user.username || 'developer'}:~$</span> cat README.md
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <div className="text-green-300 mb-4"># About Me</div>
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {portfolio.aboutMe}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="mb-12">
            <div className="text-green-400 mb-4">
              <span className="text-gray-500">portfolio@{user.username || 'developer'}:~$</span> ./skills.sh --list
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <div className="text-green-300 mb-4">## Technical Skills</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolio.skills
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((skill, index) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-green-400">├──</span>
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-xs text-gray-500 px-2 py-1 bg-gray-800 rounded">
                          {skill.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-400 transition-all duration-1000"
                            style={{ width: `${(skill.level / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{skill.level}/5</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="mb-12">
            <div className="text-green-400 mb-4">
              <span className="text-gray-500">portfolio@{user.username || 'developer'}:~$</span> find ./projects -type f -name "*.md" | head -10
            </div>
            <div className="space-y-6">
              {portfolio.projects
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((project, index) => (
                  <div key={project.id} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                      <div className="text-green-300 text-sm">
                        ./projects/{project.title.toLowerCase().replace(/\s+/g, '-')}/README.md
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-green-400 mb-3">
                        # {project.title}
                      </h4>
                      {project.description && (
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                      
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-4">
                          <div className="text-green-300 text-sm mb-2">## Tech Stack</div>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech: string, techIndex: number) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-gray-800 text-green-400 text-xs rounded border border-gray-600"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-4 mt-4">
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors text-sm"
                          >
                            <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" />
                            [Live Demo]
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors text-sm"
                          >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            [Source Code]
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
        <section>
          <div className="text-green-400 mb-4">
            <span className="text-gray-500">portfolio@{user.username || 'developer'}:~$</span> contact --email
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <div className="text-green-300 mb-4">## Contact Information</div>
            <p className="text-gray-300 mb-4">
              Ready to discuss backend architecture, APIs, or system design? 
              Drop me a line and let's build something robust together.
            </p>
            <a
              href={`mailto:${user.email}`}
              className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
            >
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              {user.email}
            </a>
          </div>
          
          <div className="mt-6 text-center text-gray-500 text-sm">
            <div className="text-green-400 mb-2">
              <span className="text-gray-500">portfolio@{user.username || 'developer'}:~$</span> exit
            </div>
            <div>Connection to portfolio closed.</div>
          </div>
        </section>
      </div>
    </div>
  )
}