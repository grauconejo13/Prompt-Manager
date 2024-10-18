require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connection successful');
  mongoose.connection.close();
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});
