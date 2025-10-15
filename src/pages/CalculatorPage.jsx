import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Box } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Delete, 
  RotateCcw, 
  History, 
  Save,
  Calculator as CalcIcon,
  Zap
} from 'lucide-react'
import useGlobalStore from '../store/globalConfig'

// 3D Calculator Display Component
function Calculator3D({ display, isCalculating }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      {/* Calculator Body */}
      <Box args={[4, 6, 0.5]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#1a1a2e" 
          transparent 
          opacity={0.8}
          roughness={0.3}
          metalness={0.7}
        />
      </Box>
      
      {/* Display Screen */}
      <Box args={[3.5, 1.5, 0.1]} position={[0, 2, 0.3]}>
        <meshStandardMaterial 
          color="#000" 
          transparent 
          opacity={0.9}
        />
      </Box>
      
      {/* Display Text */}
      <Text
        position={[0, 2, 0.4]}
        fontSize={0.3}
        color="#00f5ff"
        anchorX="center"
        anchorY="middle"
      >
        {display || '0'}
      </Text>
      
      {/* Calculation Indicator */}
      {isCalculating && (
        <Text
          position={[0, 1.3, 0.4]}
          fontSize={0.15}
          color="#39ff14"
          anchorX="center"
          anchorY="middle"
        >
          CALCULATING...
        </Text>
      )}
      
      {/* Glow Effect */}
      <pointLight 
        position={[0, 2, 1]} 
        color="#00f5ff" 
        intensity={0.5}
        distance={10}
      />
    </group>
  )
}

const CalculatorPage = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const { 
    calculatorData, 
    addCalculatorHistory, 
    updateCalculatorMemory,
    clearCalculatorHistory,
    studentInfo 
  } = useGlobalStore()

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    setIsCalculating(true)
    
    setTimeout(() => setIsCalculating(false), 500) // Animation delay

    let result
    switch (operation) {
      case '+':
        result = firstValue + secondValue
        break
      case '-':
        result = firstValue - secondValue
        break
      case '*':
        result = firstValue * secondValue
        break
      case '/':
        result = secondValue !== 0 ? firstValue / secondValue : 0
        break
      default:
        return secondValue
    }

    // Add to history
    const calculation = {
      expression: `${firstValue} ${operation} ${secondValue}`,
      result: result,
      timestamp: new Date().toISOString()
    }
    addCalculatorHistory(calculation)

    return result
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const buttons = [
    { label: 'C', onClick: clear, className: 'bg-red-500/20 text-red-400 hover:bg-red-500/30' },
    { label: '±', onClick: () => setDisplay(String(parseFloat(display) * -1)), className: 'bg-gray-500/20 text-gray-300' },
    { label: '%', onClick: () => setDisplay(String(parseFloat(display) / 100)), className: 'bg-gray-500/20 text-gray-300' },
    { label: '÷', onClick: () => performOperation('/'), className: 'bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30' },
    
    { label: '7', onClick: () => inputDigit(7), className: 'bg-glass-bg hover:bg-glass-bg/70' },
    { label: '8', onClick: () => inputDigit(8), className: 'bg-glass-bg hover:bg-glass-bg/70' },
    { label: '9', onClick: () => inputDigit(9), className: 'bg-glass-bg hover:bg-glass-bg/70' },
    { label: '×', onClick: () => performOperation('*'), className: 'bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30' },
    
    { label: '4', onClick: () => inputDigit(4), className: 'bg-glass-bg hover:bg-glass-bg/70' },
    { label: '5', onClick: () => inputDigit(5), className: 'bg-glass-bg hover:bg-glass-bg/70' },
    { label: '6', onClick: () => inputDigit(6), className: 'bg-glass-bg hover:bg-glass-bg/70' },
    { label: '−', onClick: () => performOperation('-'), className: 'bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30' },
    
    { label: '1', onClick: () => inputDigit(1), className: 'bg-glass-bg hover:bg-glass-bg/70' },
    { label: '2', onClick: () => inputDigit(2), className: 'bg-glass-bg hover:bg-glass-bg/70' },
    { label: '3', onClick: () => inputDigit(3), className: 'bg-glass-bg hover:bg-glass-bg/70' },
    { label: '+', onClick: () => performOperation('+'), className: 'bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30' },
    
    { label: '0', onClick: () => inputDigit(0), className: 'bg-glass-bg hover:bg-glass-bg/70 col-span-2' },
    { label: '.', onClick: inputDecimal, className: 'bg-glass-bg hover:bg-glass-bg/70' },
    { label: '=', onClick: handleEquals, className: 'bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30' }
  ]

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
            <CalcIcon className="w-8 h-8 text-neon-purple" />
            <h1 className="text-4xl font-futuristic gradient-text">3D Calculator</h1>
          </div>
          <p className="text-gray-300 font-tech">Advanced arithmetic with futuristic 3D interface</p>
        </motion.div>

        {/* Student Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 mb-8 max-w-md mx-auto text-center"
        >
          <p className="text-sm text-neon-blue">Developed by: {studentInfo.name}</p>
          <p className="text-xs text-gray-400">{studentInfo.rollNumber} • {studentInfo.college}</p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* 3D Calculator Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-4 sm:p-6"
          >
            <h2 className="text-lg sm:text-xl font-tech text-neon-purple mb-4 text-center">3D Visualization</h2>
            <div className="h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden bg-gradient-to-br from-dark-bg to-gray-900">
              <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#00f5ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.3} color="#bf00ff" />
                <Calculator3D display={display} isCalculating={isCalculating} />
              </Canvas>
            </div>
          </motion.div>

          {/* Calculator Interface */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-tech text-neon-blue">Calculator Interface</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="p-2 rounded-lg glass-card hover:bg-glass-bg/50 transition-colors"
                  title="History"
                >
                  <History className="w-4 h-4 text-neon-green" />
                </button>
                <button
                  onClick={() => updateCalculatorMemory(parseFloat(display))}
                  className="p-2 rounded-lg glass-card hover:bg-glass-bg/50 transition-colors"
                  title="Save to Memory"
                >
                  <Save className="w-4 h-4 text-neon-blue" />
                </button>
              </div>
            </div>

            {/* Display */}
            <div className="bg-black/50 rounded-lg p-4 mb-4 border border-neon-blue/30">
              <div className="text-right">
                <div className="text-3xl font-futuristic text-neon-blue mb-2 min-h-[40px] flex items-center justify-end">
                  {display}
                </div>
                {operation && previousValue !== null && (
                  <div className="text-sm text-gray-400">
                    {previousValue} {operation}
                  </div>
                )}
                {calculatorData.memory !== 0 && (
                  <div className="text-xs text-neon-green">
                    Memory: {calculatorData.memory}
                  </div>
                )}
              </div>
            </div>

            {/* Button Grid */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {buttons.map((button, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.02 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={button.onClick}
                  className={`
                    p-2 sm:p-3 md:p-4 rounded-lg font-tech text-sm sm:text-base md:text-lg transition-all duration-200
                    border border-glass-border hover:border-neon-blue/50
                    ${button.className || 'bg-glass-bg hover:bg-glass-bg/70'}
                    ${button.label === '0' ? 'col-span-2' : ''}
                  `}
                >
                  {button.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* History Panel */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-tech text-neon-green">Calculation History</h3>
                <button
                  onClick={clearCalculatorHistory}
                  className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <Delete className="w-4 h-4" />
                  <span className="text-sm">Clear</span>
                </button>
              </div>
              
              <div className="max-h-64 overflow-y-auto space-y-2">
                {calculatorData.history.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No calculations yet</p>
                ) : (
                  calculatorData.history.slice().reverse().map((calc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 glass-card hover:bg-glass-bg/30 transition-colors"
                    >
                      <span className="font-tech text-gray-300">{calc.expression}</span>
                      <span className="text-neon-blue font-futuristic">= {calc.result}</span>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: Zap, title: '3D Visualization', desc: 'Interactive 3D calculator model' },
            { icon: History, title: 'History Tracking', desc: 'Keep track of all calculations' },
            { icon: Save, title: 'Memory Functions', desc: 'Store and recall values' }
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="glass-card p-6 text-center">
                <Icon className="w-8 h-8 text-neon-purple mx-auto mb-3" />
                <h4 className="font-tech text-lg text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default CalculatorPage
