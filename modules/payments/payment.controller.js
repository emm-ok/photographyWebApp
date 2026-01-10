import Payment from './payment.model.js'
import Booking from '../bookings/booking.model.js'

export const initiatePayment = async(req, res) => {
    const { bookingId, amount } = req.body

    const booking = await Booking.findById(bookingId);

    if(!booking){
        return res.status(404).json({ message: 'Booking not found' })
    }

    const payment = await Payment.create({
        user: req.user.id,
        booking: bookingId,
        amount,
        status: "PENDING",
    })

    res.status(201).json({
        success: true,
        paymentId: payment._id,
        message: 'Payment initiated',
    })
}

export const getPaymentById = async(req, res) => {
    const payment = await Payment.findById(req.params.id)
    .populate('booking')

    if(!payment){
        return res.status(404).json({ message: "Payment not found"})
    }

    res.json({
        success: true,
        payment,
    })
}