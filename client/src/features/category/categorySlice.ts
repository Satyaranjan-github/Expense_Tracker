import { createSlice } from "@reduxjs/toolkit";
import type { ICategory } from "../../types/category";

interface CategoryState {
    categories: ICategory[]
    selectedCategory: ICategory | null
}
const initialState: CategoryState = {
    categories: [],
    selectedCategory: null,
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        clearSelectedCategory: (state) => {
            state.selectedCategory = null;
        },
        updateCategoryInList: (state, action) => {
            const updatedMed = action.payload;
            state.categories = state.categories.map((m) =>
                m._id === updatedMed._id ? updatedMed : m
            );
        }
    }
})

export const { setSelectedCategory, clearSelectedCategory, setCategories, updateCategoryInList } = categorySlice.actions
export default categorySlice.reducer