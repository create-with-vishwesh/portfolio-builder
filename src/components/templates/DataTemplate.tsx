import Image from "next/image"
import Link from "next/link"
import { LinkIcon, ArrowTopRightOnSquareIcon, EnvelopeIcon, ChartBarIcon, BeakerIcon } from "@heroicons/react/24/outline"

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

// Social link icons mapping for Data theme
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
    kaggle: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353C5.151.117 5.269 0 5.505 0h2.431c.234 0 .351.117.351.353v11.466L12.975 6.43c.129-.152.287-.228.474-.228h3.049c.175 0 .268.117.279.352 0 .071-.012.117-.035.14L11.728 11.8l5.845 11.619c.023.046.035.093.035.14l.217.3z"/>
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
      className="bg-white/10 p-3 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-600/30 transition-all duration-300 backdrop-blur-sm border border-emerald-400/20"
    >
      {icons[platform as keyof typeof icons] || icons.website}
    </a>
  )
}

export default function DataTemplate({ user, portfolio }: TemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 text-white">
      {/* Data Visualization Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg className="absolute top-20 left-20 w-64 h-64" viewBox="0 0 200 200" fill="none">
          <circle cx="50" cy="150" r="8" fill="currentColor" className="text-emerald-400 animate-pulse"/>
          <circle cx="100" cy="100" r="12" fill="currentColor" className="text-emerald-400 animate-pulse" style={{animationDelay: '0.5s'}}/>
          <circle cx="150" cy="50" r="10" fill="currentColor" className="text-emerald-400 animate-pulse" style={{animationDelay: '1s'}}/>
          <path d="M50 150 L100 100 L150 50" stroke="currentColor" strokeWidth="2" className="text-emerald-400"/>
        </svg>
        <div className="absolute top-40 right-20 w-48 h-48 border border-emerald-400/30 rounded-lg">
          <div className="grid grid-cols-4 gap-2 p-4 h-full">
            {Array.from({length: 16}).map((_, i) => (
              <div 
                key={i} 
                className="bg-emerald-400/20 rounded animate-pulse" 
                style={{animationDelay: `${i * 0.1}s`}}
              />
            ))}
          </div>
        </div>
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
                  className="rounded-2xl border-4 border-emerald-400/50 shadow-2xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-400/20 to-teal-400/20"></div>
              </div>
            ) : (
              <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-600 border-4 border-emerald-400/50 flex items-center justify-center shadow-2xl">
                <span className="text-4xl text-white font-bold">
                  {user.name?.[0]?.toUpperCase() || "D"}
                </span>
              </div>
            )}
          </div>

          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            {user.name || "Data Scientist"}
          </h1>
          
          {portfolio.jobTitle && (
            <h2 className="text-2xl text-emerald-200 mb-6 font-light">
              {portfolio.jobTitle}
            </h2>
          )}

          {/* Data Science Icons */}
          <div className="flex justify-center space-x-6 mb-8">
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-emerald-400/20">
              <ChartBarIcon className="w-8 h-8 text-emerald-400" />
              <div className="text-emerald-200 text-xs mt-2">Analytics</div>
            </div>
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-emerald-400/20">
              <BeakerIcon className="w-8 h-8 text-teal-400" />
              <div className="text-emerald-200 text-xs mt-2">Research</div>
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
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-emerald-400/20">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full mr-4"></div>
                Research Focus
              </h3>
              <p className="text-emerald-100 text-lg leading-relaxed">
                {portfolio.aboutMe}
              </p>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
              <div className="w-1 h-8 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full mr-4"></div>
              Technical Skills & Tools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.skills
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((skill, index) => (
                  <div
                    key={skill.id}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-emerald-400/20 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
                      <span className="px-3 py-1 bg-emerald-600/30 text-emerald-200 rounded-full text-xs border border-emerald-400/30">
                        {skill.category}
                      </span>
                    </div>
                    
                    {/* Skill Level Visualization */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-emerald-200">Proficiency</span>
                        <span className="text-emerald-300 font-mono">{skill.level}/5</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
              <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full mr-4"></div>
              Data Science Projects
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {portfolio.projects
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((project, index) => (
                  <div
                    key={project.id}
                    className="group bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-emerald-400/20 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
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
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                        {project.title}
                      </h4>
                      {project.description && (
                        <p className="text-emerald-100 mb-4 line-clamp-3">
                          {project.description}
                        </p>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-4">
                          <div className="text-emerald-300 text-sm font-medium mb-2">Technologies Used:</div>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-emerald-600/20 text-emerald-200 rounded-full text-sm border border-emerald-400/30 font-mono"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-3 py-1 bg-emerald-600/20 text-emerald-200 rounded-full text-sm border border-emerald-400/30">
                                +{project.technologies.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex space-x-3">
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-emerald-200 hover:text-white transition-colors bg-emerald-600/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-emerald-400/30"
                          >
                            <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" />
                            View Analysis
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-emerald-200 hover:text-white transition-colors bg-gray-600/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-400/30"
                          >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            Source Code
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
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-emerald-400/20">
            <h3 className="text-3xl font-bold text-white mb-6">Let's Explore Data Together</h3>
            <p className="text-emerald-100 text-lg mb-6 max-w-2xl mx-auto">
              Interested in collaborating on data science projects or discussing insights? 
              I'm always excited to work on challenging problems that unlock the power of data.
            </p>
            <a
              href={`mailto:${user.email}`}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-2xl hover:scale-105"
            >
              <EnvelopeIcon className="w-5 h-5 mr-3" />
              Connect & Collaborate
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}