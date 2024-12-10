import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
//import jwt from 'jsonwebtoken';
import getUserModelForBatch from '../models/user.model.js';

const authenticationToken = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ msg: 'Authorization denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const UserModel = getUserModelForBatch();
        const user = await UserModel.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default authenticationToken;
