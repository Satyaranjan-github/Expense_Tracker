import { useUser } from "@clerk/clerk-react";
import * as Icons from "lucide-react";
import { ArrowDownCircle, ArrowUpCircle, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetCategoriesQuery } from "../../api/categoryApi";
import { CategoryType, type ICategory } from "../../types/category";
import CategoryFormModal from "./CategoryFormModal";

export default function CategoryList() {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const location = useLocation();
    const type = location.pathname.includes('expense') ? CategoryType.Expense : CategoryType.Income;

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
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Category
                </button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-3 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categories?.data.map((category: ICategory) => {
                        const IconComponent = (Icons[category.icon as keyof typeof Icons] as React.ElementType) || Icons.LayoutGrid;
                        return (
                            <div
                                key={category._id}
                                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-start gap-3.5">
                                        <div className="w-12 h-12 rounded-xl bg-gray-50/50 flex items-center justify-center shrink-0 border border-gray-100 text-gray-600">
                                            <IconComponent size={24} strokeWidth={2} />
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg leading-tight">{category.name}</h3>

                                            <div className="flex items-center gap-1.5 mt-2">
                                                {category.type === CategoryType.Income ? (
                                                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                                                        <ArrowUpCircle size={12} /> Income
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                                                        <ArrowDownCircle size={12} /> Expense
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                            title="Edit Category"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Category"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Card Footer: Timestamps */}
                                <div className="mt-auto pt-4 border-t border-gray-50 flex flex-wrap gap-2 justify-between items-center text-[11px] text-gray-400 font-medium">
                                    <span>
                                        Created {new Date(category.createdAt).toLocaleDateString()}
                                    </span>

                                    {category.updatedAt && (
                                        <span className="text-gray-300">
                                            Updated {new Date(category.updatedAt).toLocaleDateString()}
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
                            onClick={() => setIsFormOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-xl transition-all z-10"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="p-1">
                            <CategoryFormModal setOpenModal={setIsFormOpen} />
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}