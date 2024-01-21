import re

# Define a dictionary of rules and responses
rules = {
    r'hello|hi|hey': 'Hello! How can I assist you today?',
    r'how are you': 'I am just a chatbot, but I am here to help you!',
    r'what is your name': "I'm just a simple rule-based chatbot.",
    r'bye|goodbye': 'Goodbye! Have a great day!',
    r'help': 'I can assist you with general questions. Just ask me anything!',
}

# Function to generate a response based on user input
def generate_response(user_input):
    for pattern, response in rules.items():
        if re.search(pattern, user_input, re.IGNORECASE):
            return response
    return "I'm sorry, I don't understand that."

# Main loop for the chatbot
while True:
    user_input = input("You: ")
    if user_input.lower() == 'exit':
        print("Chatbot: Goodbye!")
        break
    response = generate_response(user_input)
    print("Chatbot:", response)
