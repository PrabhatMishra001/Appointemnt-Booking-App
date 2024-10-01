import User from "../models/UserSchema.js"
import Booking from "../models/BookingSchema.js"
import Doctor from "../models/DoctorSchema.js"
export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: 'Successfully updated', data: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update', error: err.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Successfully deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete', error: err.message });
    }
};

// Get single user
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'No User found' });
        }
        res.status(200).json({ success: true, message: 'User found', data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error finding user', error: err.message });
    }
};

// Get all users
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, message: 'Users found', data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error finding users', error: err.message });
    }
};

export const getUserProfile = async (req, res) => {
    const userId = req.userId
    try {
        const user=await User.findById(userId)
        if(!user){
            return res.status(404).json({success:'false',message:'No User found'})
    }
    const{password,...rest} = user._doc
    res.status(200).json({success:'true',message:'Profile info is getting',data:{...rest}})
} 
    catch (err) {
    res.status(500).json({ success: false, message: 'Error finding user' });       

    }
};
export const getMyAppointments = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.userId });
        const doctorsIds = bookings.map(el => el.doctor.id);
        const doctors = await Doctor.find({ _id: { $in: doctorsIds } }).select('-password');
        res.status(200).json({ success: 'true', message: 'Appointments are getting', data: doctors });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error getting appointments', error: err.message });
    }
};
