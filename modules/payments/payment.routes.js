import { Router } from "express";

import { initiatePayment, getPaymentById } from "./payment.controller.js";

import { paymentWebhook } from "./payment.webhook.js";
import { protect } from "../../middlewares/auth.middlware.js";
import { checkOwnership } from "../../middlewares/ownership.middleware.js";
import Payment from './payment.model.js'

const paymentRouter = Router();

// Create payment intent
paymentRouter.post("/", protect, initiatePayment);

// Get payment info
paymentRouter.get(
  "/:id",
  protect,
  checkOwnership(async (req) => {
    const payment = await Payment.finById(req.params.id);
    return payment?.user;
  }),
  getPaymentById
);

// Stripe webhook
paymentRouter.post("/webhook", paymentWebhook);

export default paymentRouter;
