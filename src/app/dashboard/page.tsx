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
  const [stats, setStats] = useState<DashboardStats>({
    hasPortfolio: false,
    isPublic: false,
    projectCount: 0,
    skillCount: 0
  })
  const [isLoading, setIsLoading] = useState(true)

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading your dashboard...</div>
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
      stats: "Coming soon",
      disabled: true
    },
    {
      title: "Account Settings",
      description: "Manage your account and preferences",
      icon: CogIcon,
      href: "/dashboard/settings",
      color: "bg-gray-500 hover:bg-gray-600",
      stats: "Profile settings",
      disabled: true
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <UserIcon className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {session.user?.name || "Student"}!
                  </h1>
                  <p className="text-gray-600">Manage your digital portfolio</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Portfolio Status Banner */}
        {stats.hasPortfolio ? (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Portfolio Status</h2>
                <p className="text-gray-600 mt-1">
                  Your portfolio is {stats.isPublic ? (
                    <span className="text-green-600 font-medium">live and public</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">saved but private</span>
                  )}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{stats.projectCount}</div>
                  <div className="text-sm text-gray-500">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{stats.skillCount}</div>
                  <div className="text-sm text-gray-500">Skills</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PencilIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-blue-900">Ready to create your portfolio?</h2>
                <p className="text-blue-700 mt-1">
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
            
            if (card.disabled) {
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-200 opacity-75 cursor-not-allowed"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gray-100`}>
                        <IconComponent className="h-6 w-6 text-gray-400" />
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">{card.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{card.description}</p>
                    
                    <div className="text-xs text-gray-400">
                      {card.stats}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={index}
                href={card.href}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-gray-300 group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${card.color} transition-colors`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                  
                  <div className="text-xs text-gray-500 font-medium">
                    {card.stats}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Tips Section */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Complete Your Profile</h3>
                <p className="text-sm text-gray-600 mt-1">Add your bio, skills, and projects to make your portfolio stand out.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">2</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Make It Public</h3>
                <p className="text-sm text-gray-600 mt-1">Toggle your portfolio to public so others can view your work.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-sm">3</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Share Your Portfolio</h3>
                <p className="text-sm text-gray-600 mt-1">Share your portfolio URL with potential employers and networks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}