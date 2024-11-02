const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log('Database connected successfully');
      return mongoose.connection;
  } catch (error) {
      console.error('Database connection error', error);
      throw error;
  }
};
module.exports = connectDB;