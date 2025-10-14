# Python Mini Projects Assignment Report

**Student Name:** Aditya Chandorkar  
**Roll Number:** FAI24008  
**College:** Elphinstone College  
**Subject:** Github Management  

---

## 📋 Assignment Overview

This project repo contains four simple Python console applications — a Calculator, Student Grade System, Bank Transaction Manager, and To-Do List Tool. All projects share a config file with the student’s name, roll number, and college, shown in every program. The goal is to demonstrate basic programming, file handling, and GitHub version control for a college assignment.


## 📁 Project Structure

```
college-mini-projects/
├── calculator/
│   └── calculator.py              # Basic arithmetic calculator
├── student_grade_system/
│   └── grade_system.py           # Student grade calculation system
├── bank_transaction_system/
│   ├── bank_system.py            # Bank account management system
│   └── accounts.json             # Account data storage (auto-generated)
├── todo_tool/
│   ├── todo.py                   # Task management system
│   └── tasks.txt                 # Task data storage (auto-generated)
├── student_config.py             # Student information configuration
├── requirements.txt              # Python dependencies
├── .gitignore                    # Git ignore rules
└── README.md                     # Assignment documentation
```

## 🚀 How to Run the Projects

### Prerequisites
- Python 3.6 or higher
- No external dependencies required (uses only Python standard library)

### Execution Instructions

```bash
# Calculator Tool
python calculator/calculator.py

# Student Grade System
python student_grade_system/grade_system.py

# Bank Transaction System
python bank_transaction_system/bank_system.py

# To-Do List Tool
python todo_tool/todo.py
```

## 📋 Project Details

### 1. Calculator Tool 🧮
**File:** `calculator/calculator.py`

A simple arithmetic calculator supporting basic mathematical operations.

**Features Implemented:**
- Addition, Subtraction, Multiplication, Division
- Input validation and error handling
- Division by zero protection
- Continuous calculation mode
- Professional user interface

**Sample Output:**
```
============================================================
    COLLEGE MINI PROJECT
============================================================
Student Name: Aditya Chandorkar
Roll Number:  FAI24008
College:      Elphinstone College
============================================================
PROJECT: CALCULATOR TOOL
============================================================

Welcome to the Calculator Tool!
This calculator performs basic arithmetic operations.

Calculator Operations:
1. Addition (+)
2. Subtraction (-)
3. Multiplication (*)
4. Division (/)
5. Exit
------------------------------
Enter your choice (1-5): 1
Enter first number: 15
Enter second number: 25

Result: 15.0 + 25.0 = 40.0
```

### 2. Student Grade System 📊
**File:** `student_grade_system/grade_system.py`

A comprehensive grade calculation system for student performance evaluation.

**Features Implemented:**
- Input marks for 5 subjects (Mathematics, Physics, Chemistry, English, Computer Science)
- Automatic total and average calculation
- Letter grade assignment (A/B/C/D/F)
- Performance feedback system
- Grading scale display
- Input validation (0-100 marks)

**Grading Scale:**
- A: 90-100 (Excellent)
- B: 80-89 (Good)
- C: 70-79 (Average)
- D: 60-69 (Below Average)
- F: 0-59 (Fail)

**Sample Output:**
```
============================================================
    COLLEGE MINI PROJECT
============================================================
Student Name: Aditya Chandorkar
Roll Number:  FAI24008
College:      Elphinstone College
============================================================
PROJECT: STUDENT GRADE SYSTEM
============================================================

========================================
STUDENT GRADE CALCULATION
========================================
Enter student name: Alice Smith

Enter marks for the following subjects (0-100):
---------------------------------------------
Mathematics: 95
Physics: 88
Chemistry: 92
English: 85
Computer Science: 90

============================================================
GRADE REPORT
============================================================
Student Name: Alice Smith
Evaluated by: Aditya Chandorkar
Roll Number: FAI24008
College: Elphinstone College
------------------------------------------------------------
Subject-wise Marks:
------------------------------
Mathematics         :   95.0
Physics             :   88.0
Chemistry           :   92.0
English             :   85.0
Computer Science    :   90.0
------------------------------
Total Marks         :  450.0/500
Average             :  90.00%
Grade               : A
Performance         : Excellent
============================================================

🏆 Outstanding performance! Keep it up!
```

### 3. Bank Transaction Management System 🏦
**File:** `bank_transaction_system/bank_system.py`

A complete banking system with account management and transaction features.

**Features Implemented:**
- Create new bank accounts with unique account numbers
- Deposit and withdraw money with validation
- Balance inquiry and account details
- Transaction history tracking
- Account summary for all accounts
- JSON-based data persistence
- Minimum balance requirements

**Sample Output:**
```
============================================================
    COLLEGE MINI PROJECT
============================================================
Student Name: Aditya Chandorkar
Roll Number:  FAI24008
College:      Elphinstone College
============================================================
PROJECT: BANK TRANSACTION MANAGEMENT SYSTEM
============================================================

Bank Management Options:
1. Create New Account
2. Deposit Money
3. Withdraw Money
4. Check Balance
5. View Account Details
6. View All Accounts
7. Exit
------------------------------
Enter your choice (1-7): 1

========================================
CREATE NEW ACCOUNT
========================================
Enter account holder name: Alice Johnson
Enter age: 25
Enter phone number: 9876543210

Initial deposit (minimum $100): 500

✅ Account created successfully!
----------------------------------------
Account Number: ACC001
Account Holder: Alice Johnson
Initial Balance: $500.00
Created by: Aditya Chandorkar
----------------------------------------
```

### 4. Simple To-Do List Tool ✅
**File:** `todo_tool/todo.py`

A task management system for organizing daily activities.

**Features Implemented:**
- Add new tasks with timestamps
- View all tasks with status indicators
- Mark tasks as complete
- Delete individual tasks
- Filter tasks by status (pending/completed)
- Clear all tasks option
- Text file-based data persistence
- Task statistics and reporting

**Sample Output:**
```
============================================================
    COLLEGE MINI PROJECT
============================================================
Student Name: Aditya Chandorkar
Roll Number:  FAI24008
College:      Elphinstone College
============================================================
PROJECT: SIMPLE TO-DO LIST TOOL
============================================================

To-Do List Options:
1. Add New Task
2. View All Tasks
3. Mark Task as Complete
4. Delete Task
5. View Completed Tasks
6. View Pending Tasks
7. Clear All Tasks
8. Exit
------------------------------
Enter your choice (1-8): 2

========================================
ALL TASKS
========================================

📋 TO-DO LIST (Managed by: Aditya Chandorkar)
================================================================================
ID   Status     Date Added           Description                             
--------------------------------------------------------------------------------
1    ⏳ PENDING   2024-01-15 10:30:25  Complete Python assignment             
2    ✅ COMPLETED 2024-01-15 09:15:10  Study for mathematics exam             
3    ⏳ PENDING   2024-01-15 11:45:30  Prepare presentation slides            
--------------------------------------------------------------------------------
Total Tasks: 3 | Pending: 2 | Completed: 1
================================================================================
```

## 🛠️ Technical Implementation

### Programming Concepts Demonstrated

1. **Input Validation**
   - Comprehensive input validation across all projects
   - Error handling for invalid data types
   - Range validation for numerical inputs
   - Empty input protection

2. **Data Persistence**
   - **Bank System:** JSON file storage for account data
   - **To-Do List:** Text file storage for task data
   - **Grade System:** Session-based calculations
   - **Calculator:** Real-time calculations

3. **User Experience Design**
   - Clear menu-driven interfaces
   - Consistent formatting and styling
   - Helpful error messages
   - Confirmation prompts for destructive operations

4. **Code Quality**
   - Comprehensive comments and documentation
   - Modular function design
   - Consistent naming conventions
   - Exception handling and error management

### File Handling Techniques

- **JSON Manipulation:** Used in bank system for structured data storage
- **Text File Operations:** Implemented in to-do list for simple data persistence
- **File Creation and Management:** Automatic file generation when needed
- **Data Integrity:** Proper error handling for file operations

### Algorithm Implementation

- **Mathematical Operations:** Basic arithmetic with error handling
- **Grade Calculation:** Weighted average and letter grade assignment
- **Account Management:** Unique ID generation and balance tracking
- **Task Management:** CRUD operations with status tracking

## 📚 Learning Outcomes Achieved

Through this assignment, I have successfully demonstrated:

1. **Python Fundamentals**
   - Variables, data types, and operators
   - Control structures (if/else, loops, functions)
   - Exception handling and error management

2. **File I/O Operations**
   - Reading and writing text files
   - JSON data serialization and deserialization
   - File existence checking and creation

3. **User Interface Design**
   - Menu-driven console applications
   - Input validation and user feedback
   - Professional output formatting

4. **Problem-Solving Skills**
   - Breaking complex problems into smaller functions
   - Implementing data validation logic
   - Creating user-friendly applications

5. **Software Development Practices**
   - Code organization and modularity
   - Documentation and commenting
   - Version control with Git

## 🔧 Technical Specifications

- **Programming Language:** Python 3.6+
- **Dependencies:** None (Standard Library Only)
- **File Formats:** JSON for structured data, TXT for simple data
- **Architecture:** Modular function-based design
- **Error Handling:** Comprehensive try-catch blocks
- **Data Validation:** Input sanitization and type checking

## 📊 Project Statistics

- **Total Lines of Code:** ~1,200 lines
- **Number of Functions:** 45+ functions across all projects
- **File Operations:** 2 projects with persistent storage
- **Input Validation Points:** 20+ validation checkpoints
- **Error Handling Cases:** 15+ exception handling scenarios

## 🎯 Assignment Completion Status

✅ **Calculator Tool** - Fully implemented with all required features  
✅ **Student Grade System** - Complete with grading scale and validation  
✅ **Bank Transaction System** - Full CRUD operations with data persistence  
✅ **To-Do List Tool** - Complete task management with file storage  
✅ **Documentation** - Comprehensive README and code comments  
✅ **Code Quality** - Professional coding standards followed  
✅ **Testing** - All projects tested and verified working  

---

## 👨‍💻 Assignment Submission Details

- **Submitted by:** Aditya Chandorkar
- **Roll Number:** FAI24008
- **College:** Elphinstone College
- **Programming Language:** Python 3
- **Total Projects:** 4 Console Applications
 
**Declaration:** This assignment has been completed independently and demonstrates my understanding of Python programming concepts, file handling, data validation, and software development practices.