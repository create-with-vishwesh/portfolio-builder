"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeftIcon, CheckIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline"

interface Template {
  id: string
  name: string
  description: string
  preview: string
  color: string
  features: string[]
  category: string
  targetAudience: string
}

export default function TemplatesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string>("onyx")
  const [currentTemplate, setCurrentTemplate] = useState<string>("onyx")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      fetchCurrentTemplate()
    }
  }, [session])

  const fetchCurrentTemplate = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/portfolio")
      const data = await response.json()
      
      if (response.ok && data.portfolio) {
        const template = data.portfolio.template || "onyx"
        setCurrentTemplate(template)
        setSelectedTemplate(template)
      }
    } catch (error) {
      console.error("Error fetching template:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTemplateSelect = async (templateId: string) => {
    setSelectedTemplate(templateId)
    
    try {
      setSaving(true)
      const response = await fetch("/api/portfolio/template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ template: templateId })
      })

      if (response.ok) {
        setCurrentTemplate(templateId)
        setSaveMessage("Template selected! Redirecting to visual editor...")
        
        // Redirect to visual editor with selected template
        setTimeout(() => {
          router.push(`/dashboard/editor?template=${templateId}`)
        }, 1000)
      } else {
        throw new Error("Failed to update template")
      }
    } catch (error) {
      console.error("Error updating template:", error)
      setSelectedTemplate(currentTemplate) // Revert selection on error
      setSaveMessage("Error selecting template")
      setTimeout(() => setSaveMessage(""), 3000)
    } finally {
      setSaving(false)
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const templates: Template[] = [
    // UI/UX Design Templates
    {
      id: "flux",
      name: "Flux",
      description: "A cutting-edge design with animated elements and modern UI patterns for contemporary designers",
      preview: "Modern • Sleek • Interactive",
      color: "from-slate-900 via-purple-900 to-slate-900",
      features: ["Modern animations", "Interactive elements", "Contemporary design patterns"],
      category: "design",
      targetAudience: "UI/UX Designers, Product Designers, Design Leaders"
    },
    {
      id: "creative",
      name: "Creative",
      description: "A vibrant gradient theme perfect for UI/UX designers and creative professionals",
      preview: "Vibrant • Creative • Visual",
      color: "from-purple-600 via-pink-600 to-orange-500",
      features: ["Gradient animations", "Creative layouts", "Visual portfolio emphasis"],
      category: "design",
      targetAudience: "UI/UX Designers, Graphic Artists, Creative Professionals"
    },
    {
      id: "quartz",
      name: "Quartz",
      description: "A clean, minimalist design that puts your work front and center",
      preview: "Clean • Modern • Professional",
      color: "from-gray-50 to-gray-100",
      features: ["Clean typography", "Ample white space", "Focus on content"],
      category: "design",
      targetAudience: "Product Designers, UX Researchers, Design Consultants"
    },

    // Backend Development Templates
    {
      id: "terminal",
      name: "Terminal",
      description: "A command-line inspired theme for backend developers and system architects",
      preview: "Code • Terminal • Developer",
      color: "from-gray-900 via-gray-800 to-black",
      features: ["Terminal aesthetics", "Code-focused design", "Developer tools emphasis"],
      category: "backend",
      targetAudience: "Backend Developers, DevOps Engineers, System Architects"
    },
    {
      id: "onyx",
      name: "Onyx",
      description: "A sleek dark theme with subtle gradients, perfect for showcasing technical projects",
      preview: "Dark • Professional • Tech",
      color: "from-gray-900 to-black",
      features: ["Dark mode design", "Subtle animations", "Technical project focus"],
      category: "backend",
      targetAudience: "Software Engineers, API Developers, Technical Leads"
    },

    // Full-Stack Development Templates
    {
      id: "pro",
      name: "Pro",
      description: "A clean, professional template perfect for software engineers and developers",
      preview: "Clean • Professional • Engineering",
      color: "from-white to-gray-50",
      features: ["Clean design", "Professional layout", "Engineering focus"],
      category: "fullstack",
      targetAudience: "Software Engineers, Full-Stack Developers, Tech Professionals"
    },
    {
      id: "modern",
      name: "Modern",
      description: "A contemporary design with animated elements for full-stack developers",
      preview: "Animated • Contemporary • Full-Stack",
      color: "from-blue-600 via-purple-600 to-indigo-700",
      features: ["Skill categorization", "Animated backgrounds", "Project showcases"],
      category: "fullstack",
      targetAudience: "Full-Stack Developers, Web Developers, Tech Entrepreneurs"
    },
    {
      id: "sapphire",
      name: "Sapphire",
      description: "Rich blue tones with elegant typography for professional portfolios",
      preview: "Elegant • Blue • Professional",
      color: "from-blue-600 to-blue-800",
      features: ["Rich color palette", "Elegant typography", "Professional layout"],
      category: "fullstack",
      targetAudience: "Senior Developers, Technical Consultants, Engineering Managers"
    },

    // Data Science Templates
    {
      id: "data",
      name: "Data",
      description: "A scientific theme designed for data scientists and researchers",
      preview: "Scientific • Data • Research",
      color: "from-teal-600 via-cyan-600 to-blue-700",
      features: ["Data visualization focus", "Research-oriented layout", "Analytics emphasis"],
      category: "datascience",
      targetAudience: "Data Scientists, ML Engineers, Research Analysts"
    }
  ]

  if (status === "loading" || isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-32 w-32 border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-indigo-600'} mx-auto`}></div>
          <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading templates...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Fixed Header/Navbar */}
      <div className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className={`text-2xl font-bold font-orbitron ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Port4lio
              </Link>
              
              {/* Vertical Separator */}
              <div className={`h-6 w-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
              
              {/* User Name */}
              <span className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {session?.user?.name || 'User'}
              </span>
              
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-6 ml-8">
                <Link 
                  href="/dashboard" 
                  className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                >
                  Dashboard
                </Link>
                <span className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  Templates
                </span>
                <Link 
                  href="/dashboard/edit" 
                  className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                >
                  Edit My Portfolio
                </Link>
                <Link 
                  href="/dashboard/analytics" 
                  className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                >
                  Analytics
                </Link>
                <Link 
                  href="/dashboard/settings" 
                  className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                >
                  Settings
                </Link>
              </nav>
            </div>

            {/* Right side - Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content with top padding for fixed header */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Choose Your Template</h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Select a template that best represents your professional style and target audience
          </p>
          {saveMessage && (
            <div className={`mt-4 p-3 rounded-lg ${
              saveMessage.includes("Error") 
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}>
              {saveMessage}
            </div>
          )}
        </div>

        <div className="space-y-12">
          {/* Category: UI/UX Design */}
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>UI/UX Design</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Templates crafted for designers and creative professionals</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {templates.filter(template => template.category === 'design').map((template) => {
                const isSelected = selectedTemplate === template.id
                const isCurrent = currentTemplate === template.id
                
                return (
                  <div
                    key={template.id}
                    className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl ${
                      isSelected ? "ring-4 ring-indigo-500 ring-opacity-50" : ""
                    }`}
                    onClick={() => !isSaving && handleTemplateSelect(template.id)}
                  >
                    <div className={`h-48 bg-gradient-to-br ${template.color} relative`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`text-center ${template.id === 'quartz' ? 'text-gray-800' : 'text-white'}`}>
                          <div className="text-xl font-bold mb-2">{template.name}</div>
                          <div className="text-sm opacity-80">{template.preview}</div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-4 right-4 bg-indigo-500 text-white rounded-full p-2">
                          <CheckIcon className="h-4 w-4" />
                        </div>
                      )}
                      {isCurrent && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Current
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                      <div className="text-xs text-indigo-600 font-medium mb-3">{template.targetAudience}</div>
                      <div className="mt-6">
                        {isCurrent ? (
                          <div className="bg-green-100 text-green-800 text-center py-2 px-4 rounded-lg font-medium">
                            Currently Active
                          </div>
                        ) : (
                          <button
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                              isSelected
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            disabled={isSaving}
                          >
                            {isSelected ? "Selected" : "Select Template"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Category: Backend Development */}
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Backend Development</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Professional templates for backend engineers and system architects</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {templates.filter(template => template.category === 'backend').map((template) => {
                const isSelected = selectedTemplate === template.id
                const isCurrent = currentTemplate === template.id
                
                return (
                  <div
                    key={template.id}
                    className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl ${
                      isSelected ? "ring-4 ring-indigo-500 ring-opacity-50" : ""
                    }`}
                    onClick={() => !isSaving && handleTemplateSelect(template.id)}
                  >
                    <div className={`h-48 bg-gradient-to-br ${template.color} relative`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-xl font-bold mb-2">{template.name}</div>
                          <div className="text-sm opacity-80">{template.preview}</div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-4 right-4 bg-indigo-500 text-white rounded-full p-2">
                          <CheckIcon className="h-4 w-4" />
                        </div>
                      )}
                      {isCurrent && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Current
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                      <div className="text-xs text-indigo-600 font-medium mb-3">{template.targetAudience}</div>
                      <div className="mt-6">
                        {isCurrent ? (
                          <div className="bg-green-100 text-green-800 text-center py-2 px-4 rounded-lg font-medium">
                            Currently Active
                          </div>
                        ) : (
                          <button
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                              isSelected
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            disabled={isSaving}
                          >
                            {isSelected ? "Selected" : "Select Template"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Category: Full-Stack Development */}
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Full-Stack Development</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Versatile templates for full-stack developers and tech leaders</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {templates.filter(template => template.category === 'fullstack').map((template) => {
                const isSelected = selectedTemplate === template.id
                const isCurrent = currentTemplate === template.id
                
                return (
                  <div
                    key={template.id}
                    className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl ${
                      isSelected ? "ring-4 ring-indigo-500 ring-opacity-50" : ""
                    }`}
                    onClick={() => !isSaving && handleTemplateSelect(template.id)}
                  >
                    <div className={`h-48 bg-gradient-to-br ${template.color} relative`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-xl font-bold mb-2">{template.name}</div>
                          <div className="text-sm opacity-80">{template.preview}</div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-4 right-4 bg-indigo-500 text-white rounded-full p-2">
                          <CheckIcon className="h-4 w-4" />
                        </div>
                      )}
                      {isCurrent && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Current
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                      <div className="text-xs text-indigo-600 font-medium mb-3">{template.targetAudience}</div>
                      <div className="mt-6">
                        {isCurrent ? (
                          <div className="bg-green-100 text-green-800 text-center py-2 px-4 rounded-lg font-medium">
                            Currently Active
                          </div>
                        ) : (
                          <button
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                              isSelected
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            disabled={isSaving}
                          >
                            {isSelected ? "Selected" : "Select Template"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Category: Data Science */}
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Data Science</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Specialized templates for data scientists and researchers</p>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              {templates.filter(template => template.category === 'datascience').map((template) => {
                const isSelected = selectedTemplate === template.id
                const isCurrent = currentTemplate === template.id
                
                return (
                  <div
                    key={template.id}
                    className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl ${
                      isSelected ? "ring-4 ring-blue-500 ring-opacity-50" : ""
                    } max-w-md mx-auto`}
                    onClick={() => !isSaving && handleTemplateSelect(template.id)}
                  >
                    <div className={`h-48 bg-gradient-to-br ${template.color} relative`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-xl font-bold mb-2">{template.name}</div>
                          <div className="text-sm opacity-80">{template.preview}</div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-4 right-4 bg-indigo-500 text-white rounded-full p-2">
                          <CheckIcon className="h-4 w-4" />
                        </div>
                      )}
                      {isCurrent && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Current
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                      <div className="text-xs text-indigo-600 font-medium mb-3">{template.targetAudience}</div>
                      <div className="mt-6">
                        {isCurrent ? (
                          <div className="bg-green-100 text-green-800 text-center py-2 px-4 rounded-lg font-medium">
                            Currently Active
                          </div>
                        ) : (
                          <button
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                              isSelected
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            disabled={isSaving}
                          >
                            {isSelected ? "Selected" : "Select Template"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className={`mt-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Template Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>How Templates Work</h3>
              <ul className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                <li>• Templates change the visual theme of your portfolio</li>
                <li>• Your content remains the same across all templates</li>
                <li>• Changes apply instantly to your live portfolio</li>
                <li>• You can switch templates anytime</li>
              </ul>
            </div>
            <div>
              <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Choose by Profession</h3>
              <ul className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                <li>• <strong>Design:</strong> Creative, visual-focused templates</li>
                <li>• <strong>Backend:</strong> Technical, code-oriented themes</li>
                <li>• <strong>Full-Stack:</strong> Balanced, versatile designs</li>
                <li>• <strong>Data Science:</strong> Research-focused layouts</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}