import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, X } from "lucide-react"; // Assuming you use lucide-react for icons
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { CategoryType, type ICategory } from "../../types/category";
import { categoryValidationSchema } from "./categorySchema";
import useCategoryOperations from "./useCategoryOperations";

interface CategoryFormModalProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    categoryData?: Partial<ICategory>;
}

const CategoryFormModal = ({ setOpenModal, categoryData }: CategoryFormModalProps) => {
    const { user, isLoaded, isSignedIn } = useUser();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ICategory>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(categoryValidationSchema as any),
        mode: "onChange",
        values: {
            ...categoryData,
            user: user?.id,
        } as ICategory
    });

    const { createCategory, updateCategory } = useCategoryOperations();

    const onSubmit = async (data: ICategory) => {
        if (categoryData?._id) {
            await updateCategory(data);
            setOpenModal(false);
        } else {
            await createCategory(data);
            setOpenModal(false);
        }
    };

    if (!isLoaded) {
        return (
            <div className="flex justify-center p-10">
                <span className="loading loading-spinner text-primary">Loading ...</span>
            </div>
        );
    }

    if (!isSignedIn) {
        return null;
    }

    const inputFieldClass = "w-full border border-orange-100 bg-orange-50/10 rounded-xl p-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all";
    const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";
    console.log("Error in form:", errors);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-xs p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-orange-100 animate-in fade-in zoom-in-95 duration-150">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 pb-4 border-b border-orange-50 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">
                                {categoryData?._id ? 'Update Category' : 'Add Category'}
                            </h3>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Define custom classification tags for your finances.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpenModal(false)}
                            className="text-gray-400 hover:text-orange-500 p-1.5 hover:bg-orange-50 rounded-xl transition-all cursor-pointer"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto divide-y divide-gray-50">
                        <div className="pt-0">
                            <label className={labelClass} htmlFor="name">Category Name</label>
                            <input
                                {...register("name")}
                                placeholder="e.g. Software Subscriptions, Groceries"
                                className={inputFieldClass}
                            />
                            {errors.name && (
                                <span className="text-xs text-red-500 font-medium block mt-1">{errors.name.message}</span>
                            )}
                        </div>
                        <div className="pt-4">
                            <label className={labelClass} htmlFor="type">Transaction Type</label>
                            <select {...register("type")} className={inputFieldClass}>
                                <option value="">Select Category Type</option>
                                {Object.values(CategoryType).map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            {errors.type && (
                                <span className="text-xs text-red-500 font-medium block mt-1">{errors.type.message}</span>
                            )}
                        </div>

                        <div className="pt-0">
                            <label className={labelClass} htmlFor="icon">Icon</label>
                            <input
                                {...register("icon")}
                                placeholder="Enter icon name"
                                className={inputFieldClass}
                            />
                            {errors.icon && (
                                <span className="text-xs text-red-500 font-medium block mt-1">{errors.icon.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="p-4 bg-orange-50/40 border-t border-orange-50 flex gap-3">
                        <button
                            type="button"
                            onClick={() => setOpenModal(false)}
                            className="flex-1 font-bold text-gray-500 border border-gray-200 bg-white hover:bg-gray-50 text-xs py-3 rounded-xl transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm shadow-orange-600/10 transition-all cursor-pointer"
                        >
                            <Save size={14} />
                            {categoryData?._id ? "Update Category" : "Save Category"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default CategoryFormModal;