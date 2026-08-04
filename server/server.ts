import dotenv from 'dotenv';
dotenv.config();

import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import express, { type Request, type Response } from 'express';
import categoriesRoute from './src/category/category.route';
import { connectDB } from './src/config/db';
import transactionRoutes from './src/transaction/transaction.route';
import { ApiResponse } from './src/utils/ApiResponse';
import webhookRouter from "./src/utils/webhook.route";
import morgan from 'morgan';

connectDB();

const app = express()
const PORT = 5000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
}));

app.use(morgan('dev'));
app.use('/api', webhookRouter);

app.use(express.json())
app.use(clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY
}))

app.use((err: any, req: any, res: any, next: any) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("❌ Server Error Context Stack:", err.stack);
    
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        errors: err.errors || undefined 
    });
});

app.use("/api/transactions", transactionRoutes)
app.use("/api/categories", categoriesRoute)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json(
        new ApiResponse(true, "Server is running 🚀", {
            timestamp: new Date().toISOString(),
        })
    );
});

app.listen(PORT, () => {
    console.log(`
    ─────────────────────────────────────
    🚀 Server started successfully
    📡 Port      : ${PORT}
    🔗 URL       : http://localhost:${PORT}
    ─────────────────────────────────────
    `)
})