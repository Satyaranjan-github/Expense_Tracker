import { IUser } from "../types/user";
import User from "./user.model";

export const createUserIntoDB = async (data: IUser) => {
    return await User.create(data);
}

export const updateUserInDB = async (id: string, data: Partial<IUser>) => {
    return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export const getUserFromClerkId = async (clerkId: string) => {
    return await User.findOne({ clerkId: clerkId });
}