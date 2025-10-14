#!/usr/bin/env python3
"""
Calculator Tool - College Mini Project
A simple console-based calculator with basic arithmetic operations
"""

import sys
import os

# Add parent directory to path to import student_config
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import student_config

def display_header():
    """Display the student information header"""
    print(student_config.get_student_header())
    print("PROJECT: CALCULATOR TOOL")
    print("=" * 60)

def display_menu():
    """Display the calculator menu options"""
    print("\nCalculator Operations:")
    print("1. Addition (+)")
    print("2. Subtraction (-)")
    print("3. Multiplication (*)")
    print("4. Division (/)")
    print("5. Exit")
    print("-" * 30)

def get_numbers():
    """
    Get two numbers from user with input validation
    Returns: tuple of two float numbers
    """
    while True:
        try:
            num1 = float(input("Enter first number: "))
            num2 = float(input("Enter second number: "))
            return num1, num2
        except ValueError:
            print("Error: Please enter valid numbers!")
            print()

def add(a, b):
    """Addition operation"""
    result = a + b
    print(f"\nResult: {a} + {b} = {result}")
    return result

def subtract(a, b):
    """Subtraction operation"""
    result = a - b
    print(f"\nResult: {a} - {b} = {result}")
    return result

def multiply(a, b):
    """Multiplication operation"""
    result = a * b
    print(f"\nResult: {a} × {b} = {result}")
    return result

def divide(a, b):
    """Division operation with zero division check"""
    if b == 0:
        print("\nError: Division by zero is not allowed!")
        return None
    result = a / b
    print(f"\nResult: {a} ÷ {b} = {result}")
    return result

def get_user_choice():
    """
    Get user's menu choice with input validation
    Returns: integer choice (1-5)
    """
    while True:
        try:
            choice = int(input("Enter your choice (1-5): "))
            if 1 <= choice <= 5:
                return choice
            else:
                print("Error: Please enter a number between 1 and 5!")
        except ValueError:
            print("Error: Please enter a valid number!")

def main():
    """Main calculator function"""
    display_header()
    
    print("Welcome to the Calculator Tool!")
    print("This calculator performs basic arithmetic operations.")
    
    while True:
        display_menu()
        choice = get_user_choice()
        
        if choice == 5:
            print("\nThank you for using the Calculator Tool!")
            print(f"Developed by: {student_config.STUDENT_NAME}")
            print(f"Roll Number: {student_config.ROLL_NUMBER}")
            print(f"College: {student_config.COLLEGE}")
            break
        
        # Get numbers for calculation
        num1, num2 = get_numbers()
        
        # Perform operation based on choice
        if choice == 1:
            add(num1, num2)
        elif choice == 2:
            subtract(num1, num2)
        elif choice == 3:
            multiply(num1, num2)
        elif choice == 4:
            divide(num1, num2)
        
        # Ask if user wants to continue
        print("\n" + "-" * 40)
        continue_choice = input("Do you want to perform another calculation? (y/n): ").lower()
        if continue_choice not in ['y', 'yes']:
            print("\nThank you for using the Calculator Tool!")
            print(f"Developed by: {student_config.STUDENT_NAME}")
            print(f"Roll Number: {student_config.ROLL_NUMBER}")
            print(f"College: {student_config.COLLEGE}")
            break
        print()

if __name__ == "__main__":
    main()