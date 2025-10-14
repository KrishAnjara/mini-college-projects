# student_config.py
# Configuration file containing student information
# This file is imported by all mini projects to display student details

STUDENT_NAME = "Your Name"
ROLL_NUMBER = "Your Roll Number"
COLLEGE = "Your College Name"

def get_student_header():
    """
    Returns a formatted header with student information
    """
    header = f"""
{'='*60}
    COLLEGE MINI PROJECT
{'='*60}
Student Name: {STUDENT_NAME}
Roll Number:  {ROLL_NUMBER}
College:      {COLLEGE}
{'='*60}
"""
    return header

def get_student_info():
    """
    Returns student information as a dictionary
    """
    return {
        'name': STUDENT_NAME,
        'roll_number': ROLL_NUMBER,
        'college': COLLEGE
    }