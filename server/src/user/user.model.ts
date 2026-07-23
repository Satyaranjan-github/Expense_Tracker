import { model, Schema } from "mongoose";
import { IUser } from "../types/user";

const userSchema = new Schema<IUser>({
    clerkId: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String },
}, { timestamps: true });

const User = model("User", userSchema)

export default User