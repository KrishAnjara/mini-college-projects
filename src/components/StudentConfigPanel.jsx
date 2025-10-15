import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  X, 
  User, 
  School, 
  Hash, 
  Mail, 
  Save, 
  Download, 
  Upload,
  Trash2,
  Shield,
  Settings
} from 'lucide-react'
import useGlobalStore from '../store/globalConfig'

const StudentConfigPanel = ({ isOpen, onClose }) => {
  const { 
    studentInfo, 
    appSettings,
    updateStudentInfo, 
    updateAppSettings,
    exportData,
    importData,
    resetAllData
  } = useGlobalStore()

  const [formData, setFormData] = useState(studentInfo)
  const [settings, setSettings] = useState(appSettings)
  const [activeTab, setActiveTab] = useState('settings')
  const [showConfirmReset, setShowConfirmReset] = useState(false)

  const handleSave = () => {
    updateStudentInfo(formData)
    updateAppSettings(settings)
    onClose()
  }

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `futuristic-projects-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          importData(data)
          setFormData(data.studentInfo || formData)
          alert('Data imported successfully!')
        } catch (error) {
          alert('Error importing data. Please check the file format.')
        }
      }
      reader.readAsText(file)
    }
  }

  const handleReset = () => {
    if (showConfirmReset) {
      resetAllData()
      setShowConfirmReset(false)
      alert('All data has been reset!')
    } else {
      setShowConfirmReset(true)
      setTimeout(() => setShowConfirmReset(false), 5000)
    }
  }

  const tabs = [
    { id: 'settings', label: 'App Settings', icon: Settings },
    { id: 'data', label: 'Data Management', icon: Shield }
  ]

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative glass-card w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <h2 className="text-2xl font-futuristic gradient-text">Configuration Panel</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-glass-bg/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-glass-border">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-glass-bg border-b-2 border-neon-blue text-neon-blue'
                    : 'hover:bg-glass-bg/30 text-gray-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-tech text-sm">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {/* App Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-tech text-neon-purple mb-3">Visual Settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.animations}
                        onChange={(e) => setSettings({...settings, animations: e.target.checked})}
                        className="rounded border-neon-blue"
                      />
                      <span className="text-sm">Enable Animations</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.soundEffects}
                        onChange={(e) => setSettings({...settings, soundEffects: e.target.checked})}
                        className="rounded border-neon-blue"
                      />
                      <span className="text-sm">Sound Effects</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-tech text-neon-green mb-3">System Settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                        className="rounded border-neon-blue"
                      />
                      <span className="text-sm">Notifications</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.autoSave}
                        onChange={(e) => setSettings({...settings, autoSave: e.target.checked})}
                        className="rounded border-neon-blue"
                      />
                      <span className="text-sm">Auto Save</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Data Management Tab */}
          {activeTab === 'data' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleExport}
                  className="flex items-center justify-center space-x-2 p-4 glass-card hover:bg-glass-bg/50 transition-all duration-300 rounded-lg"
                >
                  <Download className="w-5 h-5 text-neon-green" />
                  <span className="font-tech">Export Data</span>
                </button>

                <label className="flex items-center justify-center space-x-2 p-4 glass-card hover:bg-glass-bg/50 transition-all duration-300 rounded-lg cursor-pointer">
                  <Upload className="w-5 h-5 text-neon-blue" />
                  <span className="font-tech">Import Data</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="border-t border-glass-border pt-4">
                <h3 className="text-lg font-tech text-red-400 mb-3">Danger Zone</h3>
                <button
                  onClick={handleReset}
                  className={`flex items-center justify-center space-x-2 p-4 w-full rounded-lg transition-all duration-300 ${
                    showConfirmReset
                      ? 'bg-red-500/20 border-2 border-red-500 text-red-400'
                      : 'glass-card hover:bg-red-500/10 text-red-400'
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="font-tech">
                    {showConfirmReset ? 'Click again to confirm reset' : 'Reset All Data'}
                  </span>
                </button>
                {showConfirmReset && (
                  <p className="text-xs text-red-400 mt-2 text-center">
                    This will permanently delete all your data!
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-glass-border">
          <div className="text-xs text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg glass-card hover:bg-glass-bg/50 transition-colors font-tech"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="neon-button flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Apply</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default StudentConfigPanel
