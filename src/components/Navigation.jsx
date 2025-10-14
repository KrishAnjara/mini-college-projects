import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, 
  GraduationCap, 
  Building2, 
  Home, 
  Settings, 
  Menu, 
  X,
  User,
  Zap
} from 'lucide-react'
import useGlobalStore from '../store/globalConfig'

const Navigation = ({ onConfigClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { studentInfo } = useGlobalStore()

  const navItems = [
    { path: '/', icon: Home, label: 'Home', color: 'text-neon-blue' },
    { path: '/calculator', icon: Calculator, label: 'Calculator', color: 'text-neon-purple' },
    { path: '/grades', icon: GraduationCap, label: 'Grades', color: 'text-neon-green' },
    { path: '/bank', icon: Building2, label: 'Bank', color: 'text-neon-pink' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Zap className="w-8 h-8 text-neon-blue group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-neon-blue blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </div>
              <span className="font-futuristic text-xl gradient-text hidden sm:block">
                FUTURISTIC SUITE
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 group relative ${
                      isActive(item.path) 
                        ? 'bg-glass-bg border border-glass-border' 
                        : 'hover:bg-glass-bg/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${item.color} group-hover:animate-pulse`} />
                    <span className="font-tech text-sm">{item.label}</span>
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 border-2 border-neon-blue rounded-lg"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* User Info & Settings */}
            <div className="flex items-center space-x-4">
              {/* Student Info */}
              <div className="hidden lg:block text-right">
                <p className="text-sm font-tech text-neon-blue">{studentInfo.name}</p>
                <p className="text-xs text-gray-400">{studentInfo.rollNumber}</p>
              </div>

              {/* Settings Button */}
              <button
                onClick={onConfigClick}
                className="p-2 rounded-lg glass-card hover:bg-glass-bg/50 transition-all duration-300 group"
                title="Settings & Configuration"
              >
                <Settings className="w-5 h-5 text-neon-blue group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg glass-card hover:bg-glass-bg/50 transition-all duration-300"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-neon-blue" />
                ) : (
                  <Menu className="w-5 h-5 text-neon-blue" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
          >
            <div className="glass-card border-t border-glass-border mx-4 mt-2 rounded-xl overflow-hidden">
              {/* Student Info Mobile */}
              <div className="p-4 border-b border-glass-border bg-glass-bg/30">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-tech text-sm text-neon-blue">{studentInfo.name}</p>
                    <p className="text-xs text-gray-400">{studentInfo.rollNumber} • {studentInfo.college}</p>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Items */}
              <div className="py-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 transition-all duration-300 ${
                          isActive(item.path) 
                            ? 'bg-glass-bg border-r-2 border-neon-blue' 
                            : 'hover:bg-glass-bg/30'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${item.color}`} />
                        <span className="font-tech">{item.label}</span>
                        {isActive(item.path) && (
                          <div className="ml-auto w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation