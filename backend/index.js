require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config.json");
const app = express();

// Import routes
const userRoutes = require('./routes/user.routes');
const clientRoutes = require('./routes/client.routes');
const interventionRoutes = require('./routes/intervention.routes');

// MongoDB connection
mongoose.connect(config.connectionString);
console.log('MongoDB Connected');

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.json({ data: "hello " });
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/interventions', interventionRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
