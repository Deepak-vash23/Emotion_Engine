# 💬 Emotion Engine – Emotion-Driven Chatbot with LLM-Powered AI

Emotion Engine is a cutting-edge chatbot designed to simulate human-like conversations with emotional intelligence, personalized tone, and now, a **self-hosted AI using Cohere's LLM** for natural language understanding. It offers complete backend control, unlike ChatGPT, with features tailored for real-world emotional engagement.

---

## 🚀 Why Use Emotion Engine Over ChatGPT?

| Feature                      | Emotion Engine                      | ChatGPT                        |
|------------------------------|-------------------------------------|--------------------------------|
| 🎭 Emotion Sensitivity       | ✅ Yes – custom NLP + emotion AI   | ❌ No                         |
| 🧠 LLM Integration (Cohere)  | ✅ Open, customizable, self-made   | ❌ Closed, proprietary        |
| 🌐 Backend Control           | ✅ Full stack control              | ❌ Limited                    |
| 🔐 Local Data Privacy        | ✅ Yes – hosted by you             | ❌ No                         |
| 🎨 UI Customization          | ✅ Fully themeable frontend        | ❌ Limited                    |



## 🧠 Features

- 🎤 Emotion-aware responses using tone + context
- 🤖 Cohere LLM-based custom response engine
- 🌐 Fully custom frontend + backend stack
- 🔐 Local MySQL database with user authentication
- 💬 Dynamic conversation flow logic
- 📊 Feedback & emotion analytics support
- 🚀 Lightweight and perfect for hackathons or demos

---

## ⚙️ AI Engine (Cohere LLM)

This chatbot uses the **Cohere Large Language Model (LLM)** via API to generate dynamic and intelligent responses. Unlike OpenAI or ChatGPT, Cohere allows for:

- Custom prompt tuning
- Lighter cost structure
- Private and secure use
- Seamless backend integration

### Example API Call:
```js
const response = await cohere.generate({
  model: 'command-nightly',
  prompt: `User: ${userInput}\nEmotion: ${detectedEmotion}\nBot:`,
  max_tokens: 80
});
