require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Security Middleware
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

// app.use(helmet());
// app.use(mongoSanitize());
// app.use(xss());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/raza-hub')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.log(err);
        const fs = require('fs');
        fs.writeFileSync('db_debug.log', `DB Error: ${err.message}\n${new Date().toISOString()}`);
    });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/resources', require('./routes/resources'));

app.get('/', (req, res) => {
    res.send('Raza CS & Math Hub API Running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
