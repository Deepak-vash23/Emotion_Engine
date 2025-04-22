import streamlit as st
import json
import time
import os
from langchain_community.llms import Cohere
import datetime

# Set API Key
from config import COHERE_API_KEY, INSTANCES_PATH


# Load dataset function
@st.cache_data
def load_mental_health_data():
        # with open(r"C:\Users\Dell\Desktop\KOKO_Ai-main\KOKO_Ai-main\Instances.json", "r") as file:
        from config import INSTANCES_PATH
        with open(INSTANCES_PATH, "r") as file:
            return json.load(file)


# System prompt for AI behavior
SYSTEM_PROMPT = """
You are a kind, compassionate, and supportive mental health assistant.  
Your goal is to **uplift, encourage, and provide clear, practical advice** to users in distress.

**How to Respond:**
- **Start every response with a strong, reassuring sentence in CAPITALS and bold.**  
- Focus on **empowering solutions** rather than just acknowledging distress.  
- Use a **warm, hopeful tone**, reminding them that **things can improve and they are capable**.  
- Offer **small, achievable steps** for self-care, deep breathing, and positive self-talk.  
- If a user feels **overwhelmed, remind them of their inner strength**.  
"""

# Initialize AI model
model = Cohere(model="command-xlarge", cohere_api_key=COHERE_API_KEY)


# Function to get AI response
def get_response(user_query, dataset):
    for keyword, advice in dataset.items():
        if keyword in user_query.lower():
            user_query += f"\n[Additional Context: {advice}]"

    modified_query = SYSTEM_PROMPT + "\nUser: " + user_query + "\nAI:"

    try:
        response = model.invoke(modified_query, max_tokens=512)
        response = response.strip()

        return response if isinstance(response, str) else str(response)
    except Exception as e:
        return f"⚠️ Error: {str(e)}"


st.markdown("""
    <style>
        body { background-color: #F8E7FC; color: #6D3B6D; }
        .chat-container {
            max-width: 600px; margin: auto; background: rgba(255, 255, 255, 0.5);
            padding: 20px; border-radius: 15px; box-shadow: 0px 4px 15px rgba(109, 59, 109, 0.2);
            backdrop-filter: blur(10px);
        }
        .chat-message { padding: 12px; border-radius: 8px; margin: 10px 0; font-size: 16px; }
        .user-message { background: linear-gradient(135deg, #D8B4E2, #EAC7FF); color: #4A235A;
            text-align: right; border-radius: 15px 15px 0 15px; padding: 10px 15px; }
        .ai-message { background: linear-gradient(135deg, #F5D0FE, #F8BBE8); color: #4A235A;
            text-align: left; border-radius: 15px 15px 15px 0; padding: 10px 15px; }
        .send-button { background: linear-gradient(135deg, #E6B8F2, #F3D9FF); color: #4A235A;
            border: none; padding: 10px 20px; border-radius: 25px; font-size: 16px; transition: 0.3s; }
        .send-button:hover { background: linear-gradient(135deg, #F3D9FF, #E6B8F2); transform: scale(1.05); }
        .send-button:active { transform: scale(0.95); }
    </style>
""", unsafe_allow_html=True)

# Title
st.markdown("<h1 style='text-align: center; color: #F8E7FC;'>💬KOKO Ai </h1>", unsafe_allow_html=True)
st.write("😇 **Your compassionate companion for a healthier mind.**")

# Session State for Chat History
if "messages" not in st.session_state:
    st.session_state.messages = [
        ("ai-message",
         "<strong>KOKO Ai:</strong> Hello! I am here to support you. How are you feeling right now?",
         datetime.datetime.now().strftime("%H:%M:%S"))
    ]

# Chatbox UI
chat_container = st.container()
with chat_container:
    for role, text, timestamp in st.session_state.messages:
        st.markdown(
            f'<div class="chat-message {role}">{text} <br><small style="color:gray;">🕒 {timestamp}</small></div>',
            unsafe_allow_html=True)

# User Input Field
user_input = st.text_input("💬 I Love Hearing you...")

# Buttons Layout
col1, col2 = st.columns([4, 1])
with col1:
    send_btn = st.button("Send", key="send-btn", help="Click to send message")
with col2:
    clear_btn = st.button("🗑 Clear Chat", key="clear-btn", help="Reset the conversation")

# Handle Clear Chat
if clear_btn:
    st.session_state.messages = []
    st.rerun()

# Handle Message Send
if send_btn:
    if user_input.strip():
        timestamp = datetime.datetime.now().strftime("%H:%M:%S")
        st.session_state.messages.append(("user-message", f"<strong>You:</strong> {user_input}", timestamp))

        # Typing Indicator Effect
        with st.spinner("KOKO is thinking..."):
            time.sleep(0.5)
            dataset = load_mental_health_data()
            response = get_response(user_input, dataset)

        timestamp = datetime.datetime.now().strftime("%H:%M:%S")  # Timestamp for AI response
        st.session_state.messages.append(("ai-message", f"<strong>KOKO Ai:</strong> {response}", timestamp))

        st.rerun()
    else:
        st.warning("⚠️ Please type a message before sending.")