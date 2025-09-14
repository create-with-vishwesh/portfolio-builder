"use client"

import React from "react"
import { Responsive, WidthProvider, Layout } from "react-grid-layout"
import Image from "next/image"
import Link from "next/link"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const ResponsiveGridLayout = WidthProvider(Responsive)

interface CustomLayoutPortfolioProps {
  user: {
    name: string | null
    email: string
    image?: string | null
    username: string
  }
  portfolio: {
    aboutMe?: string
    jobTitle?: string
    profileImage?: string
    socialLinks?: Record<string, string>
    projects?: any[]
    skills?: any[]
    template?: string
    layout?: Layout[]
  }
}

interface WidgetComponentProps {
  template: string
  user: any
  portfolio: any
  type: 'about' | 'projects' | 'skills' | 'project' | 'header'
  projectIndex?: number
}

// Widget Components for different templates
function WidgetComponent({ template, user, portfolio, type, projectIndex }: WidgetComponentProps) {
  const getTemplateStyles = () => {
    switch (template) {
      case 'quartz':
        return {
          container: 'bg-white border border-gray-200 shadow-sm',
          header: 'text-gray-900 border-gray-200',
          text: 'text-gray-600',
          accent: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700 text-white',
          heroContainer: 'bg-gradient-to-br from-blue-50 via-white to-blue-50',
          heroText: 'text-gray-900'
        }
      case 'sapphire':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-lg',
          header: 'text-blue-900 border-blue-300',
          text: 'text-blue-700',
          accent: 'text-cyan-600',
          button: 'bg-blue-600 hover:bg-blue-700 text-white',
          heroContainer: 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800',
          heroText: 'text-white'
        }
      case 'onyx':
      default:
        return {
          container: 'bg-gray-900 border border-gray-700 shadow-xl',
          header: 'text-white border-gray-700',
          text: 'text-gray-300',
          accent: 'text-indigo-400',
          button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          heroContainer: 'bg-gradient-to-br from-gray-900 via-black to-gray-800',
          heroText: 'text-white'
        }
    }
  }

  const styles = getTemplateStyles()

  if (type === 'header') {
    return (
      <div className={`${styles.heroContainer} rounded-lg p-8 h-full flex flex-col justify-center items-center text-center overflow-hidden`}>
        {(user.image || portfolio.profileImage) && (
          <div className="relative w-24 h-24 mb-4">
            <Image
              src={portfolio.profileImage || user.image || ""}
              alt={user.name || "Profile"}
              fill
              className="rounded-full object-cover border-4 border-white shadow-lg"
              sizes="96px"
            />
          </div>
        )}
        
        <h1 className={`${styles.heroText} text-2xl font-bold mb-2`}>
          {user.name || `@${user.username}`}
        </h1>
        
        {portfolio.jobTitle && (
          <p className={`${styles.heroText} text-lg opacity-90 mb-4`}>
            {portfolio.jobTitle}
          </p>
        )}

        {portfolio.socialLinks && Object.keys(portfolio.socialLinks).length > 0 && (
          <div className="flex justify-center gap-3 mb-4">
            {Object.entries(portfolio.socialLinks)
              .filter(([_, url]) => url)
              .map(([platform, url]) => (
                <a
                  key={platform}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.button} inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors text-sm`}
                >
                  {platform.charAt(0).toUpperCase()}
                </a>
              ))}
          </div>
        )}

        {user.email && (
          <a
            href={`mailto:${user.email}`}
            className={`${styles.button} inline-flex items-center px-4 py-2 rounded-lg transition-colors text-sm`}
          >
            Get In Touch
          </a>
        )}
      </div>
    )
  }

  if (type === 'about') {
    return (
      <div className={`${styles.container} rounded-lg p-6 h-full overflow-hidden`}>
        <h3 className={`${styles.header} text-xl font-semibold mb-4 pb-2 border-b`}>
          About Me
        </h3>
        <div className={`${styles.text} leading-relaxed overflow-y-auto`}>
          {portfolio.aboutMe ? (
            <p className="whitespace-pre-wrap">{portfolio.aboutMe}</p>
          ) : (
            <p className="italic opacity-75">No about me content yet...</p>
          )}
        </div>
      </div>
    )
  }

  if (type === 'skills') {
    return (
      <div className={`${styles.container} rounded-lg p-6 h-full overflow-hidden`}>
        <h3 className={`${styles.header} text-xl font-semibold mb-4 pb-2 border-b`}>
          Skills & Expertise
        </h3>
        <div className="space-y-4 overflow-y-auto max-h-full">
          {portfolio.skills && portfolio.skills.length > 0 ? (
            // Group skills by category
            Object.entries(
              portfolio.skills.reduce((acc: Record<string, any[]>, skill: any) => {
                const category = skill.category || 'Other'
                if (!acc[category]) acc[category] = []
                acc[category].push(skill)
                return acc
              }, {})
            ).map(([category, skills]) => (
              <div key={category} className="space-y-2">
                <h4 className={`${styles.accent} text-sm font-semibold`}>
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(skills as any[]).map((skill: any, index: number) => (
                    <span 
                      key={index} 
                      className={`${styles.text} text-xs px-2 py-1 rounded-full border bg-opacity-50`}
                    >
                      {skill.name}
                      {skill.level && (
                        <span className={`${styles.accent} ml-1 text-[10px]`}>
                          ({skill.level})
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className={`${styles.text} italic opacity-75`}>
              No skills added yet...
            </p>
          )}
        </div>
      </div>
    )
  }

  if (type === 'projects') {
    return (
      <div className={`${styles.container} rounded-lg p-6 h-full overflow-hidden`}>
        <h3 className={`${styles.header} text-xl font-semibold mb-4 pb-2 border-b`}>
          Featured Projects
        </h3>
        <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-full">
          {portfolio.projects && portfolio.projects.length > 0 ? (
            portfolio.projects.map((project: any, index: number) => (
              <div key={index} className="space-y-2 p-3 border rounded-lg bg-opacity-50">
                <h4 className={`${styles.text} font-semibold`}>
                  {project.title}
                </h4>
                <p className={`${styles.text} text-sm opacity-75 line-clamp-2`}>
                  {project.description}
                </p>
                {project.technologies && (
                  <div className="flex gap-1 flex-wrap">
                    {project.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
                      <span key={techIndex} className={`${styles.accent} text-xs px-1 py-0.5 rounded border text-[10px]`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.button} text-xs px-3 py-1 rounded transition-colors`}
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.text} text-xs px-3 py-1 rounded border transition-colors hover:bg-opacity-20`}
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className={`${styles.text} italic opacity-75`}>
              No projects added yet...
            </p>
          )}
        </div>
      </div>
    )
  }

  if (type === 'project' && projectIndex !== undefined && portfolio.projects?.[projectIndex]) {
    const project = portfolio.projects[projectIndex]
    return (
      <div className={`${styles.container} rounded-lg p-6 h-full overflow-hidden`}>
        <h4 className={`${styles.header} text-lg font-semibold mb-3 pb-2 border-b`}>
          {project.title}
        </h4>
        
        {project.imageUrl && (
          <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        )}
        
        <p className={`${styles.text} text-sm leading-relaxed mb-4`}>
          {project.description}
        </p>
        
        {project.technologies && (
          <div className="flex gap-2 flex-wrap mb-4">
            {project.technologies.map((tech: string, index: number) => (
              <span key={index} className={`${styles.accent} text-xs px-2 py-1 rounded-full border`}>
                {tech}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex gap-3 mt-auto">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.button} text-sm px-4 py-2 rounded-lg transition-colors`}
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.text} text-sm px-4 py-2 rounded-lg border transition-colors hover:bg-opacity-20`}
            >
              View Code
            </a>
          )}
        </div>
      </div>
    )
  }

  return <div className={`${styles.container} rounded-lg p-4 h-full`}>Unknown widget type</div>
}

export default function CustomLayoutPortfolio({ user, portfolio }: CustomLayoutPortfolioProps) {
  const template = portfolio.template || 'onyx'
  const layout = portfolio.layout || []

  // Generate default layout if no custom layout exists
  const generateDefaultLayout = (): Layout[] => {
    return [
      { i: 'header', x: 0, y: 0, w: 12, h: 4 },
      { i: 'about', x: 0, y: 4, w: 6, h: 4 },
      { i: 'skills', x: 6, y: 4, w: 6, h: 4 },
      { i: 'projects', x: 0, y: 8, w: 12, h: 6 }
    ]
  }

  const finalLayout = layout.length > 0 ? layout : generateDefaultLayout()

  // Generate widgets based on layout
  const generateWidgets = () => {
    const widgets: React.ReactElement[] = []
    
    finalLayout.forEach((item) => {
      const { i: widgetId } = item
      
      if (widgetId === 'header') {
        widgets.push(
          <div key="header" className="widget-container">
            <WidgetComponent template={template} user={user} portfolio={portfolio} type="header" />
          </div>
        )
      } else if (widgetId === 'about') {
        widgets.push(
          <div key="about" className="widget-container">
            <WidgetComponent template={template} user={user} portfolio={portfolio} type="about" />
          </div>
        )
      } else if (widgetId === 'skills') {
        widgets.push(
          <div key="skills" className="widget-container">
            <WidgetComponent template={template} user={user} portfolio={portfolio} type="skills" />
          </div>
        )
      } else if (widgetId === 'projects') {
        widgets.push(
          <div key="projects" className="widget-container">
            <WidgetComponent template={template} user={user} portfolio={portfolio} type="projects" />
          </div>
        )
      } else if (widgetId.startsWith('project-')) {
        const projectIndex = parseInt(widgetId.split('-')[1])
        if (portfolio.projects && portfolio.projects[projectIndex]) {
          widgets.push(
            <div key={widgetId} className="widget-container">
              <WidgetComponent 
                template={template} 
                user={user} 
                portfolio={portfolio} 
                type="project" 
                projectIndex={projectIndex} 
              />
            </div>
          )
        }
      }
    })

    return widgets
  }

  const getBackgroundClass = () => {
    switch (template) {
      case 'quartz':
        return 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
      case 'sapphire':
        return 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600'
      case 'onyx':
      default:
        return 'bg-gradient-to-br from-gray-900 via-black to-gray-800'
    }
  }

  return (
    <div className={`min-h-screen ${getBackgroundClass()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: finalLayout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={60}
          isDraggable={false}
          isResizable={false}
          margin={[16, 16]}
          containerPadding={[0, 0]}
        >
          {generateWidgets()}
        </ResponsiveGridLayout>
      </div>

      {/* Footer */}
      <footer className={`${template === 'onyx' ? 'bg-black border-gray-800' : template === 'sapphire' ? 'bg-blue-900 border-blue-700' : 'bg-white border-gray-200'} border-t py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`${template === 'onyx' ? 'text-gray-400' : template === 'sapphire' ? 'text-blue-200' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} {user.name || user.username}. 
            <span className="ml-2">
              Built with{" "}
              <Link
                href="/"
                className={`${template === 'onyx' ? 'text-indigo-400 hover:text-indigo-300' : template === 'sapphire' ? 'text-cyan-300 hover:text-cyan-200' : 'text-blue-600 hover:text-blue-700'} font-medium transition-colors`}
              >
                Port4lio
              </Link>
            </span>
          </p>
        </div>
      </footer>

      {/* Custom CSS for grid styling */}
      <style jsx global>{`
        .react-grid-layout {
          position: relative;
        }
        
        .react-grid-item {
          transition: none;
        }
        
        .widget-container {
          width: 100%;
          height: 100%;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}