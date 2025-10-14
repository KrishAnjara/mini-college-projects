import React, { Suspense, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import Navigation from './components/Navigation'
import LoadingScreen from './components/LoadingScreen'
import ParticleBackground from './components/ParticleBackground'
import StudentConfigPanel from './components/StudentConfigPanel'

// Pages
import HomePage from './pages/HomePage'
import CalculatorPage from './pages/CalculatorPage'
import GradeSystemPage from './pages/GradeSystemPage'
import BankSystemPage from './pages/BankSystemPage'

// Store
import useGlobalStore from './store/globalConfig'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showConfigPanel, setShowConfigPanel] = useState(false)
  const { studentInfo, appSettings } = useGlobalStore()

  useEffect(() => {
    // Optimized loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Reduced from 3000ms to 1500ms

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Main Application */}
        <div className="relative z-10">
          {/* Navigation */}
          <Navigation onConfigClick={() => setShowConfigPanel(true)} />
          
          {/* Main Content */}
          <main className="pt-20">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="loading-spinner"></div>
              </div>
            }>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/calculator" element={<CalculatorPage />} />
                  <Route path="/grades" element={<GradeSystemPage />} />
                  <Route path="/bank" element={<BankSystemPage />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
        </div>

        {/* Student Config Panel */}
        <AnimatePresence>
          {showConfigPanel && (
            <StudentConfigPanel 
              isOpen={showConfigPanel}
              onClose={() => setShowConfigPanel(false)}
            />
          )}
        </AnimatePresence>

        {/* Global Styles based on settings */}
        <style jsx global>{`
          .app-container {
            filter: ${appSettings.animations ? 'none' : 'contrast(1.1)'};
            transition: filter 0.3s ease;
          }
        `}</style>
      </div>
    </Router>
  )
}

export default App