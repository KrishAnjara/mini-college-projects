#!/usr/bin/env python3
"""
Student Grade System - College Mini Project
A console-based system to calculate student grades based on marks in 5 subjects
"""

import sys
import os

# Add parent directory to path to import student_config
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import student_config

def display_header():
    """Display the student information header"""
    print(student_config.get_student_header())
    print("PROJECT: STUDENT GRADE SYSTEM")
    print("=" * 60)

def display_menu():
    """Display the grade system menu options"""
    print("\nGrade System Options:")
    print("1. Calculate Grade for a Student")
    print("2. View Grading Scale")
    print("3. Exit")
    print("-" * 30)

def display_grading_scale():
    """Display the grading scale used in the system"""
    print("\nGrading Scale:")
    print("-" * 30)
    print("A: 90-100 (Excellent)")
    print("B: 80-89  (Good)")
    print("C: 70-79  (Average)")
    print("D: 60-69  (Below Average)")
    print("F: 0-59   (Fail)")
    print("-" * 30)

def get_student_name():
    """
    Get student name with input validation
    Returns: string - student name
    """
    while True:
        name = input("Enter student name: ").strip()
        if name and not name.isspace():
            return name
        print("Error: Please enter a valid student name!")

def get_subject_marks():
    """
    Get marks for 5 subjects with input validation
    Returns: list of 5 marks (floats)
    """
    subjects = ["Mathematics", "Physics", "Chemistry", "English", "Computer Science"]
    marks = []
    
    print("\nEnter marks for the following subjects (0-100):")
    print("-" * 45)
    
    for subject in subjects:
        while True:
            try:
                mark = float(input(f"{subject}: "))
                if 0 <= mark <= 100:
                    marks.append(mark)
                    break
                else:
                    print("Error: Marks must be between 0 and 100!")
            except ValueError:
                print("Error: Please enter a valid number!")
    
    return marks, subjects

def calculate_grade(average):
    """
    Calculate letter grade based on average marks
    Args: average (float) - average marks
    Returns: string - letter grade
    """
    if average >= 90:
        return "A"
    elif average >= 80:
        return "B"
    elif average >= 70:
        return "C"
    elif average >= 60:
        return "D"
    else:
        return "F"

def get_grade_description(grade):
    """
    Get description for the grade
    Args: grade (string) - letter grade
    Returns: string - grade description
    """
    descriptions = {
        "A": "Excellent",
        "B": "Good",
        "C": "Average",
        "D": "Below Average",
        "F": "Fail"
    }
    return descriptions.get(grade, "Unknown")

def display_result(student_name, marks, subjects, total, average, grade):
    """Display the complete grade report"""
    print("\n" + "=" * 60)
    print("GRADE REPORT")
    print("=" * 60)
    print(f"Student Name: {student_name}")
    print(f"Evaluated by: {student_config.STUDENT_NAME}")
    print(f"Roll Number: {student_config.ROLL_NUMBER}")
    print(f"College: {student_config.COLLEGE}")
    print("-" * 60)
    
    print("Subject-wise Marks:")
    print("-" * 30)
    for i, subject in enumerate(subjects):
        print(f"{subject:<20}: {marks[i]:>6.1f}")
    
    print("-" * 30)
    print(f"{'Total Marks':<20}: {total:>6.1f}/500")
    print(f"{'Average':<20}: {average:>6.2f}%")
    print(f"{'Grade':<20}: {grade}")
    print(f"{'Performance':<20}: {get_grade_description(grade)}")
    print("=" * 60)

def process_student_grade():
    """Process grade calculation for a student"""
    print("\n" + "=" * 40)
    print("STUDENT GRADE CALCULATION")
    print("=" * 40)
    
    # Get student information
    student_name = get_student_name()
    marks, subjects = get_subject_marks()
    
    # Calculate results
    total = sum(marks)
    average = total / len(marks)
    grade = calculate_grade(average)
    
    # Display results
    display_result(student_name, marks, subjects, total, average, grade)
    
    # Provide additional feedback
    if grade == "F":
        print("\n⚠️  Student needs improvement in studies!")
    elif grade == "D":
        print("\n📚 Student should focus more on studies.")
    elif grade == "C":
        print("\n👍 Good effort! Keep working hard.")
    elif grade == "B":
        print("\n🎉 Great job! Excellent performance.")
    else:  # grade == "A"
        print("\n🏆 Outstanding performance! Keep it up!")

def get_user_choice():
    """
    Get user's menu choice with input validation
    Returns: integer choice (1-3)
    """
    while True:
        try:
            choice = int(input("Enter your choice (1-3): "))
            if 1 <= choice <= 3:
                return choice
            else:
                print("Error: Please enter a number between 1 and 3!")
        except ValueError:
            print("Error: Please enter a valid number!")

def main():
    """Main grade system function"""
    display_header()
    
    print("Welcome to the Student Grade System!")
    print("This system calculates grades based on marks in 5 subjects.")
    
    while True:
        display_menu()
        choice = get_user_choice()
        
        if choice == 1:
            process_student_grade()
        elif choice == 2:
            display_grading_scale()
        elif choice == 3:
            print("\nThank you for using the Student Grade System!")
            print(f"Developed by: {student_config.STUDENT_NAME}")
            print(f"Roll Number: {student_config.ROLL_NUMBER}")
            print(f"College: {student_config.COLLEGE}")
            break
        
        # Ask if user wants to continue
        print("\n" + "-" * 40)
        continue_choice = input("Do you want to continue? (y/n): ").lower()
        if continue_choice not in ['y', 'yes']:
            print("\nThank you for using the Student Grade System!")
            print(f"Developed by: {student_config.STUDENT_NAME}")
            print(f"Roll Number: {student_config.ROLL_NUMBER}")
            print(f"College: {student_config.COLLEGE}")
            break
        print()

if __name__ == "__main__":
    main()