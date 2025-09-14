"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeftIcon, EyeIcon, ChartBarIcon } from "@heroicons/react/24/outline"
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

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading analytics...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <button
            onClick={fetchAnalytics}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Portfolio Analytics</h1>
                <p className="text-gray-600">Track your portfolio performance</p>
              </div>
            </div>
          </div>
        </div>

        {analytics ? (
          <div className="space-y-6">
            {/* Main Analytics Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                  <EyeIcon className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-6xl font-bold text-gray-900 tracking-tight">
                    {analytics.viewCount.toLocaleString()}
                  </h2>
                  <p className="text-xl text-gray-600">Total Portfolio Views</p>
                </div>
              </div>
            </div>

            {/* Additional Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Portfolio Status */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                    <h3 className="text-lg font-semibold text-gray-900">Status</h3>
                    <p className={`text-sm ${
                      analytics.isPublic ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {analytics.isPublic ? 'Public' : 'Private'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Portfolio URL */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <ArrowLeftIcon className="h-6 w-6 text-blue-600 transform rotate-45" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Portfolio URL</h3>
                    <p className="text-sm text-gray-600 truncate">
                      /{analytics.slug}
                    </p>
                  </div>
                </div>
              </div>

              {/* Created Date */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
                      <ChartBarIcon className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Created</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(analytics.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                💡 Tips to Increase Portfolio Views
              </h3>
              <ul className="space-y-2 text-blue-800">
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
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Edit Portfolio
              </Link>
              {analytics.isPublic && (
                <Link
                  href={`/${analytics.slug}`}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  target="_blank"
                >
                  View Live Portfolio
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Portfolio Found</h2>
            <p className="text-gray-600 mb-6">
              You need to create a portfolio first to view analytics.
            </p>
            <Link
              href="/dashboard/edit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Create Portfolio
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}