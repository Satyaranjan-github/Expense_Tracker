import express from 'express';
import { handleClerkWebhook } from './webhook.controller';

const router = express.Router();

// NO 'protect' middleware here. The Webhook signature acts as the protection.
router.post(
    "/webhooks/clerk",
    express.raw({ type: 'application/json' }), // Required for svix verification
    handleClerkWebhook
);

export default router;