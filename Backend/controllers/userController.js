import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2';

// MySQL Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password_here', 
  database: 'emotion_engine',  
});

// to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, "secretkey", { expiresIn: "30d" });
};

// Register User
export const registerUser = async (req, res) => {
  console.log("Received body:", req.body);
  const { name, email, password } = req.body;

  // Check if user already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error registering user.' });
      }

      res.status(201).json({
        _id: result.insertId,
        name,
        email,
        password,
        token: generateToken(result.insertId),
      });
    });
  });
  // res.json({message: 'Signup Failed'});
};

// Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
}

// // Get All Users
// export const getAllUsers = async (req, res) => {
//   try {
//     db.query('SELECT * FROM users', (err, results) => {
//       if (err) {
//         return res.status(500).json({ message: 'Database error', error: err });
//       }

//       res.status(200).json({ users: results });
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving users' });
//   }
// };
export const getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.status(200).json(result);
  });
};

// Get User by ID
export const getUserById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT id, name, email FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(results[0]);
  });
};