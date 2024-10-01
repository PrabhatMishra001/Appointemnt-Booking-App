import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import mongoose from "mongoose";
import bookingRoute from "./Routes/booking.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true,
};

app.get("/", (req, res) => {
    res.send("API is working");
});

mongoose.set("strictQuery", false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_LOCAL_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB database is connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute); // Corrected route for doctors
app.use('/api/v1/reviews', reviewRoute); // Corrected route for reviews
app.use('/api/v1/bookings', bookingRoute);

app.listen(port, () => {
    connectDB();
    console.log("Server is running on port " + port);
});
