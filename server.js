const express = require("express");
const users = require('./routes/users');
const contacts = require('./routes/contacts');
const auth = require('./routes/auth');
const connectDB = require('./config/db')

const app = express();

// Connect DB
connectDB();

app.get('/', (req, res) => res.status(200).json({
  status: 'Success',
  message: 'Succeeded'
})

);

app.use('/api/users', users);
app.use('/api/contacts', contacts);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
