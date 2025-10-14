import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Box, Cylinder } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  Plus, 
  ArrowUpCircle, 
  ArrowDownCircle,
  Eye,
  Trash2,
  DollarSign,
  CreditCard,
  TrendingUp,
  Shield
} from 'lucide-react'
import useGlobalStore from '../store/globalConfig'

// 3D Bank Visualization Component
function BankVisualization({ accounts, totalBalance }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central Bank Building */}
      <Box args={[2, 4, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#1a1a2e" 
          transparent 
          opacity={0.8}
          roughness={0.3}
          metalness={0.7}
        />
      </Box>
      
      {/* Bank Sign */}
      <Text
        position={[0, 2.5, 1.1]}
        fontSize={0.3}
        color="#00f5ff"
        anchorX="center"
        anchorY="middle"
      >
        FUTURISTIC BANK
      </Text>
      
      {/* Account Towers */}
      {accounts.map((account, index) => {
        const angle = (index / Math.max(accounts.length, 1)) * Math.PI * 2
        const radius = 4
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const height = Math.max(account.balance / 1000, 0.5)
        
        return (
          <group key={account.id} position={[x, height/2 - 1, z]}>
            <Cylinder args={[0.3, 0.3, height]} position={[0, 0, 0]}>
              <meshStandardMaterial 
                color={account.balance > 1000 ? '#39ff14' : account.balance > 500 ? '#00f5ff' : '#ff8c00'}
                emissive={account.balance > 1000 ? '#39ff14' : account.balance > 500 ? '#00f5ff' : '#ff8c00'}
                emissiveIntensity={0.2}
              />
            </Cylinder>
            <Text
              position={[0, height/2 + 0.3, 0]}
              fontSize={0.15}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {account.id}
            </Text>
          </group>
        )
      })}
      
      {/* Base Platform */}
      <Cylinder args={[6, 6, 0.2]} position={[0, -2, 0]}>
        <meshStandardMaterial 
          color="#2a2a3e" 
          transparent 
          opacity={0.5}
        />
      </Cylinder>
      
      {/* Total Balance Display */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.2}
        color="#39ff14"
        anchorX="center"
        anchorY="middle"
      >
        Total: ${totalBalance.toFixed(2)}
      </Text>
      
      <pointLight position={[0, 5, 0]} color="#00f5ff" intensity={0.5} />
      <pointLight position={[5, 2, 5]} color="#39ff14" intensity={0.3} />
    </group>
  )
}

const BankSystemPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [transactionType, setTransactionType] = useState('deposit')
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    initialDeposit: 100,
    amount: 0
  })

  const { 
    bankSystemData, 
    createAccount, 
    updateAccountBalance, 
    deleteAccount,
    studentInfo 
  } = useGlobalStore()

  const handleCreateAccount = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.age || !formData.phone.trim()) return

    createAccount({
      name: formData.name,
      age: parseInt(formData.age),
      phone: formData.phone,
      balance: parseFloat(formData.initialDeposit)
    })

    setFormData({ name: '', age: '', phone: '', initialDeposit: 100, amount: 0 })
    setShowCreateForm(false)
  }

  const handleTransaction = (e) => {
    e.preventDefault()
    if (!selectedAccount || !formData.amount) return

    const amount = parseFloat(formData.amount)
    const transactionAmount = transactionType === 'deposit' ? amount : -amount

    // Check for sufficient funds on withdrawal
    if (transactionType === 'withdraw' && selectedAccount.balance < amount) {
      alert('Insufficient funds!')
      return
    }

    updateAccountBalance(
      selectedAccount.id, 
      transactionAmount, 
      transactionType === 'deposit' ? 'Deposit' : 'Withdrawal',
      `${transactionType === 'deposit' ? 'Deposit' : 'Withdrawal'} via web interface`
    )

    setFormData({ ...formData, amount: 0 })
    setShowTransactionForm(false)
    setSelectedAccount(null)
  }

  const openTransactionForm = (account, type) => {
    setSelectedAccount(account)
    setTransactionType(type)
    setShowTransactionForm(true)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getAccountStats = () => {
    const accounts = bankSystemData.accounts
    if (accounts.length === 0) return { highest: 0, lowest: 0, average: 0 }
    
    const balances = accounts.map(acc => acc.balance)
    return {
      highest: Math.max(...balances),
      lowest: Math.min(...balances),
      average: balances.reduce((sum, bal) => sum + bal, 0) / balances.length
    }
  }

  const stats = getAccountStats()

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
            <Building2 className="w-8 h-8 text-neon-pink" />
            <h1 className="text-4xl font-futuristic gradient-text">Bank System</h1>
          </div>
          <p className="text-gray-300 font-tech">Futuristic banking dashboard with 3D transaction management</p>
        </motion.div>

        {/* Student Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 mb-8 max-w-md mx-auto text-center"
        >
          <p className="text-sm text-neon-pink">Bank Manager: {studentInfo.name}</p>
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
            <CreditCard className="w-8 h-8 text-neon-blue mx-auto mb-3" />
            <h3 className="text-2xl font-futuristic text-neon-blue">{bankSystemData.accounts.length}</h3>
            <p className="text-sm text-gray-400">Total Accounts</p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <DollarSign className="w-8 h-8 text-neon-green mx-auto mb-3" />
            <h3 className="text-xl font-futuristic text-neon-green">{formatCurrency(bankSystemData.totalBalance)}</h3>
            <p className="text-sm text-gray-400">Total Balance</p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <TrendingUp className="w-8 h-8 text-neon-purple mx-auto mb-3" />
            <h3 className="text-xl font-futuristic text-neon-purple">{formatCurrency(stats.highest)}</h3>
            <p className="text-sm text-gray-400">Highest Balance</p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <Shield className="w-8 h-8 text-neon-pink mx-auto mb-3" />
            <h3 className="text-xl font-futuristic text-neon-pink">{formatCurrency(stats.average)}</h3>
            <p className="text-sm text-gray-400">Average Balance</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Bank Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-tech text-neon-pink mb-4 text-center">3D Bank Visualization</h2>
            <div className="h-96 rounded-lg overflow-hidden bg-gradient-to-br from-dark-bg to-gray-900">
              <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff10f0" />
                <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00f5ff" />
                <BankVisualization 
                  accounts={bankSystemData.accounts} 
                  totalBalance={bankSystemData.totalBalance}
                />
              </Canvas>
            </div>
            <div className="mt-4 flex justify-center space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-neon-green rounded-full"></div>
                <span>High Balance (&gt;$1000)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
                <span>Medium Balance ($500-$1000)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                <span>Low Balance (&lt;$500)</span>
              </div>
            </div>
          </motion.div>

          {/* Account Management */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-tech text-neon-blue">Account Management</h2>
              <button
                onClick={() => setShowCreateForm(true)}
                className="neon-button flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Account</span>
              </button>
            </div>

            {/* Accounts List */}
            <div className="max-h-96 overflow-y-auto space-y-4">
              {bankSystemData.accounts.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No accounts created yet</p>
              ) : (
                bankSystemData.accounts.map((account, index) => (
                  <motion.div
                    key={account.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 hover:bg-glass-bg/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-tech text-white text-lg">{account.name}</h4>
                        <p className="text-sm text-gray-400">Account: {account.id}</p>
                        <p className="text-xs text-gray-500">Age: {account.age} • Phone: {account.phone}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-futuristic text-neon-green">
                          {formatCurrency(account.balance)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {account.transactions?.length || 0} transactions
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openTransactionForm(account, 'deposit')}
                        className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-neon-green/20 text-neon-green hover:bg-neon-green/30 transition-colors"
                      >
                        <ArrowUpCircle className="w-4 h-4" />
                        <span className="text-sm">Deposit</span>
                      </button>
                      
                      <button
                        onClick={() => openTransactionForm(account, 'withdraw')}
                        className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition-colors"
                      >
                        <ArrowDownCircle className="w-4 h-4" />
                        <span className="text-sm">Withdraw</span>
                      </button>
                      
                      <button
                        onClick={() => alert(`Account Details:\n${JSON.stringify(account, null, 2)}`)}
                        className="p-2 rounded-lg glass-card hover:bg-glass-bg/50 transition-colors"
                      >
                        <Eye className="w-4 h-4 text-neon-blue" />
                      </button>
                      
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete account ${account.id}?`)) {
                            deleteAccount(account.id)
                          }
                        }}
                        className="p-2 rounded-lg glass-card hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Create Account Form */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setShowCreateForm(false)}
              />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative glass-card p-6 w-full max-w-md"
              >
                <h3 className="text-2xl font-futuristic gradient-text mb-6">Create New Account</h3>
                
                <form onSubmit={handleCreateAccount} className="space-y-4">
                  <div>
                    <label className="block text-sm font-tech text-neon-blue mb-2">Account Holder Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="cyber-input w-full"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-tech text-neon-green mb-2">Age</label>
                      <input
                        type="number"
                        min="18"
                        max="100"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="cyber-input w-full"
                        placeholder="Age"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-tech text-neon-purple mb-2">Initial Deposit</label>
                      <input
                        type="number"
                        min="100"
                        step="0.01"
                        value={formData.initialDeposit}
                        onChange={(e) => setFormData({...formData, initialDeposit: e.target.value})}
                        className="cyber-input w-full"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-tech text-neon-pink mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="cyber-input w-full"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-6 py-2 rounded-lg glass-card hover:bg-glass-bg/50 transition-colors font-tech"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="neon-button">
                      Create Account
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transaction Form */}
        <AnimatePresence>
          {showTransactionForm && selectedAccount && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setShowTransactionForm(false)}
              />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative glass-card p-6 w-full max-w-md"
              >
                <h3 className="text-2xl font-futuristic gradient-text mb-6">
                  {transactionType === 'deposit' ? 'Deposit Money' : 'Withdraw Money'}
                </h3>
                
                <div className="mb-4 p-4 glass-card bg-glass-bg/30">
                  <p className="text-sm text-gray-400">Account: {selectedAccount.id}</p>
                  <p className="text-lg font-tech text-white">{selectedAccount.name}</p>
                  <p className="text-xl font-futuristic text-neon-green">
                    Current Balance: {formatCurrency(selectedAccount.balance)}
                  </p>
                </div>
                
                <form onSubmit={handleTransaction} className="space-y-4">
                  <div>
                    <label className="block text-sm font-tech text-neon-blue mb-2">
                      Amount to {transactionType}
                    </label>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      className="cyber-input w-full"
                      placeholder="Enter amount"
                      required
                    />
                  </div>

                  {transactionType === 'withdraw' && formData.amount > selectedAccount.balance && (
                    <p className="text-red-400 text-sm">Insufficient funds!</p>
                  )}

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowTransactionForm(false)}
                      className="px-6 py-2 rounded-lg glass-card hover:bg-glass-bg/50 transition-colors font-tech"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className={`neon-button ${
                        transactionType === 'withdraw' && formData.amount > selectedAccount.balance 
                          ? 'opacity-50 cursor-not-allowed' 
                          : ''
                      }`}
                      disabled={transactionType === 'withdraw' && formData.amount > selectedAccount.balance}
                    >
                      {transactionType === 'deposit' ? 'Deposit' : 'Withdraw'}
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

export default BankSystemPage