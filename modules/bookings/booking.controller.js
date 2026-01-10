import Booking from './booking.model.js'

export const createBooking = async(req, res) => {
    const booking = await Booking.create({
        ...req.body,
        user: req.user.id,
        status: "PENDING"
    });

    res.status(201).json({
        success: true,
        booking,
    })
}

export const getMyBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user.id }).populate('package');
    
    res.json({
        success: true,
        bookings,
    })
}


export const getBookingById = async(req, res) => {
    const booking = await Booking.findById(req.params.id)
    .populate('package')
    .populate('user', 'name email')

    if(!booking){
        return res.status(404).json({ message: 'Booking not found' })
    }

    res.json({ success: true, booking })
}

export const cancelBooking = async(req, res) => {
    const booking = await Booking.findById(req.params.id);

    if(booking.status === 'CONFIRMED') {
        return res.status(400).json({
            message: 'Confirmed bookings cannot be cancelled',
        })
    }

    booking.status = "CANCELLED"
    await booking.save();

    res.json({
        success: true,
        message: 'Booking cancelled'
    })
}


export const getAllBookings = async(req, res) => {
    const bookings = await Booking.find()
    .populate('user', "name email")
    .populate("package")

    res.json({
        success: true,
        count: bookings.length,
        bookings,
    })
}