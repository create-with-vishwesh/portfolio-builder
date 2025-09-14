"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"

// Confirmation Modal Component
function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirm",
  isDestructive = false 
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  isDestructive?: boolean
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center mb-4">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-500 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              isDestructive 
                ? "bg-red-600 hover:bg-red-700 text-white" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

// Alert Component for Success/Error Messages
function Alert({ type, message, onDismiss }: { 
  type: 'success' | 'error', 
  message: string, 
  onDismiss: () => void 
}) {
  const isSuccess = type === 'success'
  
  return (
    <div className={`flex items-center p-4 mb-6 rounded-lg border ${
      isSuccess 
        ? 'bg-green-50 border-green-200 text-green-800' 
        : 'bg-red-50 border-red-200 text-red-800'
    }`}>
      {isSuccess ? (
        <CheckCircleIcon className="w-5 h-5 mr-3" />
      ) : (
        <XCircleIcon className="w-5 h-5 mr-3" />
      )}
      <span className="flex-1">{message}</span>
      <button 
        onClick={onDismiss}
        className="ml-3 text-sm font-medium hover:underline"
      >
        Dismiss
      </button>
    </div>
  )
}

export default function AccountSettingsPage() {
  const { data: session, status, update } = useSession()
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/signin")
    }
  }, [status])

  // Load current username when session is available
  useEffect(() => {
    const loadCurrentUsername = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch('/api/portfolio')
          if (response.ok) {
            const data = await response.json()
            if (data.portfolio?.slug) {
              setUsername(data.portfolio.slug)
            }
          }
        } catch (error) {
          console.error('Error loading username:', error)
        }
      }
    }
    
    loadCurrentUsername()
  }, [session])

  const handleUsernameUpdate = async () => {
    if (!username.trim()) {
      setAlert({ type: 'error', message: 'Username cannot be empty' })
      return
    }

    // Basic username validation
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setAlert({ type: 'error', message: 'Username can only contain letters, numbers, hyphens, and underscores' })
      return
    }

    if (username.length < 3 || username.length > 20) {
      setAlert({ type: 'error', message: 'Username must be between 3 and 20 characters' })
      return
    }

    setIsLoading(true)
    setAlert(null)

    try {
      const response = await fetch('/api/account', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUsername: username }),
      })

      const data = await response.json()

      if (response.ok) {
        setAlert({ type: 'success', message: 'Username updated successfully!' })
        // Update the session to reflect the new username
        await update()
      } else {
        setAlert({ type: 'error', message: data.error || 'Failed to update username' })
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Network error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccountDeletion = async () => {
    setIsDeleting(true)
    setAlert(null)

    try {
      const response = await fetch('/api/account', {
        method: 'DELETE',
      })

      if (response.ok) {
        setAlert({ type: 'success', message: 'Account deleted successfully. Redirecting...' })
        // Sign out and redirect to homepage
        setTimeout(() => {
          signOut({ callbackUrl: '/' })
        }, 2000)
      } else {
        const data = await response.json()
        setAlert({ type: 'error', message: data.error || 'Failed to delete account' })
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Network error. Please try again.' })
    } finally {
      setIsDeleting(false)
      setShowDeleteModal(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Navigation */}
        <div className="mb-8 flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="h-6 w-px bg-gray-300"></div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-2">Manage your account preferences and data</p>
          </div>
        </div>

      {alert && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onDismiss={() => setAlert(null)} 
        />
      )}

      <div className="space-y-8">
        {/* Profile Settings Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
          </div>
          
          <div className="px-6 py-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-900 mb-2">
                  Public Username
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    placeholder="Enter your username"
                  />
                  <button
                    onClick={handleUsernameUpdate}
                    disabled={isLoading}
                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  This will change your public portfolio URL.
                  {username && (
                    <span className="block mt-1">
                      Current URL: <span className="font-mono text-indigo-600">
                        {typeof window !== 'undefined' ? window.location.origin : ''}/{username}
                      </span>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone Card */}
        <div className="bg-white border-2 border-red-200 rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-red-200 bg-red-50">
            <h2 className="text-xl font-semibold text-red-900">Danger Zone</h2>
          </div>
          
          <div className="px-6 py-6">
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  disabled={isDeleting}
                  className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? 'Deleting...' : 'Delete My Account'}
                </button>
                <p className="text-sm text-gray-600 mt-3">
                  This will permanently delete your account and all of your portfolio data. 
                  This action is irreversible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleAccountDeletion}
        title="Delete Account"
        message="Are you sure you want to delete your account? This will permanently remove all your portfolio data and cannot be undone."
        confirmText="Yes, Delete My Account"
        isDestructive={true}
      />
      </div>
    </div>
  )
}