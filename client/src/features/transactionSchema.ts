import { z } from 'zod';
import { PaymentMethod, Status, TransactionInput } from '../types/transaction';

export const transactionValidationSchema = z.object({
    _id: z.string().optional(),
    user: z
        .string()
        .min(1, { message: "User ID reference is required" }),
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100, { message: "Title cannot exceed 100 characters" })
        .trim(),
    type: z.nativeEnum(TransactionInput).refine(
        (val) => Object.values(TransactionInput).includes(val),
        { message: "Invalid transaction type" }
    ),
    paymentMethod: z.nativeEnum(PaymentMethod).refine(
        (val) => Object.values(PaymentMethod).includes(val),
        { message: "Invalid Payment Method" }
    ),
    amount: z
        .number()
        .positive({ message: "Amount must be greater than 0" }),
    category: z
        .string()
        .min(1, { message: "Category selection is required" })
        .trim(),
    date: z.coerce.date({
        message: "Date is required"
    }),
    description: z
        .string()
        .max(500, { message: "Description cannot exceed 500 characters" })
        .trim()
        .optional(),
    status: z.nativeEnum(Status).refine(
        (val) => Object.values(Status).includes(val),
        { message: "Invalid Status" }
    ),
});
