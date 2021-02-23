const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const users = require('./routes/users');
const contacts = require('./routes/contacts');
const auth = require('./routes/auth');

const app = express();

dotenv.config({ path: './config.env' });

// Connect to DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connection successful...'));

// MIDDLEWARES
// Body Parser
app.use(express.json());

// ROUTE HANDLERS
app.use('/api/users', users);
app.use('/api/contacts', contacts);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
