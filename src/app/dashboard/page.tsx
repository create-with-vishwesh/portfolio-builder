"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import {
  PencilIcon,
  RectangleStackIcon,
  ChartBarIcon,
  CogIcon,
  UserIcon,
  EyeIcon
} from "@heroicons/react/24/outline"

interface DashboardStats {
  hasPortfolio: boolean
  portfolioSlug?: string
  isPublic: boolean
  projectCount: number
  skillCount: number
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    hasPortfolio: false,
    isPublic: false,
    projectCount: 0,
    skillCount: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      fetchDashboardStats()
    }
  }, [session])

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/portfolio")
      const data = await response.json()
      
      if (response.ok && data.portfolio) {
        const portfolio = data.portfolio
        setStats({
          hasPortfolio: true,
          portfolioSlug: portfolio.slug,
          isPublic: portfolio.isPublic || false,
          projectCount: portfolio.projects?.length || 0,
          skillCount: portfolio.skills?.length || 0
        })
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className={`text-lg transition-colors duration-300 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>Loading your dashboard...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const dashboardCards = [
    {
      title: "Edit My Portfolio",
      description: "Create and customize your portfolio content",
      icon: PencilIcon,
      href: "/dashboard/edit",
      color: "bg-blue-500 hover:bg-blue-600",
      stats: stats.hasPortfolio ? `${stats.projectCount} projects, ${stats.skillCount} skills` : "Get started"
    },
    {
      title: "Choose a Template",
      description: "Browse and select portfolio templates",
      icon: RectangleStackIcon,
      href: "/dashboard/templates",
      color: "bg-purple-500 hover:bg-purple-600",
      stats: "3 templates available"
    },
    {
      title: "Portfolio Analytics",
      description: "View your portfolio performance and insights",
      icon: ChartBarIcon,
      href: "/dashboard/analytics",
      color: "bg-green-500 hover:bg-green-600",
      stats: "Track views & performance"
    },
    {
      title: "Account Settings",
      description: "Manage your account and preferences",
      icon: CogIcon,
      href: "/dashboard/settings",
      color: "bg-gray-500 hover:bg-gray-600",
      stats: "Profile settings"
    }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
    }`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md rounded-3xl mx-4 mt-2 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-700/80 border border-gray-600/50' 
          : 'bg-white/80 border border-gray-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <h1 
                  className="text-2xl font-bold tracking-tight"
                  style={{ 
                    fontFamily: "var(--font-plus-jakarta-sans)",
                    color: isDarkMode ? "white" : "black"
                  }}
                >
                  Port
                  <span
                    style={{
                      color: "#4f39f6",
                      fontSize: "1.5rem",
                      fontWeight: "900",
                      fontFamily: "var(--font-orbitron)",
                      display: "inline-block",
                      transform: "rotate(-5deg)"
                    }}
                  >
                    4
                  </span>
                  lio
                </h1>
              </div>
              
              {/* Vertical Line */}
              <div className={`h-8 w-px transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-500' : 'bg-gray-400'
              }`}></div>
              
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Welcome, {session.user?.name || "Student"}!
                </p>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Manage your digital portfolio</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-600 hover:bg-gray-500 text-yellow-400' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              {stats.hasPortfolio && stats.isPublic && stats.portfolioSlug && (
                <Link
                  href={`/${stats.portfolioSlug}`}
                  target="_blank"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  View Live Portfolio
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-600 text-white hover:bg-gray-500' 
                    : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                }`}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pt-28">
        {/* Portfolio Status Banner */}
        {stats.hasPortfolio ? (
          <div className={`rounded-lg shadow p-6 mb-8 border transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Portfolio Status</h2>
                <p className={`mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Your portfolio is {stats.isPublic ? (
                    <span className="text-green-400 font-medium">live and public</span>
                  ) : (
                    <span className="text-yellow-400 font-medium">saved but private</span>
                  )}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-indigo-300' : 'text-indigo-600'
                  }`}>{stats.projectCount}</div>
                  <div className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Projects</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-indigo-300' : 'text-indigo-600'
                  }`}>{stats.skillCount}</div>
                  <div className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Skills</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`rounded-lg p-6 mb-8 border transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-blue-800 border-blue-700' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PencilIcon className={`h-8 w-8 transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-600'
                }`} />
              </div>
              <div className="ml-4">
                <h2 className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-100' : 'text-blue-900'
                }`}>Ready to create your portfolio?</h2>
                <p className={`mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-200' : 'text-blue-700'
                }`}>
                  Start by editing your portfolio to add projects, skills, and personal information.
                </p>
              </div>
              <div className="ml-auto">
                <Link
                  href="/dashboard/edit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon
            
            return (
              <Link
                key={index}
                href={card.href}
                className={`rounded-lg shadow hover:shadow-md transition-all duration-200 border group ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${card.color} transition-colors`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <svg className={`h-5 w-5 transition-colors ${
                        isDarkMode 
                          ? 'text-gray-400 group-hover:text-gray-300' 
                          : 'text-gray-400 group-hover:text-gray-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-white group-hover:text-gray-200' 
                      : 'text-gray-900 group-hover:text-gray-700'
                  }`}>
                    {card.title}
                  </h3>
                  <p className={`text-sm mb-4 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{card.description}</p>
                  
                  <div className={`text-xs font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {card.stats}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Tips Section */}
        <div className={`mt-12 rounded-lg shadow p-6 border transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-700 border-gray-600' 
            : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Quick Tips</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode ? 'bg-blue-800' : 'bg-blue-100'
                }`}>
                  <span className={`font-semibold text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-blue-300' : 'text-blue-600'
                  }`}>1</span>
                </div>
              </div>
              <div>
                <h3 className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Complete Your Profile</h3>
                <p className={`text-sm mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Add your bio, skills, and projects to make your portfolio stand out.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode ? 'bg-green-800' : 'bg-green-100'
                }`}>
                  <span className={`font-semibold text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-green-300' : 'text-green-600'
                  }`}>2</span>
                </div>
              </div>
              <div>
                <h3 className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Make It Public</h3>
                <p className={`text-sm mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Toggle your portfolio to public so others can view your work.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode ? 'bg-purple-800' : 'bg-purple-100'
                }`}>
                  <span className={`font-semibold text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-purple-300' : 'text-purple-600'
                  }`}>3</span>
                </div>
              </div>
              <div>
                <h3 className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Share Your Portfolio</h3>
                <p className={`text-sm mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Share your portfolio URL with potential employers and networks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}