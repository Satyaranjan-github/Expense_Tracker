import { Request, Response } from "express";
import { CategoryType } from "../types/category";
import { getUserFromClerkId } from "../user/user.service";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "./category.service";

export const createCategoryController = async (req: Request, res: Response) => {
    const data = req.body
    const user = await getUserFromClerkId(data.user as string);

    data.user = user?._id

    const result = await createCategory(data);
    return res.json({
        message: "Category created successfully",
        success: true,
        data: result
    })
}

export const getCategoriesController = async (req: Request, res: Response) => {
    const { user, type } = req.query as { user: string, type:  CategoryType };
    
    const userId = await getUserFromClerkId(user as string);
    const result = await getAllCategories({user:userId?._id,type});
    
    return res.json({
        message: "Categories fetched successfully",
        success: true,
        data: result
    })
}

export const getCategoryByIdController = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const data = req.body
    const user = await getUserFromClerkId(data.user as string);

    if(!user) throw new Error("User not found");

    const result = await getCategoryById(id, user?._id.toString());

    return res.json({
        message: "Category fetched successfully",
        success: true,
        data: result
    })
}

export const updateCategoryByController = async (req: Request, res: Response) => {
    const id = req.params.id as string
    const category = req.body
    const updatedCategory = await updateCategory(id, category)

    return res.json({
        success: true,
        message: "Category updated successfully",
        data: updatedCategory
    })
}

export const deleteCategoryByController = async (req: Request, res: Response) => {
    const id = req.params.id as string
    console.log("ID=>", id)
    const deletedCategory = await deleteCategory(id)
    console.log("Deleted category=>", deletedCategory)
    return res.json({
        message: "Category deleted successfully",
        success: true,
        data: deletedCategory
    })
}