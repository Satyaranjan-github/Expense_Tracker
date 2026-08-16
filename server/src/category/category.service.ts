import { ICategory } from "../types/category";
import { getAutoIconWithAI } from "../utils/iconAI";
import Category from "./category.model";

export const createCategory = async (
    categoryData: ICategory, 
) => {
    const generatedIcon = await getAutoIconWithAI(categoryData.name);

    return await  Category.create({
        ...categoryData,
        icon: generatedIcon,
    });
};

export const getAllCategories = async({user, type}:Partial<ICategory>) =>{ 
    return await Category.find({
         user: user, 
         type: type 
        }).sort({ createdAt: -1 });
}

export const getCategoryById = async (id: string, userId: string) => 
{    
    if(!id) throw new Error("Invalid category id");
    await Category.findById({ _id: id, user: userId })
}

export const updateCategory = (id: string, data: Partial<ICategory>) => {
    if (!id) throw new Error("Invalid category id");

    return Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export const deleteCategory = (id: string) => {
    if (!id) throw new Error("Invalid category id");
    return Category.findByIdAndDelete(id);
}