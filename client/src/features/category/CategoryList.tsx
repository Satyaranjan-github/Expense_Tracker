import { useUser } from "@clerk/clerk-react";
import { ArrowDownCircle, ArrowUpCircle, Calendar, File, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetCategoriesQuery } from "../../api/categoryApi";
import LoadingModal from "../../common/utils/LoadingModal";
import { CategoryType, type ICategory } from "../../types/category";
import CategoryFormModal from "./CategoryFormModal";
import useCategoryOperations from "./useCategoryOperations";

export default function CategoryList() {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
    const location = useLocation();
    const type = location.pathname.includes('expense') ? CategoryType.Expense : CategoryType.Income;
    const { deleteCategory } = useCategoryOperations();

    const { user } = useUser()

    const { data: categories, isLoading } = useGetCategoriesQuery({ user: user?.id, type: type });

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between bg-white p-6 border border-orange-100 rounded-2xl shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Transaction Categories</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Define and manage custom classifications for your income and expenses.</p>
                </div>

                <button
                    onClick={() => setIsFormOpen(true)}
                    className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                    <Plus />
                    Add Category
                </button>
            </div>

            {isLoading && (
                <LoadingModal />
            )}

            {!categories?.data || categories.data.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-3">
                        <File />
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-1">No transactions found</h3>
                    <p className="text-xs text-gray-400 max-w-sm">
                        There are no recorded transactions to display. Try adjusting your filters or add a new transaction.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categories?.data.map((category: ICategory) => {
                        const isIncome = category.type === CategoryType.Income;

                        return (
                            <div
                                key={category._id}
                                className={`relative bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full overflow-hidden ${isIncome ? 'border-gray-100 hover:border-green-200' : 'border-gray-100 hover:border-red-200'
                                    }`}
                            >
                                <div className={`absolute top-0 left-0 right-0 h-1 ${isIncome ? 'bg-green-500' : 'bg-red-500'}`} />
                                <div className="flex justify-between items-start mb-5 mt-1">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${isIncome ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100'
                                            }`}>
                                            <span className="text-3xl leading-none" role="img" aria-label={category.name}>
                                                {category.icon}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <h3 className="font-bold text-gray-900 text-lg line-clamp-1 leading-none">
                                                {category.name}
                                            </h3>
                                            <div>
                                                {isIncome ? (
                                                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md">
                                                        <ArrowUpCircle size={12} strokeWidth={2.5} /> Income
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md">
                                                        <ArrowDownCircle size={12} strokeWidth={2.5} /> Expense
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                        <button
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                                            title="Edit Category"
                                            onClick={() => {
                                                setSelectedCategory(category);
                                                setIsFormOpen(true);
                                            }}
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                            title="Delete Category"
                                            onClick={() => deleteCategory(category._id as string)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={13} className="text-gray-300" />
                                        <span>
                                            {new Date(category.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                    {category.updatedAt && category.updatedAt !== category.createdAt && (
                                        <span className="text-gray-300 italic">
                                            Edited
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {isFormOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
                        <button
                            onClick={() => {
                                setIsFormOpen(false);
                                setSelectedCategory(null);
                            }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-xl transition-all z-10"
                        >
                            <X />
                        </button>
                        <div className="p-1">
                            <CategoryFormModal setOpenModal={setIsFormOpen}
                                categoryData={selectedCategory || { type }} />
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}