const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/api/userRoutes');
const clientRoutes = require('./routes/api/clientsRoute');
const passport = require('passport');
const port = process.env.PORT || 5000;
const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to Mongoose
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport Middle Ware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));
