import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { registerUser, login, getAllUsers, getUserById } from './controllers/userController.js';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import { spawn } from "child_process";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { connectdb } from './lib/db.js';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// User Routes
app.use('/api', userRoutes);
app.post('/api/register', registerUser);
app.post('/api/login', login);
app.get('/api/users', getAllUsers);
app.get('/api/users/:id', getUserById);

// Serve static frontend from /public
app.use(express.static(path.join(__dirname, 'public')));

// Proxy /chatbot to Streamlit server
app.use('/chatbot', createProxyMiddleware({
  target: 'http://localhost:8501',
  changeOrigin: true,
  pathRewrite: {
    '^/chatbot': '',
  },
}));

// Start Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  connectdb();
});

// Spawn Streamlit Chatbot (DO NOT open browser)
const chatbotProcess = spawn("streamlit", ["run", "KOKO_AI.py", "--server.headless=true"], {
  cwd: path.join(__dirname, "KOKO_Ai-main"),
  shell: true,
});

chatbotProcess.stdout.on("data", (data) => {
  console.log(`Chatbot: ${data}`);
});

chatbotProcess.stderr.on("data", (data) => {
  console.error(`Chatbot Error: ${data}`);
});

chatbotProcess.on("close", (code) => {
  console.log(`Chatbot exited with code ${code}`);
});
