import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExits = await User.findOne({ email });
        if (userExits) {
            return res.status(400).json({ success: false, error: "Email already exists" });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hash });
        const regiseredUser = await user.save();

        return res.status(201).json({ success: true, message: "User registered" });
    } catch (err) {
        return res.status(400).json({ success: false, error: "Error in register User" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).json({ success: true, token, userId: user._id, name: user.name });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};
