import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Global configuration store for student and application data
const useGlobalStore = create(
  persist(
    (set, get) => ({
      // Student Information (Secure Global Config)
      studentInfo: {
        name: 'Aditya Chandorkar',
        rollNumber: 'FAI24008',
        college: 'Elphinstone College',
        subject: 'Github Management',
        email: 'aditya.chandorkar@elphinstone.edu',
        avatar: null,
        theme: 'cyber-blue'
      },

      // Application Settings
      appSettings: {
        theme: 'dark',
        animations: true,
        soundEffects: false,
        language: 'en',
        notifications: true,
        autoSave: true
      },

      // Calculator Data
      calculatorData: {
        history: [],
        lastResult: null,
        currentExpression: '',
        memory: 0
      },

      // Grade System Data
      gradeSystemData: {
        students: [],
        subjects: [
          'Mathematics',
          'Physics', 
          'Chemistry',
          'English',
          'Computer Science'
        ],
        gradingScale: {
          A: { min: 90, max: 100, description: 'Excellent' },
          B: { min: 80, max: 89, description: 'Good' },
          C: { min: 70, max: 79, description: 'Average' },
          D: { min: 60, max: 69, description: 'Below Average' },
          F: { min: 0, max: 59, description: 'Fail' }
        }
      },

      // Bank System Data
      bankSystemData: {
        accounts: [],
        transactions: [],
        totalBalance: 0,
        accountCounter: 1
      },

      // Actions for Student Info
      updateStudentInfo: (newInfo) => set((state) => ({
        studentInfo: { ...state.studentInfo, ...newInfo }
      })),

      // Actions for App Settings
      updateAppSettings: (newSettings) => set((state) => ({
        appSettings: { ...state.appSettings, ...newSettings }
      })),

      // Calculator Actions
      addCalculatorHistory: (calculation) => set((state) => ({
        calculatorData: {
          ...state.calculatorData,
          history: [...state.calculatorData.history, calculation].slice(-50) // Keep last 50
        }
      })),

      updateCalculatorMemory: (value) => set((state) => ({
        calculatorData: { ...state.calculatorData, memory: value }
      })),

      clearCalculatorHistory: () => set((state) => ({
        calculatorData: { ...state.calculatorData, history: [] }
      })),

      // Grade System Actions
      addStudent: (student) => set((state) => ({
        gradeSystemData: {
          ...state.gradeSystemData,
          students: [...state.gradeSystemData.students, {
            ...student,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            evaluatedBy: state.studentInfo.name
          }]
        }
      })),

      updateStudent: (id, updatedData) => set((state) => ({
        gradeSystemData: {
          ...state.gradeSystemData,
          students: state.gradeSystemData.students.map(student =>
            student.id === id ? { ...student, ...updatedData } : student
          )
        }
      })),

      deleteStudent: (id) => set((state) => ({
        gradeSystemData: {
          ...state.gradeSystemData,
          students: state.gradeSystemData.students.filter(student => student.id !== id)
        }
      })),

      // Bank System Actions
      createAccount: (accountData) => set((state) => {
        const newAccount = {
          ...accountData,
          id: `ACC${String(state.bankSystemData.accountCounter).padStart(3, '0')}`,
          createdAt: new Date().toISOString(),
          createdBy: state.studentInfo.name,
          transactions: [{
            type: 'Initial Deposit',
            amount: accountData.balance,
            balance: accountData.balance,
            date: new Date().toISOString(),
            description: 'Account opening deposit'
          }]
        }

        return {
          bankSystemData: {
            ...state.bankSystemData,
            accounts: [...state.bankSystemData.accounts, newAccount],
            accountCounter: state.bankSystemData.accountCounter + 1,
            totalBalance: state.bankSystemData.totalBalance + accountData.balance
          }
        }
      }),

      updateAccountBalance: (accountId, amount, transactionType, description = '') => set((state) => {
        const updatedAccounts = state.bankSystemData.accounts.map(account => {
          if (account.id === accountId) {
            const newBalance = account.balance + amount
            const transaction = {
              type: transactionType,
              amount: Math.abs(amount),
              balance: newBalance,
              date: new Date().toISOString(),
              description: description || transactionType
            }
            
            return {
              ...account,
              balance: newBalance,
              transactions: [...account.transactions, transaction]
            }
          }
          return account
        })

        const newTotalBalance = updatedAccounts.reduce((sum, acc) => sum + acc.balance, 0)

        return {
          bankSystemData: {
            ...state.bankSystemData,
            accounts: updatedAccounts,
            totalBalance: newTotalBalance
          }
        }
      }),

      deleteAccount: (accountId) => set((state) => {
        const accountToDelete = state.bankSystemData.accounts.find(acc => acc.id === accountId)
        const updatedAccounts = state.bankSystemData.accounts.filter(acc => acc.id !== accountId)
        const newTotalBalance = state.bankSystemData.totalBalance - (accountToDelete?.balance || 0)

        return {
          bankSystemData: {
            ...state.bankSystemData,
            accounts: updatedAccounts,
            totalBalance: newTotalBalance
          }
        }
      }),

      // Utility Actions
      resetAllData: () => set((state) => ({
        calculatorData: {
          history: [],
          lastResult: null,
          currentExpression: '',
          memory: 0
        },
        gradeSystemData: {
          ...state.gradeSystemData,
          students: []
        },
        bankSystemData: {
          accounts: [],
          transactions: [],
          totalBalance: 0,
          accountCounter: 1
        }
      })),

      exportData: () => {
        const state = get()
        return {
          studentInfo: state.studentInfo,
          calculatorData: state.calculatorData,
          gradeSystemData: state.gradeSystemData,
          bankSystemData: state.bankSystemData,
          exportedAt: new Date().toISOString()
        }
      },

      importData: (data) => set((state) => ({
        ...state,
        calculatorData: data.calculatorData || state.calculatorData,
        gradeSystemData: data.gradeSystemData || state.gradeSystemData,
        bankSystemData: data.bankSystemData || state.bankSystemData
      }))
    }),
    {
      name: 'futuristic-mini-projects-storage',
      version: 1,
      // Only persist data, not functions
      partialize: (state) => ({
        studentInfo: state.studentInfo,
        appSettings: state.appSettings,
        calculatorData: state.calculatorData,
        gradeSystemData: state.gradeSystemData,
        bankSystemData: state.bankSystemData
      })
    }
  )
)

export default useGlobalStore

// Helper functions for data validation and formatting
export const validateStudentInfo = (info) => {
  const required = ['name', 'rollNumber', 'college']
  return required.every(field => info[field] && info[field].trim().length > 0)
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export const calculateGrade = (marks) => {
  const total = marks.reduce((sum, mark) => sum + mark, 0)
  const average = total / marks.length
  
  if (average >= 90) return { grade: 'A', description: 'Excellent' }
  if (average >= 80) return { grade: 'B', description: 'Good' }
  if (average >= 70) return { grade: 'C', description: 'Average' }
  if (average >= 60) return { grade: 'D', description: 'Below Average' }
  return { grade: 'F', description: 'Fail' }
}

export const generateAccountNumber = (counter) => {
  return `ACC${String(counter).padStart(3, '0')}`
}