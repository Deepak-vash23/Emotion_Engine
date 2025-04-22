import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import { registerUser, loginUser, getAllUsers, getUserById } from './controllers/usercontroller.js';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api',userRoutes);
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'your_password_here',
  database: 'emotion_engine',
});

// Connect to Database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); 
  }
  console.log('Connected to MySQL Database.');
});

// User Routes
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);
app.get('/api/users', getAllUsers);
app.get('/api/users/:id', getUserById);


import {createProxyMiddleware} from 'http-proxy-middleware';

app.use('/chatbot', createProxyMiddleware({
  target: 'http://localhost:8501',
  changeOrigin: true,
  pathRewrite: {
    '^/chatbot': '', // So /chatbot behaves as root for Streamlit
  },
}));


// Start the Server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
