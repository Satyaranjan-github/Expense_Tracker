import { Document } from "mongoose";

export interface IUser extends Document {
    clerkId: string;
    name?: string;
    email: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date;
}