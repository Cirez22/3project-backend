const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

require('dotenv').config();

// mongodb connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to db ✔️"))
  .catch(() => console.log("Couldn't connect to db ❌"))

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));

// open port to listen
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running ⚡")
});