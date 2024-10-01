import express from "express";
import { updateDoctor, deleteDoctor, getAllDoctor, getSingleDoctor, getDoctorProfile } from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifytoken.js";
import reviewRouter from './review.js';

const router = express.Router({ mergeParams: true });

router.get('/profile/me', authenticate, restrict(['doctor']), getDoctorProfile); // Place this before the dynamic id route

router.use('/:doctorId/reviews', reviewRouter);

router.get('/:id', getSingleDoctor);
router.get('/', getAllDoctor);
router.put('/:id', authenticate, restrict(['doctor']), updateDoctor);
router.delete('/:id', authenticate, restrict(['doctor']), deleteDoctor);

export default router;
