require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user.model");
const config = require("./config.json");

// MongoDB Connection
mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

async function seedAdmin() {
    try {
        const adminEmail = "admin2@example.com"; // Change to your desired admin email
        const adminPassword = "adminpassword"; // Change to your desired admin password

        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const admin = new User({
            fullName: "Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });

        await admin.save();
        console.log("Admin account created successfully");
    } catch (error) {
        console.error("Error seeding admin account:", error);
    } finally {
        mongoose.connection.close();
    }
}

seedAdmin();
