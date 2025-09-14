"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline"

interface Template {
  id: string
  name: string
  description: string
  preview: string
  color: string
  features: string[]
}

export default function TemplatesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string>("onyx")
  const [currentTemplate, setCurrentTemplate] = useState<string>("onyx")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

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
        setSaveMessage("Template updated successfully!")
        setTimeout(() => setSaveMessage(""), 3000)
      } else {
        throw new Error("Failed to update template")
      }
    } catch (error) {
      console.error("Error updating template:", error)
      setSelectedTemplate(currentTemplate) // Revert selection on error
    } finally {
      setSaving(false)
    }
  }

  const templates: Template[] = [
    {
      id: "onyx",
      name: "Onyx",
      description: "A modern dark theme with sleek gradients and professional styling",
      preview: "Modern • Dark • Professional",
      color: "from-gray-900 to-black",
      features: ["Dark theme", "Modern gradients", "Professional layout", "High contrast"]
    },
    {
      id: "quartz",
      name: "Quartz",
      description: "A clean light theme with minimalist design and elegant typography",
      preview: "Clean • Light • Minimalist",
      color: "from-white to-gray-100",
      features: ["Light theme", "Minimalist design", "Clean typography", "Spacious layout"]
    },
    {
      id: "sapphire",
      name: "Sapphire",
      description: "A professional blue theme with corporate appeal and trust-building colors",
      preview: "Professional • Blue • Corporate",
      color: "from-blue-600 to-blue-800",
      features: ["Blue theme", "Corporate design", "Professional appeal", "Trust-building"]
    }
  ]

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading templates...</div>
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
                <h1 className="text-2xl font-bold text-gray-900">Choose a Template</h1>
                <p className="text-gray-600">Select a theme for your portfolio</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Current: <span className="font-medium capitalize">{currentTemplate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Save Message */}
        {saveMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800">{saveMessage}</span>
            </div>
          </div>
        )}

        {/* Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {templates.map((template) => {
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
                {/* Template Preview */}
                <div className={`h-48 bg-gradient-to-br ${template.color} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-center ${template.id === 'quartz' ? 'text-gray-800' : 'text-white'}`}>
                      <div className="text-xl font-bold mb-2">{template.name}</div>
                      <div className="text-sm opacity-80">{template.preview}</div>
                    </div>
                  </div>
                  
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-indigo-500 text-white rounded-full p-2">
                      <CheckIcon className="h-4 w-4" />
                    </div>
                  )}
                  
                  {/* Current Template Badge */}
                  {isCurrent && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Current
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                    {isSaving && selectedTemplate === template.id && (
                      <div className="text-sm text-indigo-600">Saving...</div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  
                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {template.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Selection Button */}
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

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Template Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">How Templates Work</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Templates change the visual theme of your portfolio</li>
                <li>• Your content remains the same across all templates</li>
                <li>• Changes apply instantly to your live portfolio</li>
                <li>• You can switch templates anytime</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Preview how each template looks with your content</li>
                <li>• Choose based on your target audience</li>
                <li>• Dark themes work well for tech portfolios</li>
                <li>• Light themes are great for creative fields</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}