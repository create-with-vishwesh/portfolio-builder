"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { Responsive, WidthProvider, Layout } from "react-grid-layout"
import { ArrowLeftIcon, BookmarkIcon, LinkIcon, EyeIcon } from "@heroicons/react/24/outline"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const ResponsiveGridLayout = WidthProvider(Responsive)

interface PortfolioData {
  aboutMe?: string
  jobTitle?: string
  profileImage?: string
  socialLinks?: Record<string, string>
  projects?: any[]
  skills?: any[]
  isPublic?: boolean
  template?: string
  layout?: Layout[]
  slug?: string
}

interface WidgetComponentProps {
  template: string
  data: any
  type: 'about' | 'projects' | 'skills' | 'project' | 'header'
  projectIndex?: number
}

// Widget Components for different templates
function WidgetComponent({ template, data, type, projectIndex }: WidgetComponentProps) {
  const getTemplateStyles = () => {
    switch (template) {
      case 'quartz':
        return {
          container: 'bg-white border border-gray-200 shadow-sm',
          header: 'text-gray-900 border-gray-200',
          text: 'text-gray-600',
          accent: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700 text-white'
        }
      case 'sapphire':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-lg',
          header: 'text-blue-900 border-blue-300',
          text: 'text-blue-700',
          accent: 'text-cyan-600',
          button: 'bg-blue-600 hover:bg-blue-700 text-white'
        }
      case 'onyx':
      default:
        return {
          container: 'bg-gray-900 border border-gray-700 shadow-xl',
          header: 'text-white border-gray-700',
          text: 'text-gray-300',
          accent: 'text-indigo-400',
          button: 'bg-indigo-600 hover:bg-indigo-700 text-white'
        }
    }
  }

  const styles = getTemplateStyles()

  if (type === 'header') {
    return (
      <div className={`${styles.container} rounded-lg p-6 h-full overflow-hidden flex flex-col justify-center items-center text-center`}>
        <div className="space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
            {data.name?.charAt(0) || 'U'}
          </div>
          <h2 className={`${styles.header} text-lg font-bold`}>
            {data.name || 'Your Name'}
          </h2>
          {data.jobTitle && (
            <p className={`${styles.text} text-sm`}>
              {data.jobTitle}
            </p>
          )}
          <div className={`${styles.accent} text-xs`}>
            Header Section
          </div>
        </div>
      </div>
    )
  }

  if (type === 'about') {
    return (
      <div className={`${styles.container} rounded-lg p-6 h-full overflow-hidden`}>
        <h3 className={`${styles.header} text-lg font-semibold mb-3 pb-2 border-b`}>
          About Me
        </h3>
        <div className={`${styles.text} text-sm leading-relaxed`}>
          {data.aboutMe ? (
            <p className="line-clamp-6">{data.aboutMe}</p>
          ) : (
            <p className="italic opacity-75">No about me content yet...</p>
          )}
        </div>
        {data.jobTitle && (
          <div className={`${styles.accent} text-xs font-medium mt-2`}>
            {data.jobTitle}
          </div>
        )}
      </div>
    )
  }

  if (type === 'skills') {
    return (
      <div className={`${styles.container} rounded-lg p-6 h-full overflow-hidden`}>
        <h3 className={`${styles.header} text-lg font-semibold mb-3 pb-2 border-b`}>
          Skills & Expertise
        </h3>
        <div className="space-y-3 overflow-y-auto max-h-40">
          {data.skills && data.skills.length > 0 ? (
            data.skills.slice(0, 8).map((skill: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className={`${styles.text} text-sm font-medium`}>
                  {skill.name}
                </span>
                <span className={`${styles.accent} text-xs px-2 py-1 rounded-full border`}>
                  {skill.level || 'Intermediate'}
                </span>
              </div>
            ))
          ) : (
            <p className={`${styles.text} italic opacity-75 text-sm`}>
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
        <h3 className={`${styles.header} text-lg font-semibold mb-3 pb-2 border-b`}>
          Featured Projects
        </h3>
        <div className="space-y-3 overflow-y-auto max-h-40">
          {data.projects && data.projects.length > 0 ? (
            data.projects.slice(0, 3).map((project: any, index: number) => (
              <div key={index} className="space-y-1">
                <h4 className={`${styles.text} text-sm font-semibold`}>
                  {project.title}
                </h4>
                <p className={`${styles.text} text-xs opacity-75 line-clamp-2`}>
                  {project.description}
                </p>
                {project.technologies && (
                  <div className="flex gap-1 flex-wrap">
                    {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                      <span key={techIndex} className={`${styles.accent} text-xs px-1 py-0.5 rounded border text-[10px]`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className={`${styles.text} italic opacity-75 text-sm`}>
              No projects added yet...
            </p>
          )}
        </div>
      </div>
    )
  }

  if (type === 'project' && projectIndex !== undefined && data.projects?.[projectIndex]) {
    const project = data.projects[projectIndex]
    return (
      <div className={`${styles.container} rounded-lg p-4 h-full overflow-hidden`}>
        <h4 className={`${styles.header} text-base font-semibold mb-2 pb-1 border-b`}>
          {project.title}
        </h4>
        <p className={`${styles.text} text-xs leading-relaxed mb-2 line-clamp-3`}>
          {project.description}
        </p>
        {project.technologies && (
          <div className="flex gap-1 flex-wrap mb-2">
            {project.technologies.slice(0, 4).map((tech: string, index: number) => (
              <span key={index} className={`${styles.accent} text-xs px-1 py-0.5 rounded border text-[10px]`}>
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2 mt-auto">
          {project.projectUrl && (
            <button className={`${styles.button} text-xs px-2 py-1 rounded text-[10px]`}>
              Demo
            </button>
          )}
          {project.githubUrl && (
            <button className={`${styles.button} text-xs px-2 py-1 rounded text-[10px]`}>
              Code
            </button>
          )}
        </div>
      </div>
    )
  }

  return <div className={`${styles.container} rounded-lg p-4 h-full`}>Unknown widget type</div>
}

export default function VisualEditorPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const template = searchParams.get('template') || 'onyx'
  
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({})

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      fetchPortfolioData()
    }
  }, [session])

  const fetchPortfolioData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/portfolio")
      const data = await response.json()
      
      if (response.ok && data.portfolio) {
        const portfolio = data.portfolio
        setPortfolioData(portfolio)
        
        // Load existing layout or create default layout
        const savedLayout = portfolio.layout || []
        if (savedLayout.length > 0) {
          setLayouts({ lg: savedLayout })
        } else {
          setLayouts(generateDefaultLayout(portfolio))
        }
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateDefaultLayout = (data: PortfolioData): { [key: string]: Layout[] } => {
    const defaultLayout: Layout[] = [
      { i: 'header', x: 0, y: 0, w: 12, h: 4, minW: 6, minH: 3 },
      { i: 'about', x: 0, y: 4, w: 6, h: 4, minW: 3, minH: 3 },
      { i: 'skills', x: 6, y: 4, w: 6, h: 4, minW: 3, minH: 3 },
      { i: 'projects', x: 0, y: 8, w: 12, h: 4, minW: 6, minH: 3 }
    ]

    // Add individual project widgets if projects exist
    if (data.projects && data.projects.length > 0) {
      data.projects.forEach((_, index) => {
        if (index < 6) { // Limit to 6 individual project widgets
          const col = index % 3
          const row = Math.floor(index / 3)
          defaultLayout.push({
            i: `project-${index}`,
            x: col * 4,
            y: 12 + row * 3,
            w: 4,
            h: 3,
            minW: 2,
            minH: 2
          })
        }
      })
    }

    return { lg: defaultLayout }
  }

  const handleLayoutChange = (layout: Layout[], layouts: { [key: string]: Layout[] }) => {
    setLayouts(layouts)
  }

  const handleSaveLayout = async () => {
    try {
      setIsSaving(true)
      const response = await fetch("/api/portfolio/layout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ layout: layouts.lg || [] })
      })

      if (response.ok) {
        setSaveMessage("Layout saved successfully!")
        setTimeout(() => setSaveMessage(""), 3000)
      } else {
        throw new Error("Failed to save layout")
      }
    } catch (error) {
      console.error("Error saving layout:", error)
      setSaveMessage("Error saving layout")
      setTimeout(() => setSaveMessage(""), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleGetShareableLink = () => {
    if (portfolioData.slug) {
      const url = `${window.location.origin}/${portfolioData.slug}`
      navigator.clipboard.writeText(url)
      setSaveMessage("Portfolio link copied to clipboard!")
      setTimeout(() => setSaveMessage(""), 3000)
    }
  }

  const handleViewPortfolio = () => {
    if (portfolioData.slug) {
      window.open(`/${portfolioData.slug}`, '_blank')
    }
  }

  // Generate widgets for the grid
  const generateWidgets = useMemo(() => {
    const widgets: React.ReactElement[] = []
    
    // About Me widget
    widgets.push(
      <div key="about" className="widget-container">
        <WidgetComponent template={template} data={portfolioData} type="about" />
      </div>
    )

    // Skills widget
    widgets.push(
      <div key="skills" className="widget-container">
        <WidgetComponent template={template} data={portfolioData} type="skills" />
      </div>
    )

    // Projects overview widget
    widgets.push(
      <div key="projects" className="widget-container">
        <WidgetComponent template={template} data={portfolioData} type="projects" />
      </div>
    )

    // Individual project widgets
    if (portfolioData.projects && portfolioData.projects.length > 0) {
      portfolioData.projects.forEach((_, index) => {
        if (index < 6) {
          widgets.push(
            <div key={`project-${index}`} className="widget-container">
              <WidgetComponent 
                template={template} 
                data={portfolioData} 
                type="project" 
                projectIndex={index} 
              />
            </div>
          )
        }
      })
    }

    return widgets
  }, [portfolioData, template])

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading visual editor...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/templates"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Templates
              </Link>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-xl font-bold text-gray-900">Visual Editor</h1>
                <p className="text-sm text-gray-600">Template: <span className="font-medium capitalize">{template}</span></p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveLayout}
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                <BookmarkIcon className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Layout"}
              </button>
              
              <button
                onClick={handleGetShareableLink}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Copy Link
              </button>

              {portfolioData.slug && portfolioData.isPublic && (
                <button
                  onClick={handleViewPortfolio}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Preview
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-800 text-sm">
            {saveMessage}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">How to use the Visual Editor:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Drag widgets to rearrange your portfolio layout</li>
            <li>• Resize widgets by dragging the bottom-right corner</li>
            <li>• Save your layout when you're happy with the design</li>
            <li>• Copy the shareable link to share your portfolio</li>
          </ul>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          onLayoutChange={handleLayoutChange}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={60}
          isDraggable={true}
          isResizable={true}
          margin={[16, 16]}
          containerPadding={[0, 0]}
        >
          {generateWidgets}
        </ResponsiveGridLayout>
      </div>

      {/* Custom CSS for grid styling */}
      <style jsx global>{`
        .react-grid-layout {
          position: relative;
        }
        
        .react-grid-item {
          transition: all 200ms ease;
          transition-property: left, top;
        }
        
        .react-grid-item.cssTransforms {
          transition-property: transform;
        }
        
        .react-grid-item > .react-resizable-handle {
          position: absolute;
          width: 20px;
          height: 20px;
          bottom: 0;
          right: 0;
          background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgNiA2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiM0ZDU2NjEiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMSIgY3k9IjUiIHI9IjEiLz48Y2lyY2xlIGN4PSIzIiBjeT0iNSIgcj0iMSIvPjxjaXJjbGUgY3g9IjUiIGN5PSI1IiByPSIxIi8+PGNpcmNsZSBjeD0iMyIgY3k9IjMiIHI9IjEiLz48Y2lyY2xlIGN4PSI1IiBjeT0iMyIgcj0iMSIvPjxjaXJjbGUgY3g9IjUiIGN5PSIxIiByPSIxIi8+PC9nPjwvc3ZnPg==');
          background-position: bottom right;
          padding: 0 3px 3px 0;
          background-repeat: no-repeat;
          background-origin: content-box;
          box-sizing: border-box;
          cursor: se-resize;
          opacity: 0.4;
          transition: opacity 0.2s;
        }
        
        .react-grid-item:hover > .react-resizable-handle {
          opacity: 1;
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
        
        .line-clamp-6 {
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}