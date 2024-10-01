import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Get all reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('user', 'name photo');
        res.status(200).json({ success: true, message: 'Successful', data: reviews });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Not Found', error: err.message });
    }
};

// Create a review
export const createReview = async (req, res) => {
    if (!req.body.doctor) req.body.doctor = req.params.doctorId;
    if (!req.body.user) req.body.user = req.params.userId;

    const newReview = new Review(req.body);
    try {
        const savedReview = await newReview.save();
        await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push: { reviews: savedReview._id }
        }, { new: true });  // Ensure the new document is returned after update
        res.status(200).json({ success: true, message: 'Review submitted', data: savedReview });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
