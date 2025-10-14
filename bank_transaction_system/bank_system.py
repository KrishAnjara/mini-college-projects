#!/usr/bin/env python3
"""
Bank Transaction Management System - College Mini Project
A console-based banking system with account management and transaction features
"""

import sys
import os
import json
from datetime import datetime

# Add parent directory to path to import student_config
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import student_config

# Data file for storing account information
DATA_FILE = os.path.join(os.path.dirname(__file__), "accounts.json")

def display_header():
    """Display the student information header"""
    print(student_config.get_student_header())
    print("PROJECT: BANK TRANSACTION MANAGEMENT SYSTEM")
    print("=" * 60)

def display_menu():
    """Display the banking system menu options"""
    print("\nBank Management Options:")
    print("1. Create New Account")
    print("2. Deposit Money")
    print("3. Withdraw Money")
    print("4. Check Balance")
    print("5. View Account Details")
    print("6. View All Accounts")
    print("7. Exit")
    print("-" * 30)

def load_accounts():
    """
    Load account data from JSON file
    Returns: dictionary of accounts
    """
    try:
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r') as file:
                return json.load(file)
        return {}
    except (json.JSONDecodeError, FileNotFoundError):
        return {}

def save_accounts(accounts):
    """
    Save account data to JSON file
    Args: accounts (dict) - dictionary of account data
    """
    try:
        with open(DATA_FILE, 'w') as file:
            json.dump(accounts, file, indent=4)
        return True
    except Exception as e:
        print(f"Error saving data: {e}")
        return False

def generate_account_number(accounts):
    """
    Generate a unique account number
    Args: accounts (dict) - existing accounts
    Returns: string - new account number
    """
    if not accounts:
        return "ACC001"
    
    # Find the highest existing account number
    max_num = 0
    for acc_num in accounts.keys():
        if acc_num.startswith("ACC"):
            try:
                num = int(acc_num[3:])
                max_num = max(max_num, num)
            except ValueError:
                continue
    
    return f"ACC{max_num + 1:03d}"

def get_account_number():
    """
    Get account number from user with validation
    Returns: string - account number
    """
    while True:
        acc_num = input("Enter account number: ").strip().upper()
        if acc_num:
            return acc_num
        print("Error: Please enter a valid account number!")

def get_amount():
    """
    Get amount from user with validation
    Returns: float - amount
    """
    while True:
        try:
            amount = float(input("Enter amount: "))
            if amount > 0:
                return amount
            else:
                print("Error: Amount must be greater than 0!")
        except ValueError:
            print("Error: Please enter a valid amount!")

def create_account():
    """Create a new bank account"""
    print("\n" + "=" * 40)
    print("CREATE NEW ACCOUNT")
    print("=" * 40)
    
    accounts = load_accounts()
    
    # Get account holder details
    while True:
        name = input("Enter account holder name: ").strip()
        if name and not name.isspace():
            break
        print("Error: Please enter a valid name!")
    
    while True:
        try:
            age = int(input("Enter age: "))
            if 18 <= age <= 100:
                break
            else:
                print("Error: Age must be between 18 and 100!")
        except ValueError:
            print("Error: Please enter a valid age!")
    
    while True:
        phone = input("Enter phone number: ").strip()
        if phone and len(phone) >= 10:
            break
        print("Error: Please enter a valid phone number!")
    
    # Get initial deposit
    print("\nInitial deposit (minimum $100):")
    while True:
        initial_deposit = get_amount()
        if initial_deposit >= 100:
            break
        print("Error: Minimum initial deposit is $100!")
    
    # Generate account number
    account_number = generate_account_number(accounts)
    
    # Create account record
    account_data = {
        "account_number": account_number,
        "name": name,
        "age": age,
        "phone": phone,
        "balance": initial_deposit,
        "created_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "created_by": student_config.STUDENT_NAME,
        "transactions": [
            {
                "type": "Initial Deposit",
                "amount": initial_deposit,
                "balance": initial_deposit,
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
        ]
    }
    
    accounts[account_number] = account_data
    
    if save_accounts(accounts):
        print("\n✅ Account created successfully!")
        print("-" * 40)
        print(f"Account Number: {account_number}")
        print(f"Account Holder: {name}")
        print(f"Initial Balance: ${initial_deposit:.2f}")
        print(f"Created by: {student_config.STUDENT_NAME}")
        print("-" * 40)
    else:
        print("❌ Error creating account!")

def deposit_money():
    """Deposit money into an account"""
    print("\n" + "=" * 40)
    print("DEPOSIT MONEY")
    print("=" * 40)
    
    accounts = load_accounts()
    
    if not accounts:
        print("No accounts found! Please create an account first.")
        return
    
    account_number = get_account_number()
    
    if account_number not in accounts:
        print("❌ Account not found!")
        return
    
    amount = get_amount()
    
    # Update balance
    accounts[account_number]["balance"] += amount
    
    # Add transaction record
    transaction = {
        "type": "Deposit",
        "amount": amount,
        "balance": accounts[account_number]["balance"],
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    accounts[account_number]["transactions"].append(transaction)
    
    if save_accounts(accounts):
        print("\n✅ Deposit successful!")
        print("-" * 40)
        print(f"Account Number: {account_number}")
        print(f"Deposited Amount: ${amount:.2f}")
        print(f"New Balance: ${accounts[account_number]['balance']:.2f}")
        print(f"Processed by: {student_config.STUDENT_NAME}")
        print("-" * 40)
    else:
        print("❌ Error processing deposit!")

def withdraw_money():
    """Withdraw money from an account"""
    print("\n" + "=" * 40)
    print("WITHDRAW MONEY")
    print("=" * 40)
    
    accounts = load_accounts()
    
    if not accounts:
        print("No accounts found! Please create an account first.")
        return
    
    account_number = get_account_number()
    
    if account_number not in accounts:
        print("❌ Account not found!")
        return
    
    current_balance = accounts[account_number]["balance"]
    print(f"Current Balance: ${current_balance:.2f}")
    
    amount = get_amount()
    
    if amount > current_balance:
        print("❌ Insufficient funds!")
        return
    
    # Update balance
    accounts[account_number]["balance"] -= amount
    
    # Add transaction record
    transaction = {
        "type": "Withdrawal",
        "amount": amount,
        "balance": accounts[account_number]["balance"],
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    accounts[account_number]["transactions"].append(transaction)
    
    if save_accounts(accounts):
        print("\n✅ Withdrawal successful!")
        print("-" * 40)
        print(f"Account Number: {account_number}")
        print(f"Withdrawn Amount: ${amount:.2f}")
        print(f"Remaining Balance: ${accounts[account_number]['balance']:.2f}")
        print(f"Processed by: {student_config.STUDENT_NAME}")
        print("-" * 40)
    else:
        print("❌ Error processing withdrawal!")

def check_balance():
    """Check account balance"""
    print("\n" + "=" * 40)
    print("CHECK BALANCE")
    print("=" * 40)
    
    accounts = load_accounts()
    
    if not accounts:
        print("No accounts found! Please create an account first.")
        return
    
    account_number = get_account_number()
    
    if account_number not in accounts:
        print("❌ Account not found!")
        return
    
    account = accounts[account_number]
    print("\n💰 BALANCE INQUIRY")
    print("-" * 40)
    print(f"Account Number: {account_number}")
    print(f"Account Holder: {account['name']}")
    print(f"Current Balance: ${account['balance']:.2f}")
    print(f"Inquiry by: {student_config.STUDENT_NAME}")
    print("-" * 40)

def view_account_details():
    """View complete account details"""
    print("\n" + "=" * 40)
    print("ACCOUNT DETAILS")
    print("=" * 40)
    
    accounts = load_accounts()
    
    if not accounts:
        print("No accounts found! Please create an account first.")
        return
    
    account_number = get_account_number()
    
    if account_number not in accounts:
        print("❌ Account not found!")
        return
    
    account = accounts[account_number]
    
    print("\n📋 COMPLETE ACCOUNT INFORMATION")
    print("=" * 50)
    print(f"Account Number: {account['account_number']}")
    print(f"Account Holder: {account['name']}")
    print(f"Age: {account['age']}")
    print(f"Phone: {account['phone']}")
    print(f"Current Balance: ${account['balance']:.2f}")
    print(f"Account Created: {account['created_date']}")
    print(f"Created by: {account['created_by']}")
    print(f"Viewed by: {student_config.STUDENT_NAME}")
    
    print("\n📊 TRANSACTION HISTORY")
    print("-" * 50)
    for i, transaction in enumerate(account['transactions'][-5:], 1):  # Show last 5 transactions
        print(f"{i}. {transaction['type']}: ${transaction['amount']:.2f}")
        print(f"   Balance: ${transaction['balance']:.2f} | Date: {transaction['date']}")
    
    if len(account['transactions']) > 5:
        print(f"... and {len(account['transactions']) - 5} more transactions")
    
    print("=" * 50)

def view_all_accounts():
    """View summary of all accounts"""
    print("\n" + "=" * 40)
    print("ALL ACCOUNTS SUMMARY")
    print("=" * 40)
    
    accounts = load_accounts()
    
    if not accounts:
        print("No accounts found! Please create an account first.")
        return
    
    print(f"\n📊 BANK SUMMARY (Managed by: {student_config.STUDENT_NAME})")
    print("=" * 70)
    print(f"{'Account No.':<12} {'Name':<20} {'Balance':<15} {'Created':<15}")
    print("-" * 70)
    
    total_balance = 0
    for acc_num, account in accounts.items():
        total_balance += account['balance']
        created_date = account['created_date'].split()[0]  # Just the date part
        print(f"{acc_num:<12} {account['name'][:19]:<20} ${account['balance']:<14.2f} {created_date:<15}")
    
    print("-" * 70)
    print(f"Total Accounts: {len(accounts)}")
    print(f"Total Bank Balance: ${total_balance:.2f}")
    print("=" * 70)

def get_user_choice():
    """
    Get user's menu choice with input validation
    Returns: integer choice (1-7)
    """
    while True:
        try:
            choice = int(input("Enter your choice (1-7): "))
            if 1 <= choice <= 7:
                return choice
            else:
                print("Error: Please enter a number between 1 and 7!")
        except ValueError:
            print("Error: Please enter a valid number!")

def main():
    """Main banking system function"""
    display_header()
    
    print("Welcome to the Bank Transaction Management System!")
    print("This system helps you manage bank accounts and transactions.")
    
    while True:
        display_menu()
        choice = get_user_choice()
        
        if choice == 1:
            create_account()
        elif choice == 2:
            deposit_money()
        elif choice == 3:
            withdraw_money()
        elif choice == 4:
            check_balance()
        elif choice == 5:
            view_account_details()
        elif choice == 6:
            view_all_accounts()
        elif choice == 7:
            print("\nThank you for using the Bank Transaction Management System!")
            print(f"Developed by: {student_config.STUDENT_NAME}")
            print(f"Roll Number: {student_config.ROLL_NUMBER}")
            print(f"College: {student_config.COLLEGE}")
            break
        
        # Ask if user wants to continue
        print("\n" + "-" * 40)
        continue_choice = input("Do you want to perform another operation? (y/n): ").lower()
        if continue_choice not in ['y', 'yes']:
            print("\nThank you for using the Bank Transaction Management System!")
            print(f"Developed by: {student_config.STUDENT_NAME}")
            print(f"Roll Number: {student_config.ROLL_NUMBER}")
            print(f"College: {student_config.COLLEGE}")
            break
        print()

if __name__ == "__main__":
    main()