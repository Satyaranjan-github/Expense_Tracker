import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation, useDeleteCategoryMutation, useLazyGetCategoriesQuery, useUpdateCategoryMutation } from "../../api/categoryApi";
import useLoading from "../../common/hooks/useLoading";
import type { ICategory } from "../../types/category";
import { clearSelectedCategory, updateCategoryInList } from "./categorySlice";

function useCategoryOperations() {
    const Loading = useLoading();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [createCategoryMutation, { isLoading: isCreatingCategory }] = useCreateCategoryMutation();
    const [triggerFetchById, {
        isLoading: isLoadingSingle
    }] = useLazyGetCategoriesQuery();
    const [updateCategoryMutation, { isLoading: isUpdatingCategory }] = useUpdateCategoryMutation()
    const [deleteCategoryMutation, { isLoading: isDeletingCategory }] = useDeleteCategoryMutation()

    const getCategoryById = useCallback(async (id: string) => {
        if (isLoadingSingle) return false;

        try {
            if (id) {
                return await triggerFetchById(id).unwrap();
            }
        } catch (err) {
            console.error("Error fetching category:", err);
        }
    }, [isLoadingSingle, triggerFetchById]);

    const createCategory = async (data: ICategory) => {
        if (isCreatingCategory) return false

        const isLoadingModal = Loading({ message: "Creating Category..." });

        try {
            await createCategoryMutation(data).unwrap();
            isLoadingModal()
            return true;
        } catch (error) {
            console.log("Error in Creating Category", error);
        }
    }

    const updateCategory = async (data: ICategory) => {
        if (isUpdatingCategory) return false

        const isLoadingModal = Loading({ message: "Updating Category..." });

        try {
            const res = await updateCategoryMutation(data).unwrap();
            isLoadingModal()
            if (res.success) {
                dispatch(updateCategoryInList(res.data));
                dispatch(clearSelectedCategory());
                return true;
            }
        }
        catch (error) {
            console.log("Error in updating Category", error)
        }
    }

    const deleteCategory = async (id: string) => {
        if (isDeletingCategory) return false

        const isLoadingModal = Loading({ message: "Deleting Category..." });

        try {
            await deleteCategoryMutation(id).unwrap()
            isLoadingModal()
            navigate(-1)
            return true
        } catch (error) {
            console.log("Error in deleting Category", error)
        }
    }

    return {
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory
    }
}

export default useCategoryOperations
