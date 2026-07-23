import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/ExpenseTracker");

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        // Connection events
        mongoose.connection.on("error", (err) => {
            console.error(`❌ MongoDB Error: ${err.message}`);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("⚠️  MongoDB Disconnected");
        });

    } catch (error: any) {
        console.error(`❌ MongoDB Connection Failed: ${error.message}`);
        process.exit(1);                           // stop server if DB fails
    }
};