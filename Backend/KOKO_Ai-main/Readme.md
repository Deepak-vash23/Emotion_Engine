# KOKO Ai - A Compassionate Mental Health Chatbot

<img width="1467" alt="Screenshot 2025-03-24 at 12 28 41 PM" src="https://github.com/user-attachments/assets/d8846436-7477-4176-b2ef-ed57f729bc93" />

## Overview
KOKO Ai is a supportive and compassionate mental health chatbot designed to uplift and encourage users who may be feeling distressed. It provides thoughtful, empowering responses with actionable self-care tips using the Cohere LLM model.

## Features
- **Real-time conversation**: Chat with KOKO Ai to receive support and encouragement.
- **Empowering and positive responses**: AI ensures every response is warm, hopeful, and solution-oriented.
- **Context-aware interactions**: Uses a predefined dataset (`Instances.json`) to enrich responses.
- **Elegant UI with Streamlit**: A modern, user-friendly chat interface.
- **Session-based chat history**: Maintains conversation history within the session.
- **Clear chat functionality**: Allows users to reset the conversation.

## Installation
### Prerequisites
Ensure you have the following installed:
- Python 3.8+
- pip
- Streamlit

### Install Required Libraries
Run the following command to install the dependencies:
```bash
pip install streamlit langchain_community cohere
```

## Usage
### 1. Set Up API Key
Replace `Enter Your Key` in `COHERE_API_KEY` with your actual Cohere API key.

### 2. Give the Correct path to Json File
Ensure you have the `Instances.json` file in the specified directory:
```
/Users/yashsharma/Desktop/Chatbot/Instances.json
```
Modify the path as needed.

### 3. Run the Application
Execute the following command to start the chatbot:
```bash
streamlit run app.py
```

## File Structure
```
KOKO_Ai/
│── app.py                # Main application file
│── Instances.json        # Contextual dataset
└── README.md             # Documentation
```

## How It Works
1. The user enters a message.
2. KOKO Ai processes the input, checks for relevant context in `Instances.json`, and constructs a response.
3. The chatbot responds in a compassionate, solution-oriented manner.
4. Messages appear in a beautifully styled chat window.
5. Users can clear the conversation if needed.

## Contributing
Feel free to fork this project and contribute improvements! Submit a pull request with your changes.

## License
This project is licensed under the MIT License.

## Contact
For inquiries, reach out at [sharma2004yash@gmail.com].
