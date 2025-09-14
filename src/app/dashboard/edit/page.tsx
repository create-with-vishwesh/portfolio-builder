"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { PlusIcon, TrashIcon, EyeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"
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
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [error, setError] = useState("")
  const [portfolioSlug, setPortfolioSlug] = useState<string | null>(null)
  
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    aboutMe: "",
    jobTitle: "",
    profileImage: "",
    socialLinks: {},
    projects: [],
    skills: [],
    isPublic: false
  })

  const [newSkill, setNewSkill] = useState({ name: "", category: "Programming Languages", level: "Intermediate" })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  // Fetch existing portfolio data
  useEffect(() => {
    if (session?.user?.id) {
      fetchPortfolio()
    }
  }, [session])

  const fetchPortfolio = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/portfolio")
      const data = await response.json()
      
      if (response.ok && data.portfolio) {
        const portfolio = data.portfolio
        setPortfolioSlug(portfolio.slug) // Store the portfolio slug
        setPortfolioData({
          aboutMe: portfolio.aboutMe || "",
          jobTitle: portfolio.jobTitle || "",
          profileImage: portfolio.profileImage || "",
          socialLinks: portfolio.socialLinks || {},
          projects: portfolio.projects || [],
          skills: portfolio.skills || [],
          isPublic: portfolio.isPublic || false
        })
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfileData = (field: string, value: any) => {
    setPortfolioData(prev => ({ ...prev, [field]: value }))
  }

  const updateSocialLink = (platform: string, url: string) => {
    setPortfolioData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: url }
    }))
  }

  const addProject = () => {
    const newProject: Project = {
      title: "",
      description: "",
      projectUrl: "",
      githubUrl: "",
      imageUrl: "",
      technologies: []
    }
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }))
  }

  const updateProject = (index: number, field: string, value: any) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }))
  }

  const removeProject = (index: number) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }))
  }

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setPortfolioData(prev => ({
        ...prev,
        skills: [...prev.skills, { ...newSkill }]
      }))
      setNewSkill({ name: "", category: "Programming Languages", level: "Intermediate" })
    }
  }

  const removeSkill = (index: number) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      setError("")
      setSaveMessage("")

      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(portfolioData)
      })

      const data = await response.json()

      if (response.ok) {
        setSaveMessage("Portfolio saved successfully!")
        // Store the slug from the response if it exists
        if (data.portfolio && data.portfolio.slug) {
          setPortfolioSlug(data.portfolio.slug)
        }
        setTimeout(() => setSaveMessage(""), 3000)
      } else {
        throw new Error(data.error || "Failed to save portfolio")
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsSaving(false)
    }
  }

  const handleViewPortfolio = () => {
    if (portfolioSlug) {
      // Open portfolio in new tab
      window.open(`/${portfolioSlug}`, '_blank')
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-2xl font-bold text-gray-900">Portfolio Editor</h1>
                <p className="text-gray-600">Create and customize your portfolio</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Profile Details Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={portfolioData.jobTitle}
                  onChange={(e) => updateProfileData("jobTitle", e.target.value)}
                  placeholder="e.g., Aspiring Software Engineer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  value={portfolioData.profileImage}
                  onChange={(e) => updateProfileData("profileImage", e.target.value)}
                  placeholder="https://example.com/profile.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Me
              </label>
              <textarea
                rows={4}
                value={portfolioData.aboutMe}
                onChange={(e) => updateProfileData("aboutMe", e.target.value)}
                placeholder="Tell us about yourself, your background, and your goals..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              />
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={portfolioData.socialLinks.linkedin || ""}
                    onChange={(e) => updateSocialLink("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub
                  </label>
                  <input
                    type="url"
                    value={portfolioData.socialLinks.github || ""}
                    onChange={(e) => updateSocialLink("github", e.target.value)}
                    placeholder="https://github.com/yourusername"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={portfolioData.socialLinks.twitter || ""}
                    onChange={(e) => updateSocialLink("twitter", e.target.value)}
                    placeholder="https://twitter.com/yourusername"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={portfolioData.socialLinks.website || ""}
                    onChange={(e) => updateSocialLink("website", e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Portfolio Visibility */}
            <div className="mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={portfolioData.isPublic}
                  onChange={(e) => updateProfileData("isPublic", e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Make my portfolio public
                </span>
              </label>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills</h2>
            
            {/* Add New Skill */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <input
                    type="text"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Skill name (e.g., JavaScript)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>
                <div>
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  >
                    <option value="Programming Languages">Programming Languages</option>
                    <option value="Frameworks">Frameworks</option>
                    <option value="Tools">Tools</option>
                    <option value="Databases">Databases</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <select
                    value={newSkill.level}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <button
                    onClick={addSkill}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Skill
                  </button>
                </div>
              </div>
            </div>

            {/* Skills List */}
            <div className="space-y-3">
              {portfolioData.skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-900">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.category}</span>
                    <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">
                      {skill.level}
                    </span>
                  </div>
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {portfolioData.skills.length === 0 && (
                <p className="text-gray-500 text-center py-4">No skills added yet. Add your first skill above!</p>
              )}
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
              <button
                onClick={addProject}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Project
              </button>
            </div>

            <div className="space-y-6">
              {portfolioData.projects.map((project, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Project {index + 1}</h3>
                    <button
                      onClick={() => removeProject(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateProject(index, "title", e.target.value)}
                        placeholder="My Awesome Project"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Image URL
                      </label>
                      <input
                        type="url"
                        value={project.imageUrl}
                        onChange={(e) => updateProject(index, "imageUrl", e.target.value)}
                        placeholder="https://example.com/project-image.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Live Demo URL
                      </label>
                      <input
                        type="url"
                        value={project.projectUrl}
                        onChange={(e) => updateProject(index, "projectUrl", e.target.value)}
                        placeholder="https://myproject.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={project.githubUrl}
                        onChange={(e) => updateProject(index, "githubUrl", e.target.value)}
                        placeholder="https://github.com/username/project"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={project.description}
                      onChange={(e) => updateProject(index, "description", e.target.value)}
                      placeholder="Describe your project, the technologies used, and what problems it solves..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Technologies (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={project.technologies.join(", ")}
                      onChange={(e) => updateProject(index, "technologies", e.target.value.split(",").map(tech => tech.trim()).filter(tech => tech))}
                      placeholder="React, Node.js, MongoDB, Tailwind CSS"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    />
                  </div>
                </div>
              ))}

              {portfolioData.projects.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-4">No projects added yet.</p>
                  <button
                    onClick={addProject}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
                  >
                    Add Your First Project
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center space-y-4">
              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}
              
              {saveMessage && (
                <div className="text-green-600 text-sm text-center">{saveMessage}</div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 sm:flex-none bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving Changes..." : "Save Changes"}
                </button>

                {portfolioSlug && portfolioData.isPublic && (
                  <button
                    onClick={handleViewPortfolio}
                    className="flex-1 sm:flex-none bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 font-medium inline-flex items-center justify-center gap-2"
                  >
                    <EyeIcon className="w-5 h-5" />
                    View Portfolio
                  </button>
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
  )
}