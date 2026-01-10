import Payment from './payment.model.js'
import Booking from '../bookings/booking.model.js'

export const paymentWebhook = async(req, res) => {
    // Stripe verification 
    const { paymentId, status } = req.body

    const payment = await Payment.findById(paymentId);

    if(!payment){
        return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = status
    await payment.save();

    if(status === 'SUCCESS'){
        await Booking.findByIdAndUpdate(payment.booking, {
            status: "CONFIRMED",
        })
    }

    res.json({ received: true });
}