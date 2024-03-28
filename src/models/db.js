// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
    //   'mongodb+srv://chavdasandip2908:Sandip1105@cluster0.mongodb.net/KrishiCase?retryWrites=true&w=majority',
      'mongodb+srv://chavdasandip2908:Sandip1105@cluster0.8gbqypn.mongodb.net/KrishiCash?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
