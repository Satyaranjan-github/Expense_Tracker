import z from "zod";
import { CategoryType } from "../../types/category";

export const categoryValidationSchema = z.object({
    _id: z.string().optional(),
    user: z
        .string()
        .min(1, { message: "User ID reference is required" }),
    name:z.string().min(1, { message: "Category name is required" }),
    type: z.nativeEnum(CategoryType).refine(
        (val) => Object.values(CategoryType).includes(val),
        { message: "Invalid category type" }
    ),
})