// // Backend/db.js
// import mongoose from 'mongoose';
// import 'dotenv/config';

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI);
//     console.log(`'MongoDB connected ✅':${conn.connection.host}`);
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   }
// }

// export default connectDB;

// // const mongoose = require('mongoose');



// // const connectDB = async () => {
// //   try {
// //     await mongoose.connect("mongodb+srv://hackviz:hackviz@cluster0.zmhykxn.mongodb.net/hackathonDB?retryWrites=true&w=majority", 
// //     {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });
// //     console.log("MongoDB connected ✅");
// //   } catch (error) {
// //     console.error("MongoDB connection error ❌:", error.message);
// //     process.exit(1);
// //   }
// // };

// // module.exports = connectDB;
