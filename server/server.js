require('dotenv').config(); // Load .env variables
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Directly define the MongoDB URI for testing
const MONGODB_URI = 'mongodb+srv://vievie:I1vMbVHHkFyBLPPW@grauconejo13.hpjmuez.mongodb.net/VanessaVictorino-prompt-db?retryWrites=true&w=majority'
console.log('MONGODB_URI:', MONGODB_URI); // Log to see the connection string being used

// Replace <username> and <password> with your MongoDB credentials.
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds timeout for initial connection
  socketTimeoutMS: 45000, // 45 seconds timeout for inactivity on sockets
  keepAlive: true, // Keep the connection alive
  keepAliveInitialDelay: 300000, // 5 minutes delay for keep-alive
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected to Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enables the GraphiQL interface for testing queries
}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
