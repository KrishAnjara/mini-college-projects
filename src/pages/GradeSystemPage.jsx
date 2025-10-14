import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Sphere, Box } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GraduationCap, 
  Plus, 
  Edit, 
  Trash2, 
  BarChart3,
  Award,
  TrendingUp,
  Users
} from 'lucide-react'
import useGlobalStore from '../store/globalConfig'

// 3D Grade Visualization Component
function GradeVisualization({ students }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return '#39ff14'
      case 'B': return '#00f5ff'
      case 'C': return '#ffff00'
      case 'D': return '#ff8c00'
      case 'F': return '#ff0040'
      default: return '#ffffff'
    }
  }

  return (
    <group ref={groupRef}>
      {students.map((student, index) => {
        const angle = (index / students.length) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = (student.average - 50) / 10 // Height based on average

        return (
          <group key={student.id} position={[x, y, z]}>
            <Sphere args={[0.3]} position={[0, 0, 0]}>
              <meshStandardMaterial 
                color={getGradeColor(student.grade)} 
                emissive={getGradeColor(student.grade)}
                emissiveIntensity={0.2}
              />
            </Sphere>
            <Text
              position={[0, 0.8, 0]}
              fontSize={0.2}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {student.grade}
            </Text>
          </group>
        )
      })}
      
      {/* Center Platform */}
      <Box args={[8, 0.1, 8]} position={[0, -2, 0]}>
        <meshStandardMaterial 
          color="#1a1a2e" 
          transparent 
          opacity={0.3}
        />
      </Box>
      
      <pointLight position={[0, 5, 0]} color="#00f5ff" intensity={0.5} />
    </group>
  )
}

const GradeSystemPage = () => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    marks: [0, 0, 0, 0, 0]
  })

  const { 
    gradeSystemData, 
    addStudent, 
    updateStudent, 
    deleteStudent,
    studentInfo 
  } = useGlobalStore()

  const subjects = gradeSystemData.subjects

  const calculateGrade = (marks) => {
    const total = marks.reduce((sum, mark) => sum + mark, 0)
    const average = total / marks.length
    
    if (average >= 90) return { grade: 'A', description: 'Excellent' }
    if (average >= 80) return { grade: 'B', description: 'Good' }
    if (average >= 70) return { grade: 'C', description: 'Average' }
    if (average >= 60) return { grade: 'D', description: 'Below Average' }
    return { grade: 'F', description: 'Fail' }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    const total = formData.marks.reduce((sum, mark) => sum + mark, 0)
    const average = total / formData.marks.length
    const gradeInfo = calculateGrade(formData.marks)

    const studentData = {
      name: formData.name,
      marks: formData.marks,
      subjects: subjects,
      total,
      average: Math.round(average * 100) / 100,
      grade: gradeInfo.grade,
      description: gradeInfo.description
    }

    if (editingStudent) {
      updateStudent(editingStudent.id, studentData)
      setEditingStudent(null)
    } else {
      addStudent(studentData)
    }

    setFormData({ name: '', marks: [0, 0, 0, 0, 0] })
    setShowAddForm(false)
  }

  const handleEdit = (student) => {
    setEditingStudent(student)
    setFormData({
      name: student.name,
      marks: student.marks
    })
    setShowAddForm(true)
  }

  const getGradeStats = () => {
    const stats = { A: 0, B: 0, C: 0, D: 0, F: 0 }
    gradeSystemData.students.forEach(student => {
      stats[student.grade]++
    })
    return stats
  }

  const gradeStats = getGradeStats()
  const totalStudents = gradeSystemData.students.length
  const averageScore = totalStudents > 0 
    ? gradeSystemData.students.reduce((sum, student) => sum + student.average, 0) / totalStudents 
    : 0

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <GraduationCap className="w-8 h-8 text-neon-green" />
            <h1 className="text-4xl font-futuristic gradient-text">Grade System</h1>
          </div>
          <p className="text-gray-300 font-tech">Interactive student grade management with 3D analytics</p>
        </motion.div>

        {/* Student Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 mb-8 max-w-md mx-auto text-center"
        >
          <p className="text-sm text-neon-green">Evaluated by: {studentInfo.name}</p>
          <p className="text-xs text-gray-400">{studentInfo.rollNumber} • {studentInfo.college}</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="glass-card p-6 text-center">
            <Users className="w-8 h-8 text-neon-blue mx-auto mb-3" />
            <h3 className="text-2xl font-futuristic text-neon-blue">{totalStudents}</h3>
            <p className="text-sm text-gray-400">Total Students</p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <TrendingUp className="w-8 h-8 text-neon-green mx-auto mb-3" />
            <h3 className="text-2xl font-futuristic text-neon-green">{averageScore.toFixed(1)}%</h3>
            <p className="text-sm text-gray-400">Class Average</p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <Award className="w-8 h-8 text-neon-purple mx-auto mb-3" />
            <h3 className="text-2xl font-futuristic text-neon-purple">{gradeStats.A}</h3>
            <p className="text-sm text-gray-400">A Grades</p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <BarChart3 className="w-8 h-8 text-neon-pink mx-auto mb-3" />
            <h3 className="text-2xl font-futuristic text-neon-pink">
              {totalStudents > 0 ? ((gradeStats.A + gradeStats.B) / totalStudents * 100).toFixed(0) : 0}%
            </h3>
            <p className="text-sm text-gray-400">Pass Rate</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-tech text-neon-green mb-4 text-center">3D Grade Visualization</h2>
            <div className="h-96 rounded-lg overflow-hidden bg-gradient-to-br from-dark-bg to-gray-900">
              <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#39ff14" />
                <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00f5ff" />
                <GradeVisualization students={gradeSystemData.students} />
              </Canvas>
            </div>
            <div className="mt-4 flex justify-center space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-neon-green rounded-full"></div>
                <span>A Grade</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
                <span>B Grade</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>C Grade</span>
              </div>
            </div>
          </motion.div>

          {/* Grade Management */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-tech text-neon-blue">Student Management</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="neon-button flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Student</span>
              </button>
            </div>

            {/* Grade Distribution */}
            <div className="mb-6">
              <h3 className="text-lg font-tech text-white mb-3">Grade Distribution</h3>
              <div className="space-y-2">
                {Object.entries(gradeStats).map(([grade, count]) => {
                  const percentage = totalStudents > 0 ? (count / totalStudents) * 100 : 0
                  const colors = {
                    A: 'bg-neon-green',
                    B: 'bg-neon-blue', 
                    C: 'bg-yellow-400',
                    D: 'bg-orange-400',
                    F: 'bg-red-400'
                  }
                  
                  return (
                    <div key={grade} className="flex items-center space-x-3">
                      <span className="w-8 text-sm font-tech">{grade}:</span>
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${colors[grade]} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-12">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Students List */}
            <div className="max-h-64 overflow-y-auto space-y-3">
              {gradeSystemData.students.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No students added yet</p>
              ) : (
                gradeSystemData.students.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 hover:bg-glass-bg/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-tech text-white">{student.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>Average: {student.average}%</span>
                          <span className={`px-2 py-1 rounded text-xs font-tech ${
                            student.grade === 'A' ? 'bg-neon-green/20 text-neon-green' :
                            student.grade === 'B' ? 'bg-neon-blue/20 text-neon-blue' :
                            student.grade === 'C' ? 'bg-yellow-400/20 text-yellow-400' :
                            student.grade === 'D' ? 'bg-orange-400/20 text-orange-400' :
                            'bg-red-400/20 text-red-400'
                          }`}>
                            Grade {student.grade}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(student)}
                          className="p-2 rounded-lg glass-card hover:bg-glass-bg/50 transition-colors"
                        >
                          <Edit className="w-4 h-4 text-neon-blue" />
                        </button>
                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="p-2 rounded-lg glass-card hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Add/Edit Student Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingStudent(null)
                  setFormData({ name: '', marks: [0, 0, 0, 0, 0] })
                }}
              />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative glass-card p-6 w-full max-w-2xl"
              >
                <h3 className="text-2xl font-futuristic gradient-text mb-6">
                  {editingStudent ? 'Edit Student' : 'Add New Student'}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-tech text-neon-blue mb-2">
                      Student Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="cyber-input w-full"
                      placeholder="Enter student name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-tech text-neon-green mb-4">
                      Subject Marks (0-100)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {subjects.map((subject, index) => (
                        <div key={index}>
                          <label className="block text-xs text-gray-400 mb-1">{subject}</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.marks[index]}
                            onChange={(e) => {
                              const newMarks = [...formData.marks]
                              newMarks[index] = parseInt(e.target.value) || 0
                              setFormData({...formData, marks: newMarks})
                            }}
                            className="cyber-input w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preview */}
                  {formData.name && (
                    <div className="glass-card p-4 bg-glass-bg/30">
                      <h4 className="font-tech text-neon-purple mb-2">Preview</h4>
                      <div className="text-sm space-y-1">
                        <p>Total: {formData.marks.reduce((sum, mark) => sum + mark, 0)}/500</p>
                        <p>Average: {(formData.marks.reduce((sum, mark) => sum + mark, 0) / formData.marks.length).toFixed(2)}%</p>
                        <p>Grade: {calculateGrade(formData.marks).grade} - {calculateGrade(formData.marks).description}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false)
                        setEditingStudent(null)
                        setFormData({ name: '', marks: [0, 0, 0, 0, 0] })
                      }}
                      className="px-6 py-2 rounded-lg glass-card hover:bg-glass-bg/50 transition-colors font-tech"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="neon-button"
                    >
                      {editingStudent ? 'Update Student' : 'Add Student'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default GradeSystemPage