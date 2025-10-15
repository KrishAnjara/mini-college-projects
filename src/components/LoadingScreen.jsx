import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useGlobalStore from '../store/globalConfig'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState('Initializing...')
  const { studentInfo } = useGlobalStore()

  const loadingTexts = [
    'Initializing System...',
    'Loading Components...',
    'Setting up Interface...',
    `Welcome, ${studentInfo.name}...`,
    'Ready!'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1 // Faster loading
        const textIndex = Math.floor((newProgress / 100) * loadingTexts.length)
        setCurrentText(loadingTexts[Math.min(textIndex, loadingTexts.length - 1)])
        return Math.min(newProgress, 100)
      })
    }, 35) // Faster interval

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-dark-bg flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      {/* Subtle Matrix Effect - Reduced for performance */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-neon-green text-xs opacity-20 matrix-char"
            style={{
              left: `${i * 12}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${4 + Math.random()}s`
            }}
          >
            {String.fromCharCode(65 + Math.random() * 26)}
          </div>
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h1 className="text-6xl font-futuristic neon-text mb-4">
            FUTURISTIC
          </h1>
          <h2 className="text-2xl font-tech gradient-text">
            Mini Projects Suite
          </h2>
        </motion.div>

        {/* Student Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="glass-card p-6 mb-8 max-w-md mx-auto"
        >
          <div className="text-sm text-gray-300 space-y-1">
            <p><span className="text-neon-blue">Student:</span> {studentInfo.name}</p>
            <p><span className="text-neon-blue">Roll:</span> {studentInfo.rollNumber}</p>
            <p><span className="text-neon-blue">College:</span> {studentInfo.college}</p>
            <p><span className="text-neon-blue">Subject:</span> {studentInfo.subject}</p>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="w-80 mx-auto"
        >
          <div className="mb-4">
            <p className="text-neon-blue font-tech text-sm">{currentText}</p>
          </div>
          
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
          </div>
          
          <div className="mt-2 text-right">
            <span className="text-xs text-gray-400">{progress}%</span>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-8 flex justify-center space-x-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-neon-blue rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Hologram Effect */}
        <div className="absolute inset-0 hologram-effect pointer-events-none"></div>
      </div>
    </div>
  )
}

export default LoadingScreen
