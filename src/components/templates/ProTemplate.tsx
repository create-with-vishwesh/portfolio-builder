"use client"

import Image from "next/image"
import Link from "next/link"
import { 
  BriefcaseIcon, 
  EnvelopeIcon, 
  LinkIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  AcademicCapIcon,
  UserIcon,
  PhoneIcon
} from "@heroicons/react/24/outline"

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

// Social link icons mapping for Professional theme
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
      className="hover:text-blue-600 transition-colors"
    >
      {icons[platform as keyof typeof icons] || icons.website}
    </a>
  )
}

// Professional experience card
const ExperienceCard = ({ title, description, duration }: { title: string; description: string; duration: string }) => {
  return (
    <div className="border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <BriefcaseIcon className="w-6 h-6 text-gray-800" />
        <h4 className="text-xl font-semibold text-gray-900">{title}</h4>
      </div>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-gray-500">{duration}</p>
    </div>
  )
}

// Project card component
const ProjectCard = ({ project }: { project: any }) => {
  return (
    <div className="border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-md transition-shadow">
      <h4 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h4>
      <p className="text-gray-600 mb-4">
        {project.description || "Innovative project showcasing modern development practices and clean architecture."}
      </p>
      
      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="flex gap-3">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 px-4 py-2 rounded-xl text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            View Project
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 px-4 py-2 rounded-xl text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Code
          </a>
        )}
      </div>
    </div>
  )
}

export default function ProTemplate({ user, portfolio }: TemplateProps) {
  // Default experience data if none provided
  const experiences = [
    {
      title: "Senior Software Engineer",
      description: "Led development of scalable web applications using modern JavaScript frameworks and cloud technologies.",
      duration: "Jan 2022 - Present"
    },
    {
      title: "Full Stack Developer", 
      description: "Built responsive web applications with React, Node.js, and database optimization for improved performance.",
      duration: "Jun 2020 - Dec 2021"
    }
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center px-6 md:px-20 lg:px-40">
      
      {/* Header */}
      <header className="w-full flex justify-between items-center py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold tracking-tight">
          {user.name || user.username}
        </h1>
        <nav className="hidden md:flex space-x-6 text-gray-600 font-medium">
          <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
          <a href="#experience" className="hover:text-gray-900 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-gray-900 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-gray-900 transition-colors">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="about" className="text-center py-16 max-w-3xl">
        <div className="mb-6">
          {portfolio.profileImage || user.image ? (
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
              <Image
                src={portfolio.profileImage || user.image!}
                alt={user.name || user.username}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="text-6xl mb-4">👨‍💻</div>
          )}
        </div>
        
        <h2 className="text-4xl font-extrabold mt-4 text-gray-900">
          I'm a {portfolio.jobTitle || "Software Engineer"}
        </h2>
        
        <p className="mt-4 text-gray-600 leading-relaxed text-lg">
          {portfolio.aboutMe || 
            "Passionate about building modern, scalable, and user-friendly web applications. I love working with TypeScript, React, and backend APIs to deliver clean solutions."
          }
        </p>
        
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button className="bg-gray-900 text-white px-6 py-2 rounded-2xl hover:bg-gray-700 transition-colors">
            Download Resume
          </button>
          <a 
            href="#contact"
            className="border border-gray-300 px-6 py-2 rounded-2xl hover:bg-gray-100 transition-colors inline-block"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Skills Section */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <section className="w-full py-12">
          <h3 className="text-3xl font-bold mb-6 text-center text-gray-900">Technical Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(
              portfolio.skills.reduce((acc: Record<string, string[]>, skill: any) => {
                const category = skill.category || 'Other'
                if (!acc[category]) acc[category] = []
                acc[category].push(skill.name)
                return acc
              }, {})
            ).map(([category, skills]) => (
              <div key={category} className="border border-gray-200 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CodeBracketIcon className="w-5 h-5" />
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      <section id="experience" className="w-full py-12">
        <h3 className="text-3xl font-bold mb-6 text-center text-gray-900">Work Experience</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              title={exp.title}
              description={exp.description}
              duration={exp.duration}
            />
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="w-full py-12">
        <h3 className="text-3xl font-bold mb-6 text-center text-gray-900">Featured Projects</h3>
        
        {portfolio.projects && portfolio.projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {portfolio.projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((_, index) => (
              <div
                key={index}
                className="border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <h4 className="text-xl font-semibold mb-2 text-gray-900">Project Title</h4>
                <p className="text-gray-600 mb-4">
                  Innovative project showcasing modern development practices, clean architecture, and scalable solutions.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">React</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">TypeScript</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Node.js</span>
                </div>
                <button className="border border-gray-300 px-4 py-2 rounded-xl text-sm hover:bg-gray-100 transition-colors">
                  View Project
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Contact */}
      <section id="contact" className="text-center py-12">
        <h3 className="text-3xl font-bold mb-4 text-gray-900">Let's Connect</h3>
        <p className="text-gray-600 mb-6">
          Feel free to reach out for collaborations or just a friendly hello.
        </p>
        
        <div className="flex justify-center gap-6 mb-6">
          <a href={`mailto:${user.email}`} className="hover:text-blue-600 transition-colors">
            <EnvelopeIcon className="w-6 h-6" />
          </a>
          {Object.entries(portfolio.socialLinks || {}).map(([platform, url]) => (
            url && <SocialIcon key={platform} platform={platform} url={url} />
          ))}
        </div>
        
        <a
          href={`mailto:${user.email}`}
          className="bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-gray-700 transition-colors inline-flex items-center gap-2"
        >
          <EnvelopeIcon className="w-5 h-5" />
          Send Email
        </a>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-sm text-gray-500 border-t border-gray-200">
        © {new Date().getFullYear()} {user.name || user.username}. Built with ❤ using Next.js & Tailwind.
      </footer>
    </div>
  )
}