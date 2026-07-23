import { Request, Response } from 'express';
import { Webhook } from 'svix';
import { IUser } from '../types/user';
import { createUserIntoDB, updateUserInDB } from '../user/user.service';

export const handleClerkWebhook = async (req: Request, res: Response) => {
    const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!SIGNING_SECRET) {
        return res.status(500).json({ success: false, message: "Missing CLERK_WEBHOOK_SECRET env variable." });
    }

    // 1. Get the Svix headers injected by Clerk
    const svix_id = req.headers["svix-id"] as string;
    const svix_timestamp = req.headers["svix-timestamp"] as string;
    const svix_signature = req.headers["svix-signature"] as string;

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).json({ success: false, message: "Missing svix headers." });
    }

    // 2. Extract the raw body payload
    // If you used Option A in Step 2, req.body is a Buffer:
    const payload = (req.body as Buffer).toString();

    // (If you used Option B instead, use: const payload = (req as any).rawBody.toString();)

    // 3. Initialize Svix Webhook verification
    const wh = new Webhook(SIGNING_SECRET);
    let evt: any;

    try {
        evt = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err: any) {
        console.error("Webhook verification failed:", err.message);
        return res.status(400).json({ success: false, message: "Invalid signature payload." });
    }

    // 4. Look for the user.created payload event structure
    const eventType = evt.type;

    if (eventType === "user.created") {
        const { id, first_name, last_name, email_addresses, createdAt } = evt.data;
        const fullName = `${first_name || ''} ${last_name || ''}`.trim();
        const newUser = {
            clerkId: id as string,
            name: fullName || 'Clerk User',
            email: email_addresses[0]?.email_address,
            createdAt: createdAt,
        };

        try {
            const dbUser = await createUserIntoDB(newUser as IUser);
            return res.status(201).json({
                success: true,
                data: dbUser,
                message: "User created successfully",
            });
        } catch (error: any) {
            console.error("❌ CRASHED INSIDE USER.CREATED BLOCK:", error.message);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    if (eventType === "user.updated") {
        console.log("eventType", eventType)
        const { id, first_name, last_name, updatedAt } = evt.data;
        console.log("evt data=>", evt.data)
        const newUser = {
            clerkId: id as string,
            name: `${first_name || ''} ${last_name || ''}`.trim(),
            updatedAt: updatedAt
        };

        try {
            const dbUser = await updateUserInDB(id, newUser as IUser);
            console.log("dbUser", dbUser)
            return res.status(201).json({
                success: true,
                data: dbUser,
                message: "User updated successfully",
            });
        }
        catch (error: any) {
            console.error("❌ CRASHED INSIDE USER.UPDATED BLOCK:", error.message);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // Fallback return statement for unhandled hook variations (like user.updated)
    return res.status(200).json({ success: true, message: "Webhook received successfully." });
};