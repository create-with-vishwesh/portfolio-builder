"use client"

import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
        : 'bg-gradient-to-br from-indigo-50 via-white to-cyan-50'
    }`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md rounded-3xl mx-4 mt-2 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-black/80 border border-gray-800/50' 
          : 'bg-white/80 border border-gray-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
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
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
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
              <Link
                href="/auth/signin"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Create Your
            <span className={`transition-colors duration-300 ${
              isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
            }`}> Portfolio</span>
            <br />
            in Minutes
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            A no-code platform for students to create beautiful, professional portfolios. 
            Just fill out a simple form and get a stunning, shareable portfolio page.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Create Your Portfolio
            </Link>
            <Link
              href="/auth/signin"
              className={`border px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-300 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              I Have an Account
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`text-center p-6 rounded-lg shadow-lg border transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-indigo-900' 
                : 'bg-indigo-100'
            }`}>
              <svg className={`w-6 h-6 transition-colors duration-300 ${
                isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Lightning Fast</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Create your portfolio in minutes, not hours. Our intuitive form makes it simple.</p>
          </div>

          <div className={`text-center p-6 rounded-lg shadow-lg border transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-indigo-900' 
                : 'bg-indigo-100'
            }`}>
              <svg className={`w-6 h-6 transition-colors duration-300 ${
                isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Beautiful Design</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Professional, responsive designs that look great on any device.</p>
          </div>

          <div className={`text-center p-6 rounded-lg shadow-lg border transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-indigo-900' 
                : 'bg-indigo-100'
            }`}>
              <svg className={`w-6 h-6 transition-colors duration-300 ${
                isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Easy Sharing</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Get a unique URL to share your portfolio with employers and colleagues.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`mt-20 text-center rounded-2xl p-12 border transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to showcase your work?
          </h2>
          <p className={`text-lg mb-8 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of students who have already created their portfolios.
          </p>
          <Link
            href="/auth/signup"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Start Building Now
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t mt-20 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`text-center transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <p>&copy; 2025 Port4lio. Made for students, by students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}