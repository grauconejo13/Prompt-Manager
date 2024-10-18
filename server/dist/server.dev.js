"use strict";

var express = require('express');

var _require = require('express-graphql'),
    graphqlHTTP = _require.graphqlHTTP;

var mongoose = require('mongoose');

var cors = require('cors');

var schema = require('./schema');

require('dotenv').config();

var app = express();
var PORT = process.env.PORT || 5000; // Middleware

app.use(cors());
app.use(express.json()); // MongoDB connection

mongoose.connect("mongodb://localhost/".concat(process.env.DB_NAME || 'yourname-prompt-db'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('MongoDB connected');
})["catch"](function (err) {
  return console.error(err);
}); // GraphQL endpoint

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});
//# sourceMappingURL=server.dev.js.map
