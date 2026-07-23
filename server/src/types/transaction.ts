import type { Document, Types } from "mongoose";

export enum Status {
    Completed = "Completed",
    Pending = "Pending",
    Cancelled = "Cancelled",
}

export enum TransactionInput {
    Expense = "Expense",
    Income = "Income"
}

export enum PaymentMethod {
    Cash = "Cash",
    Card = "Card",
    Online = "Online",
    UPI = "UPI",
    BankTransfer = "Bank Transfer",
}

export interface ITransaction extends Document {
    user: Types.ObjectId | string;
    title: string;
    type: TransactionInput;
    paymentMethod: PaymentMethod;
    amount: number;
    category: string;
    date: Date;
    description?: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}