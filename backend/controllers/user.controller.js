const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createAccount = async (req, res) => {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: true, message: "Full Name, Email, and Password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: true, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        fullName,
        email,
        password: hashedPassword,
        role: role || 'technician'
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN, { expiresIn: "36000s" });

    return res.json({
        error: false,
        user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
        accessToken,
        message: "Registration Successful"
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const userInfo = await User.findOne({ email });
    if (!userInfo) {
        return res.status(400).json({ error: true, message: "Incorrect credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userInfo.password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: true, message: "Incorrect credentials" });
    }

    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "36000s" });

    return res.json({
        error: false,
        message: "Login Successful",
        user: { id: userInfo._id, fullName: userInfo.fullName, email: userInfo.email, role: userInfo.role },
        accessToken
    });
};

exports.getUser = async (req, res) => {
    const { user } = req;
    const isUser = await User.findById(user._id);
    if (!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: {
            fullName: isUser.fullName,
            email: isUser.email,
            role: isUser.role,
            _id: isUser._id,
            createdOn: isUser.createdOn
        },
        message: "",
    });
};
//get users where role not admin
// exports.getUsers = async (req, res) => {
//     const users = await User.find({ role: { $ne: 'admin' } });
//     return res.json({ error: false, users });
// };


exports.logout = (req, res) => {
    res.json({ message: "Logout successful" });
};
