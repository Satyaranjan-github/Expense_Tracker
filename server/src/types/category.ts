import { Document, Types } from "mongoose";

export enum CategoryType{
    Expense = "Expense",
    Income = "Income"
}
export interface ICategory extends Document{
    user: Types.ObjectId | string;
    name: string;
    type: CategoryType;
    icon:string;
    createdAt: Date;
    updatedAt: Date
}
