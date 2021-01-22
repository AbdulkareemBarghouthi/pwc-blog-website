// Required packages to run project backend
const express = require('express');
const mongoose = require('mongoose');

// initialize express
const app = express();

// App Middleware usages
app.use(express.json());

// Imported routes
const authRouth = require('./routes/auth');

// Defined routes
app.use('/api/auth', authRouth);

// App Strings
const dbURI = "mongodb://localhost/pwc-application";

// Database connection

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => { console.log(err) });
db.once('open', () => { console.log('DB started successfully') });

app.listen(2400, () => { console.log('Server Started at port 2400') });
