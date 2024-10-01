import express from "express";
import { updateUser, deleteUser, getAllUser, getSingleUser, getUserProfile, getMyAppointments } from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifytoken.js";

const router = express.Router();

router.get('/:id', authenticate, restrict(['patient']), getSingleUser);
router.get('/', authenticate, restrict(['admin']), getAllUser);
router.put('/:id', authenticate, restrict(['patient']), updateUser);
router.delete('/:id', authenticate, restrict(['patient']), deleteUser);
router.get("/profile/me", authenticate, restrict(['patient']), getUserProfile); // Fixed this line
router.get('/appointment/my-appointments', authenticate, getMyAppointments);

export default router;
