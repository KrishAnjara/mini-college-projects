#!/usr/bin/env python3
"""
Simple To-Do List Tool - College Mini Project
A console-based task management system with file storage
"""

import sys
import os
from datetime import datetime

# Add parent directory to path to import student_config
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import student_config

# Data file for storing tasks
TASKS_FILE = os.path.join(os.path.dirname(__file__), "tasks.txt")

def display_header():
    """Display the student information header"""
    print(student_config.get_student_header())
    print("PROJECT: SIMPLE TO-DO LIST TOOL")
    print("=" * 60)

def display_menu():
    """Display the to-do list menu options"""
    print("\nTo-Do List Options:")
    print("1. Add New Task")
    print("2. View All Tasks")
    print("3. Mark Task as Complete")
    print("4. Delete Task")
    print("5. View Completed Tasks")
    print("6. View Pending Tasks")
    print("7. Clear All Tasks")
    print("8. Exit")
    print("-" * 30)

def load_tasks():
    """
    Load tasks from text file
    Returns: list of task dictionaries
    """
    tasks = []
    try:
        if os.path.exists(TASKS_FILE):
            with open(TASKS_FILE, 'r', encoding='utf-8') as file:
                for line in file:
                    line = line.strip()
                    if line:
                        # Parse task format: ID|STATUS|DATE|TASK_DESCRIPTION
                        parts = line.split('|', 3)
                        if len(parts) == 4:
                            task = {
                                'id': int(parts[0]),
                                'status': parts[1],
                                'date': parts[2],
                                'description': parts[3]
                            }
                            tasks.append(task)
        return tasks
    except Exception as e:
        print(f"Error loading tasks: {e}")
        return []

def save_tasks(tasks):
    """
    Save tasks to text file
    Args: tasks (list) - list of task dictionaries
    """
    try:
        with open(TASKS_FILE, 'w', encoding='utf-8') as file:
            for task in tasks:
                line = f"{task['id']}|{task['status']}|{task['date']}|{task['description']}\n"
                file.write(line)
        return True
    except Exception as e:
        print(f"Error saving tasks: {e}")
        return False

def get_next_task_id(tasks):
    """
    Get the next available task ID
    Args: tasks (list) - existing tasks
    Returns: int - next task ID
    """
    if not tasks:
        return 1
    return max(task['id'] for task in tasks) + 1

def add_task():
    """Add a new task to the to-do list"""
    print("\n" + "=" * 40)
    print("ADD NEW TASK")
    print("=" * 40)
    
    tasks = load_tasks()
    
    # Get task description
    while True:
        description = input("Enter task description: ").strip()
        if description and not description.isspace():
            break
        print("Error: Please enter a valid task description!")
    
    # Create new task
    new_task = {
        'id': get_next_task_id(tasks),
        'status': 'PENDING',
        'date': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'description': description
    }
    
    tasks.append(new_task)
    
    if save_tasks(tasks):
        print("\n✅ Task added successfully!")
        print("-" * 40)
        print(f"Task ID: {new_task['id']}")
        print(f"Description: {new_task['description']}")
        print(f"Status: {new_task['status']}")
        print(f"Added by: {student_config.STUDENT_NAME}")
        print("-" * 40)
    else:
        print("❌ Error adding task!")

def view_all_tasks():
    """View all tasks in the to-do list"""
    print("\n" + "=" * 40)
    print("ALL TASKS")
    print("=" * 40)
    
    tasks = load_tasks()
    
    if not tasks:
        print("📝 No tasks found! Add some tasks to get started.")
        return
    
    print(f"\n📋 TO-DO LIST (Managed by: {student_config.STUDENT_NAME})")
    print("=" * 80)
    print(f"{'ID':<4} {'Status':<10} {'Date Added':<20} {'Description':<40}")
    print("-" * 80)
    
    for task in tasks:
        status_emoji = "✅" if task['status'] == 'COMPLETED' else "⏳"
        print(f"{task['id']:<4} {status_emoji} {task['status']:<8} {task['date']:<20} {task['description'][:38]:<40}")
    
    print("-" * 80)
    pending_count = sum(1 for task in tasks if task['status'] == 'PENDING')
    completed_count = sum(1 for task in tasks if task['status'] == 'COMPLETED')
    print(f"Total Tasks: {len(tasks)} | Pending: {pending_count} | Completed: {completed_count}")
    print("=" * 80)

def mark_task_complete():
    """Mark a task as completed"""
    print("\n" + "=" * 40)
    print("MARK TASK AS COMPLETE")
    print("=" * 40)
    
    tasks = load_tasks()
    
    if not tasks:
        print("📝 No tasks found! Add some tasks first.")
        return
    
    # Show pending tasks
    pending_tasks = [task for task in tasks if task['status'] == 'PENDING']
    
    if not pending_tasks:
        print("🎉 All tasks are already completed!")
        return
    
    print("\nPending Tasks:")
    print("-" * 50)
    for task in pending_tasks:
        print(f"ID {task['id']}: {task['description']}")
    print("-" * 50)
    
    # Get task ID to complete
    while True:
        try:
            task_id = int(input("Enter task ID to mark as complete: "))
            break
        except ValueError:
            print("Error: Please enter a valid task ID!")
    
    # Find and update the task
    task_found = False
    for task in tasks:
        if task['id'] == task_id:
            if task['status'] == 'COMPLETED':
                print("ℹ️  Task is already completed!")
                return
            task['status'] = 'COMPLETED'
            task_found = True
            break
    
    if not task_found:
        print("❌ Task not found!")
        return
    
    if save_tasks(tasks):
        print("\n✅ Task marked as complete!")
        print("-" * 40)
        print(f"Task ID: {task_id}")
        print(f"Status: COMPLETED")
        print(f"Completed by: {student_config.STUDENT_NAME}")
        print("-" * 40)
    else:
        print("❌ Error updating task!")

def delete_task():
    """Delete a task from the to-do list"""
    print("\n" + "=" * 40)
    print("DELETE TASK")
    print("=" * 40)
    
    tasks = load_tasks()
    
    if not tasks:
        print("📝 No tasks found! Add some tasks first.")
        return
    
    # Show all tasks
    print("\nAll Tasks:")
    print("-" * 50)
    for task in tasks:
        status_emoji = "✅" if task['status'] == 'COMPLETED' else "⏳"
        print(f"ID {task['id']}: {status_emoji} {task['description']}")
    print("-" * 50)
    
    # Get task ID to delete
    while True:
        try:
            task_id = int(input("Enter task ID to delete: "))
            break
        except ValueError:
            print("Error: Please enter a valid task ID!")
    
    # Find and remove the task
    task_to_delete = None
    for i, task in enumerate(tasks):
        if task['id'] == task_id:
            task_to_delete = tasks.pop(i)
            break
    
    if not task_to_delete:
        print("❌ Task not found!")
        return
    
    # Confirm deletion
    confirm = input(f"Are you sure you want to delete '{task_to_delete['description']}'? (y/n): ").lower()
    if confirm not in ['y', 'yes']:
        tasks.append(task_to_delete)  # Add it back
        print("❌ Task deletion cancelled!")
        return
    
    if save_tasks(tasks):
        print("\n🗑️  Task deleted successfully!")
        print("-" * 40)
        print(f"Deleted Task: {task_to_delete['description']}")
        print(f"Deleted by: {student_config.STUDENT_NAME}")
        print("-" * 40)
    else:
        print("❌ Error deleting task!")

def view_completed_tasks():
    """View only completed tasks"""
    print("\n" + "=" * 40)
    print("COMPLETED TASKS")
    print("=" * 40)
    
    tasks = load_tasks()
    completed_tasks = [task for task in tasks if task['status'] == 'COMPLETED']
    
    if not completed_tasks:
        print("📝 No completed tasks found!")
        return
    
    print(f"\n✅ COMPLETED TASKS (Managed by: {student_config.STUDENT_NAME})")
    print("=" * 70)
    print(f"{'ID':<4} {'Date Added':<20} {'Description':<40}")
    print("-" * 70)
    
    for task in completed_tasks:
        print(f"{task['id']:<4} {task['date']:<20} {task['description'][:38]:<40}")
    
    print("-" * 70)
    print(f"Total Completed Tasks: {len(completed_tasks)}")
    print("=" * 70)

def view_pending_tasks():
    """View only pending tasks"""
    print("\n" + "=" * 40)
    print("PENDING TASKS")
    print("=" * 40)
    
    tasks = load_tasks()
    pending_tasks = [task for task in tasks if task['status'] == 'PENDING']
    
    if not pending_tasks:
        print("🎉 No pending tasks! All tasks are completed.")
        return
    
    print(f"\n⏳ PENDING TASKS (Managed by: {student_config.STUDENT_NAME})")
    print("=" * 70)
    print(f"{'ID':<4} {'Date Added':<20} {'Description':<40}")
    print("-" * 70)
    
    for task in pending_tasks:
        print(f"{task['id']:<4} {task['date']:<20} {task['description'][:38]:<40}")
    
    print("-" * 70)
    print(f"Total Pending Tasks: {len(pending_tasks)}")
    print("=" * 70)

def clear_all_tasks():
    """Clear all tasks from the to-do list"""
    print("\n" + "=" * 40)
    print("CLEAR ALL TASKS")
    print("=" * 40)
    
    tasks = load_tasks()
    
    if not tasks:
        print("📝 No tasks found! The list is already empty.")
        return
    
    print(f"⚠️  You are about to delete ALL {len(tasks)} tasks!")
    confirm = input("Are you sure you want to clear all tasks? (y/n): ").lower()
    
    if confirm not in ['y', 'yes']:
        print("❌ Operation cancelled!")
        return
    
    # Clear the tasks file
    try:
        with open(TASKS_FILE, 'w') as file:
            file.write("")
        print("\n🗑️  All tasks cleared successfully!")
        print(f"Cleared by: {student_config.STUDENT_NAME}")
    except Exception as e:
        print(f"❌ Error clearing tasks: {e}")

def get_user_choice():
    """
    Get user's menu choice with input validation
    Returns: integer choice (1-8)
    """
    while True:
        try:
            choice = int(input("Enter your choice (1-8): "))
            if 1 <= choice <= 8:
                return choice
            else:
                print("Error: Please enter a number between 1 and 8!")
        except ValueError:
            print("Error: Please enter a valid number!")

def main():
    """Main to-do list function"""
    display_header()
    
    print("Welcome to the Simple To-Do List Tool!")
    print("This tool helps you manage your daily tasks efficiently.")
    
    while True:
        display_menu()
        choice = get_user_choice()
        
        if choice == 1:
            add_task()
        elif choice == 2:
            view_all_tasks()
        elif choice == 3:
            mark_task_complete()
        elif choice == 4:
            delete_task()
        elif choice == 5:
            view_completed_tasks()
        elif choice == 6:
            view_pending_tasks()
        elif choice == 7:
            clear_all_tasks()
        elif choice == 8:
            print("\nThank you for using the Simple To-Do List Tool!")
            print(f"Developed by: {student_config.STUDENT_NAME}")
            print(f"Roll Number: {student_config.ROLL_NUMBER}")
            print(f"College: {student_config.COLLEGE}")
            break
        
        # Ask if user wants to continue
        print("\n" + "-" * 40)
        continue_choice = input("Do you want to perform another operation? (y/n): ").lower()
        if continue_choice not in ['y', 'yes']:
            print("\nThank you for using the Simple To-Do List Tool!")
            print(f"Developed by: {student_config.STUDENT_NAME}")
            print(f"Roll Number: {student_config.ROLL_NUMBER}")
            print(f"College: {student_config.COLLEGE}")
            break
        print()

if __name__ == "__main__":
    main()