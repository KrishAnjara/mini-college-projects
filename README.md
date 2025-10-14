# College Mini Projects

A collection of four beginner-friendly console-based Python applications designed for college students. Each project automatically displays student information from a centralized configuration file and demonstrates fundamental programming concepts including file handling, data validation, and user interface design.

## 🎓 Student Information

All projects automatically display student information configured in `student_config.py`:

```python
STUDENT_NAME = "Your Name"
ROLL_NUMBER = "Your Roll Number"
COLLEGE = "Your College Name"
```

**Note:** Update the `student_config.py` file with your actual information before running any project.

## 📁 Repository Structure

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
└── README.md                     # Project documentation
```

## 🚀 Quick Start

### Prerequisites

- Python 3.6 or higher
- No external dependencies required (uses only Python standard library)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/college-mini-projects.git
   cd college-mini-projects
   ```

2. **Update student information:**
   Edit `student_config.py` with your details:
   ```python
   STUDENT_NAME = "John Doe"
   ROLL_NUMBER = "CS2023001"
   COLLEGE = "ABC University"
   ```

3. **Run any project:**
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
**Location:** `calculator/calculator.py`

A simple arithmetic calculator supporting basic mathematical operations.

**Features:**
- Addition, Subtraction, Multiplication, Division
- Input validation and error handling
- Division by zero protection
- Continuous calculation mode
- Student info display in headers

**Sample Output:**
```
============================================================
    COLLEGE MINI PROJECT
============================================================
Student Name: John Doe
Roll Number:  CS2023001
College:      ABC University
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
**Location:** `student_grade_system/grade_system.py`

A comprehensive grade calculation system for student performance evaluation.

**Features:**
- Input marks for 5 subjects (Mathematics, Physics, Chemistry, English, Computer Science)
- Automatic total and average calculation
- Letter grade assignment (A/B/C/D/F)
- Performance feedback
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
Student Name: John Doe
Roll Number:  CS2023001
College:      ABC University
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
Evaluated by: John Doe
Roll Number: CS2023001
College: ABC University
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
**Location:** `bank_transaction_system/bank_system.py`

A complete banking system with account management and transaction features.

**Features:**
- Create new bank accounts with unique account numbers
- Deposit and withdraw money with validation
- Balance inquiry and account details
- Transaction history tracking
- Account summary for all accounts
- Data persistence using JSON file storage
- Minimum balance requirements

**Sample Output:**
```
============================================================
    COLLEGE MINI PROJECT
============================================================
Student Name: John Doe
Roll Number:  CS2023001
College:      ABC University
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
Created by: John Doe
----------------------------------------
```

### 4. Simple To-Do List Tool ✅
**Location:** `todo_tool/todo.py`

A task management system for organizing daily activities.

**Features:**
- Add new tasks with timestamps
- View all tasks with status indicators
- Mark tasks as complete
- Delete individual tasks
- Filter tasks by status (pending/completed)
- Clear all tasks option
- Data persistence using text file storage
- Task statistics

**Sample Output:**
```
============================================================
    COLLEGE MINI PROJECT
============================================================
Student Name: John Doe
Roll Number:  CS2023001
College:      ABC University
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

📋 TO-DO LIST (Managed by: John Doe)
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

## 🛠️ Technical Features

### Input Validation
- All projects include comprehensive input validation
- Error handling for invalid data types
- Range validation for numerical inputs
- Empty input protection

### Data Persistence
- **Bank System:** JSON file storage for account data
- **To-Do List:** Text file storage for task data
- **Grade System:** Session-based (no persistence required)
- **Calculator:** Session-based (no persistence required)

### User Experience
- Clear menu-driven interfaces
- Consistent formatting and styling
- Helpful error messages
- Confirmation prompts for destructive operations
- Student information integration in all outputs

### Code Quality
- Comprehensive comments and documentation
- Modular function design
- Consistent naming conventions
- Error handling and exception management

## 📝 Usage Instructions

### Running Individual Projects

Each project can be run independently:

```bash
# Navigate to project directory
cd college-mini-projects

# Run Calculator
python calculator/calculator.py

# Run Grade System
python student_grade_system/grade_system.py

# Run Bank System
python bank_transaction_system/bank_system.py

# Run To-Do List
python todo_tool/todo.py
```

### Customizing Student Information

1. Open `student_config.py`
2. Update the following variables:
   ```python
   STUDENT_NAME = "Your Full Name"
   ROLL_NUMBER = "Your Roll Number"
   COLLEGE = "Your College Name"
   ```
3. Save the file
4. Run any project to see your information displayed

### Data Files

- **Bank System:** Creates `accounts.json` in `bank_transaction_system/` directory
- **To-Do List:** Creates `tasks.txt` in `todo_tool/` directory
- These files are automatically created when you first use the respective features

## 🔧 Development

### Adding New Features

Each project is designed to be easily extensible:

1. **Calculator:** Add new mathematical operations
2. **Grade System:** Add more subjects or different grading scales
3. **Bank System:** Add loan features, interest calculation, or account types
4. **To-Do List:** Add task priorities, due dates, or categories

### Code Structure

All projects follow a similar structure:
- Header display with student information
- Menu-driven interface
- Input validation functions
- Core functionality functions
- Data persistence (where applicable)
- Main program loop

## 📚 Learning Objectives

These projects demonstrate:

1. **Basic Python Programming**
   - Variables, data types, and operators
   - Control structures (if/else, loops)
   - Functions and modular programming

2. **File Handling**
   - Reading and writing text files
   - JSON data manipulation
   - Data persistence concepts

3. **Input Validation**
   - Error handling and exception management
   - Data type validation
   - Range and format checking

4. **User Interface Design**
   - Menu-driven console applications
   - User experience considerations
   - Clear output formatting

5. **Software Organization**
   - Project structure and modularity
   - Configuration management
   - Code documentation

## 🤝 Contributing

Feel free to enhance these projects by:

1. Adding new features
2. Improving user interface
3. Adding more validation
4. Creating additional projects
5. Improving documentation

## 📄 License

This project is created for educational purposes. Feel free to use, modify, and distribute for learning and teaching.

## 👨‍💻 Developer Information

- **Developed by:** [Student Name from student_config.py]
- **Roll Number:** [Roll Number from student_config.py]
- **College:** [College Name from student_config.py]
- **Project Type:** College Mini Projects
- **Language:** Python 3
- **Dependencies:** None (Standard Library Only)

---

**Note:** Remember to update your student information in `student_config.py` before running any project. This ensures your details appear correctly in all program outputs and headers.