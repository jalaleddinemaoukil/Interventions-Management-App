const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'planner', 'technician'], default: 'technician', required: true },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
