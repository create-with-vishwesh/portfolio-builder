"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { PlusIcon, TrashIcon, EyeIcon, ArrowLeftIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

interface SocialLinks {
  linkedin?: string
  github?: string
  twitter?: string
  website?: string
}

interface Project {
  title: string
  description: string
  projectUrl: string
  githubUrl: string
  imageUrl: string
  technologies: string[]
}

interface Skill {
  name: string
  category: string
  level: string
}

interface PortfolioData {
  aboutMe: string
  jobTitle: string
  profileImage: string
  socialLinks: SocialLinks
  projects: Project[]
  skills: Skill[]
  isPublic: boolean
}

export default function EditPortfolioPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [error, setError] = useState("")
  const [portfolioSlug, setPortfolioSlug] = useState<string | null>(null)

  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    aboutMe: "",
    jobTitle: "",
    profileImage: "",
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
      website: ""
    },
    projects: [],
    skills: [],
    isPublic: false
  })

  // Load portfolio data
  useEffect(() => {
    if (status === "authenticated") {
      loadPortfolioData()
    } else if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  const loadPortfolioData = async () => {
    try {
      const response = await fetch("/api/portfolio")
      if (response.ok) {
        const data = await response.json()
        setPortfolioData(data)
        if (data.username) {
          setPortfolioSlug(data.username)
        }
      }
    } catch (error) {
      console.error("Error loading portfolio:", error)
      setError("Failed to load portfolio data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage("")
    setError("")

    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
      })

      if (response.ok) {
        setSaveMessage("Portfolio saved successfully!")
        setTimeout(() => setSaveMessage(""), 3000)
      } else {
        throw new Error("Failed to save portfolio")
      }
    } catch (error) {
      console.error("Error saving portfolio:", error)
      setError("Failed to save portfolio")
    } finally {
      setIsSaving(false)
    }
  }

  const addProject = () => {
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        title: "",
        description: "",
        projectUrl: "",
        githubUrl: "",
        imageUrl: "",
        technologies: []
      }]
    }))
  }

  const removeProject = (index: number) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }))
  }

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }))
  }

  const addSkill = () => {
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: "", category: "", level: "Beginner" }]
    }))
  }

  const removeSkill = (index: number) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }))
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Navbar */}
      <nav className={`sticky top-0 z-40 backdrop-blur-lg border-b ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-800' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <h1 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <span className="text-blue-600">Port</span>
                <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} style={{ fontFamily: 'Orbitron, sans-serif' }}>4</span>
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>lio</span>
              </h1>
            </div>

            {/* Center - Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/dashboard" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/templates" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Templates
              </Link>
              <Link 
                href="/dashboard/analytics" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Analytics
              </Link>
              <Link 
                href="/dashboard/settings" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Settings
              </Link>
              <Link 
                href="/dashboard/edit" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700`}
              >
                Edit Portfolio
              </Link>
            </div>

            {/* Right side - Theme toggle and User menu */}
            <div className="flex items-center space-x-4">
              {/* Theme toggle button */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>

              {/* User menu */}
              <div className="relative group">
                <button 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span>{session?.user?.email || 'User'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown menu */}
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                  isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                  <div className="py-1">
                    <button
                      onClick={() => signOut()}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg transition-colors duration-300`}>
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left column - Basic Info */}
              <div className="lg:w-1/3 space-y-6">
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Edit Portfolio
                </h1>

                {/* Status Messages */}
                {saveMessage && (
                  <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                    {saveMessage}
                  </div>
                )}
                {error && (
                  <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Basic Info Form */}
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={portfolioData.jobTitle}
                      onChange={(e) => setPortfolioData(prev => ({ ...prev, jobTitle: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="e.g., Full Stack Developer"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      value={portfolioData.profileImage}
                      onChange={(e) => setPortfolioData(prev => ({ ...prev, profileImage: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      About Me
                    </label>
                    <textarea
                      value={portfolioData.aboutMe}
                      onChange={(e) => setPortfolioData(prev => ({ ...prev, aboutMe: e.target.value }))}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Tell visitors about yourself..."
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="isPublic"
                      type="checkbox"
                      checked={portfolioData.isPublic}
                      onChange={(e) => setPortfolioData(prev => ({ ...prev, isPublic: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isPublic" className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Make portfolio public
                    </label>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Social Links
                  </h3>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={portfolioData.socialLinks.linkedin || ""}
                      onChange={(e) => setPortfolioData(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                      }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      GitHub
                    </label>
                    <input
                      type="url"
                      value={portfolioData.socialLinks.github || ""}
                      onChange={(e) => setPortfolioData(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, github: e.target.value }
                      }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="https://github.com/username"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Twitter
                    </label>
                    <input
                      type="url"
                      value={portfolioData.socialLinks.twitter || ""}
                      onChange={(e) => setPortfolioData(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                      }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="https://twitter.com/username"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Website
                    </label>
                    <input
                      type="url"
                      value={portfolioData.socialLinks.website || ""}
                      onChange={(e) => setPortfolioData(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, website: e.target.value }
                      }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>

              {/* Right column - Projects and Skills */}
              <div className="lg:w-2/3 space-y-8">
                {/* Projects Section */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Projects
                    </h2>
                    <button
                      onClick={addProject}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <PlusIcon className="w-4 h-4" />
                      Add Project
                    </button>
                  </div>

                  {portfolioData.projects.map((project, index) => (
                    <div key={index} className={`p-6 border rounded-lg space-y-4 ${
                      isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Project {index + 1}
                        </h3>
                        <button
                          onClick={() => removeProject(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            Project Title
                          </label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => updateProject(index, 'title', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              isDarkMode 
                                ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder="My Awesome Project"
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            Project URL
                          </label>
                          <input
                            type="url"
                            value={project.projectUrl}
                            onChange={(e) => updateProject(index, 'projectUrl', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              isDarkMode 
                                ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder="https://myproject.com"
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            GitHub URL
                          </label>
                          <input
                            type="url"
                            value={project.githubUrl}
                            onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              isDarkMode 
                                ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder="https://github.com/user/repo"
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            Image URL
                          </label>
                          <input
                            type="url"
                            value={project.imageUrl}
                            onChange={(e) => updateProject(index, 'imageUrl', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              isDarkMode 
                                ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          Description
                        </label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(index, 'description', e.target.value)}
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            isDarkMode 
                              ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder="Describe your project..."
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          Technologies (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={project.technologies.join(', ')}
                          onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(tech => tech.trim()))}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            isDarkMode 
                              ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder="React, TypeScript, Node.js"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skills Section */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Skills
                    </h2>
                    <button
                      onClick={addSkill}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <PlusIcon className="w-4 h-4" />
                      Add Skill
                    </button>
                  </div>

                  {portfolioData.skills.map((skill, index) => (
                    <div key={index} className={`p-4 border rounded-lg ${
                      isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
                    }`}>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Skill {index + 1}
                        </h3>
                        <button
                          onClick={() => removeSkill(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            Skill Name
                          </label>
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(index, 'name', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              isDarkMode 
                                ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder="JavaScript"
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            Category
                          </label>
                          <input
                            type="text"
                            value={skill.category}
                            onChange={(e) => updateSkill(index, 'category', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              isDarkMode 
                                ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder="Programming Language"
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            Level
                          </label>
                          <select
                            value={skill.level}
                            onChange={(e) => updateSkill(index, 'level', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              isDarkMode 
                                ? 'bg-gray-600 border-gray-500 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Save Button and Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>

                  {portfolioSlug && portfolioData.isPublic && (
                    <a
                      href={`/${portfolioSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Portfolio
                    </a>
                  )}

                  {portfolioSlug && !portfolioData.isPublic && (
                    <div className="text-gray-500 text-sm text-center">
                      Set portfolio to public to view it live
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}