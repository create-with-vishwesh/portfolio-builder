"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeftIcon, EyeIcon, ChartBarIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

interface PortfolioAnalytics {
  viewCount: number
  slug: string
  isPublic: boolean
  createdAt: string
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [analytics, setAnalytics] = useState<PortfolioAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    if (status === "loading") return
    
    if (!session) {
      router.push("/auth/signin")
      return
    }

    fetchAnalytics()
  }, [session, status, router])

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/portfolio/analytics")
      
      if (!response.ok) {
        throw new Error("Failed to fetch analytics")
      }
      
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error("Error fetching analytics:", error)
      setError("Failed to load analytics data")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  if (status === "loading" || isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-32 w-32 border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-indigo-600'} mx-auto`}></div>
          <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className={`text-red-500 text-lg mb-4`}>{error}</div>
          <button
            onClick={fetchAnalytics}
            className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 py-2 rounded-md transition-colors`}
          >
            Try Again
          </button>
        </div>
      </div>
    )
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
                <Link 
                  href="/dashboard/templates" 
                  className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                >
                  Templates
                </Link>
                <span className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  Analytics
                </span>
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

        {analytics ? (
          <div className="space-y-6">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Portfolio Analytics</h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Track your portfolio performance</p>
            </div>

            {/* Main Analytics Card */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-8`}>
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${isDarkMode ? 'bg-blue-900/50' : 'bg-indigo-100'} rounded-full mb-4`}>
                  <EyeIcon className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-indigo-600'}`} />
                </div>
                <div className="space-y-2">
                  <h2 className={`text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
                    {analytics.viewCount.toLocaleString()}
                  </h2>
                  <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Portfolio Views</p>
                </div>
              </div>
            </div>

            {/* Additional Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Portfolio Status */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                      analytics.isPublic ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      <ChartBarIcon className={`h-6 w-6 ${
                        analytics.isPublic ? 'text-green-600' : 'text-yellow-600'
                      }`} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Status</h3>
                    <p className={`text-sm ${
                      analytics.isPublic ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {analytics.isPublic ? 'Public' : 'Private'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Portfolio URL */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'} rounded-full`}>
                      <ArrowLeftIcon className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transform rotate-45`} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Portfolio URL</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} truncate`}>
                      /{analytics.slug}
                    </p>
                  </div>
                </div>
              </div>

              {/* Created Date */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'} rounded-full`}>
                      <ChartBarIcon className={`h-6 w-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Created</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {new Date(analytics.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className={`${isDarkMode ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-50'} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-900'} mb-3`}>
                💡 Tips to Increase Portfolio Views
              </h3>
              <ul className={`space-y-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                <li>• Share your portfolio URL on social media platforms</li>
                <li>• Include it in your email signature</li>
                <li>• Add it to your LinkedIn profile</li>
                <li>• Share it with potential employers and networking contacts</li>
                <li>• Make sure your portfolio is set to &quot;Public&quot; in settings</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Link
                href="/dashboard/edit"
                className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-6 py-3 rounded-lg font-medium transition-colors`}
              >
                Edit Portfolio
              </Link>
              {analytics.isPublic && (
                <Link
                  href={`/${analytics.slug}`}
                  className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-600 hover:bg-gray-700'} text-white px-6 py-3 rounded-lg font-medium transition-colors`}
                  target="_blank"
                >
                  View Live Portfolio
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-8 text-center`}>
            <ChartBarIcon className={`h-16 w-16 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mx-auto mb-4`} />
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>No Portfolio Found</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              You need to create a portfolio first to view analytics.
            </p>
            <Link
              href="/dashboard/edit"
              className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-6 py-3 rounded-lg font-medium transition-colors`}
            >
              Create Portfolio
            </Link>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}