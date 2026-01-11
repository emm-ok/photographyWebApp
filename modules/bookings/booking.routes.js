import { Router } from 'express';

import {
    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking,
    getAllBookings,
    getBookingDate,
} from './booking.controller.js'

import { protect } from '../../middlewares/auth.middlware.js'
import { allowRoles } from "../../middlewares/role.middleware.js"
import { ROLES } from '../../constants/roles.js';
import { checkOwnership } from '../../middlewares/ownership.middleware.js';
import Booking from './booking.model.js'

const bookingRouter = Router();

// Client
bookingRouter.post('/', protect, allowRoles(ROLES.CLIENT), createBooking);
bookingRouter.get('/me', protect, allowRoles(ROLES.CLIENT), getMyBookings);

// View booking
bookingRouter.get(
    '/:id', 
    protect, 
    checkOwnership(async (req) => {
        const booking = await Booking.finById(req.params.id);
        return booking?.user;
    }),
    getBookingById
);

// Cancel Booking (client only, own booking)
bookingRouter.patch(
    '/:id/cancel', 
    protect, 
    allowRoles(ROLES.CLIENT), 
    checkOwnership(async (req) => {
        const booking = await Booking.finById(req.params.id);
        return booking?.user;
    }),
    cancelBooking
);
// GET BOOKING DATES
bookingRouter.get(
    '/dates', 
    protect, 
    allowRoles(ROLES.CLIENT), 
    getBookingDate
)

// Admin
bookingRouter.get('/', protect, allowRoles(ROLES.ADMIN), getAllBookings);


export default bookingRouter;