import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  GraduationCap, 
  Building2, 
  ArrowRight,
  Zap,
  Code,
  Sparkles,
  CodeXml
} from 'lucide-react'
import useGlobalStore from '../store/globalConfig'

const HomePage = () => {
  const { studentInfo, calculatorData, gradeSystemData, bankSystemData } = useGlobalStore()

  const projects = [
    {
      id: 'calculator',
      title: '3D Calculator',
      description: 'Advanced arithmetic calculator with 3D animations and memory functions',
      icon: Calculator,
      color: 'from-neon-purple to-purple-600',
      path: '/calculator',
      stats: `${calculatorData.history.length} calculations`,
      features: ['Basic Operations', '3D Interface', 'Memory Storage', 'History Tracking']
    },
    {
      id: 'grades',
      title: 'Grade System',
      description: 'Interactive student grade management with visual analytics',
      icon: GraduationCap,
      color: 'from-neon-green to-green-600',
      path: '/grades',
      stats: `${gradeSystemData.students.length} students`,
      features: ['Grade Calculation', 'Performance Analytics', 'Report Generation', 'Data Export']
    },
    {
      id: 'bank',
      title: 'Bank System',
      description: 'Futuristic banking dashboard with transaction management',
      icon: Building2,
      color: 'from-neon-pink to-pink-600',
      path: '/bank',
      stats: `${bankSystemData.accounts.length} accounts`,
      features: ['Account Management', 'Transactions', 'Balance Tracking', 'Security Features']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 md:mb-16 px-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4 md:mb-6">
            <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-neon-blue animate-pulse" />
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-futuristic neon-text">
              FUTURISTIC
            </h1>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-tech gradient-text mb-4 md:mb-6">
            Mini Projects Suite
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Experience the future of web applications with our interactive 3D mini projects.
            Built with cutting-edge technology for the modern developer.
          </p>
        </motion.div>

        {/* Student Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-card p-4 sm:p-6 md:p-8 mb-8 md:mb-16 max-w-4xl mx-auto hologram-effect"
        >
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-4 lg:gap-6">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <Code className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-futuristic text-neon-blue">{studentInfo.name}</h3>
                <p className="text-sm sm:text-base text-gray-300 font-tech">{studentInfo.rollNumber} • {studentInfo.college}</p>
                <p className="text-xs sm:text-sm text-neon-purple">{studentInfo.subject} Assignment</p>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="flex items-center justify-center lg:justify-end space-x-2 text-neon-green mb-2">
                <CodeXml className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-tech text-sm sm:text-base">Python Programming</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">Advanced Repository Structure</p>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group"
              >
                <Link to={project.path}>
                  <div className="floating-card p-8 h-full relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                    
                    {/* Icon */}
                    <div className="relative z-10 mb-6">
                      <div className="w-16 h-16 rounded-xl bg-glass-bg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-neon-blue" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-2xl font-futuristic text-white mb-3 group-hover:text-neon-blue transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-neon-purple font-tech">{project.stats}</span>
                        <ArrowRight className="w-5 h-5 text-neon-blue group-hover:translate-x-2 transition-transform duration-300" />
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        {project.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <Sparkles className="w-3 h-3 text-neon-green" />
                            <span className="text-xs text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-blue rounded-xl transition-colors duration-300" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="glass-card p-8 text-center"
        >
          <h3 className="text-2xl font-futuristic gradient-text mb-6">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'React.js', desc: 'Modern UI Framework' },
              { name: 'Three.js', desc: '3D Graphics Engine' },
              { name: 'Tailwind CSS', desc: 'Utility-First CSS' },
              { name: 'Framer Motion', desc: 'Animation Library' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="p-4 glass-card hover:bg-glass-bg/50 transition-colors duration-300"
              >
                <h4 className="font-tech text-neon-blue mb-2">{tech.name}</h4>
                <p className="text-xs text-gray-400">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-16 text-gray-400"
        >
          <p className="font-tech">
            Built with ❤️ by {studentInfo.name} • {new Date().getFullYear()}
          </p>
          <p className="text-sm mt-2">
            Demonstrating advanced Github Management and modern web development
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage