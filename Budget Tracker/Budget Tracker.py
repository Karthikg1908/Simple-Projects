import json
import os

class BudgetTracker:
    def __init__(self):
        self.transactions = []

    def load_data(self, filename='budget_data.json'):
        if os.path.exists(filename):
            with open(filename, 'r') as file:
                self.transactions = json.load(file)

    def save_data(self, filename='budget_data.json'):
        with open(filename, 'w') as file:
            json.dump(self.transactions, file, indent=2)

    def add_transaction(self, category, amount, transaction_type):
        transaction = {
            'category': category,
            'amount': amount,
            'type': transaction_type
        }
        self.transactions.append(transaction)

    def calculate_budget(self):
        income = sum(transaction['amount'] for transaction in self.transactions if transaction['type'] == 'income')
        expenses = sum(transaction['amount'] for transaction in self.transactions if transaction['type'] == 'expense')
        return income - expenses

    def analyze_expenses(self):
        expense_categories = {}
        for transaction in self.transactions:
            if transaction['type'] == 'expense':
                category = transaction['category']
                amount = transaction['amount']
                expense_categories[category] = expense_categories.get(category, 0) + amount
        return expense_categories

def main():
    budget_tracker = BudgetTracker()
    budget_tracker.load_data()

    while True:
        print("\n===== Budget Tracker =====")
        print("1. Add Income")
        print("2. Add Expense")
        print("3. View Budget")
        print("4. Expense Analysis")
        print("5. Save and Exit")

        choice = input("Enter your choice (1-5): ")

        if choice == '1':
            category = input("Enter income category: ")
            amount = float(input("Enter income amount: "))
            budget_tracker.add_transaction(category, amount, 'income')
            print("Income added successfully!")

        elif choice == '2':
            category = input("Enter expense category: ")
            amount = float(input("Enter expense amount: "))
            budget_tracker.add_transaction(category, amount, 'expense')
            print("Expense added successfully!")

        elif choice == '3':
            remaining_budget = budget_tracker.calculate_budget()
            print(f"Remaining Budget: ₹{remaining_budget:.2f}")

        elif choice == '4':
            expense_analysis = budget_tracker.analyze_expenses()
            print("\nExpense Analysis:")
            for category, amount in expense_analysis.items():
                print(f"{category}: ₹{amount:.2f}")

        elif choice == '5':
            budget_tracker.save_data()
            print("Data saved. Exiting...")
            break

        else:
            print("Invalid choice. Please enter a number between 1 and 5.")

if __name__ == "__main__":
    main()
