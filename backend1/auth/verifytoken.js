import jwt from 'jsonwebtoken';
import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSchema.js';

export const authenticate = async (req, res, next) => {
    const authToken = req.headers.authorization;
    console.log('Auth token:', authToken); 
    if (!authToken || !authToken.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token, authentication denied' });
    }

    try {
        const token = authToken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token is expired' });
        }
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

export const restrict = roles => async (req, res, next) => {
    try {
        const user = await User.findById(req.userId) || await Doctor.findById(req.userId);

        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({ success: false, message: 'You are not authorized to access this resource' });
        }

        next();
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};
