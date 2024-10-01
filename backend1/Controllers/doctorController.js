

import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js"; // Ensure Booking model is imported


export const getDoctorProfile = async (req, res) => {
    const doctorId = req.userId;
    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        const { password, ...rest } = doctor._doc;
        const appointments = await Booking.find({ doctor: doctorId });
        res.status(200).json({ success: true, message: 'Profile info is retrieved', data: { ...rest, appointments } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error finding doctor', error: err.message });
    }
};
 

export const updateDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: 'Successfully updated', data: updatedDoctor });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update', error: err.message });
    }
};

// Delete Doctor
export const deleteDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        await Doctor.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Successfully deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete', error: err.message });
    }
};

// Get single Doctor
export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id).select('-password');
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'No Doctor found' });
    }
    res.status(200).json({ success: true, message: 'Doctor found', data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error finding Doctor', error: err.message });
  }
};
// Get all Doctors
export const getAllDoctor = async (req, res) => {
  try {
    const query = req.query.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { specialization: { $regex: query, $options: 'i' } }
        ]
      });
    } else {
      doctors = await Doctor.find();
    }

    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error finding Doctors", error });
  }
};