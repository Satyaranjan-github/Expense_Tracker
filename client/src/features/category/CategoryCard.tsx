import { ArrowDownCircle, ArrowUpCircle, Calendar, Clock, ImageIcon, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { CategoryType, type ICategory } from '../../types/category';

// Assuming you have a date formatter utility, or you can use this simple one:
const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

export default function CategoryCard({ category }: { category: ICategory }) {

    const [imageError, setImageError] = useState(false);

    return (
        <div className="group flex flex-row items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">

            {/* Left side: Icon and Details */}
            <div className="flex items-center gap-4">

                {/* Category Icon Container */}
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gray-50 border border-gray-200 rounded-full overflow-hidden">
                    {category.icon && !imageError ? (
                        <img
                            src={category.icon}
                            alt={`${category.name} icon`}
                            className="w-7 h-7 object-contain"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <ImageIcon size={24} className="text-gray-400" />
                    )}
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2.5">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">
                            {category.name}
                        </h3>

                        {category.type === CategoryType.Income ? (
                            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                <ArrowUpCircle size={12} strokeWidth={2.5} /> Income
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                <ArrowDownCircle size={12} strokeWidth={2.5} /> Expense
                            </span>
                        )}
                    </div>

                    {/* Timestamps */}
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                            <Calendar size={12} className="text-gray-400" />
                            Created: {formatDate(category.createdAt)}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} className="text-gray-400" />
                            Updated: {formatDate(category.updatedAt)}
                        </span>
                    </div>

                </div>
            </div>

            {/* Right side: Action Buttons */}
            <div className="flex items-center gap-1.5 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                    className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    title="Edit Category"
                >
                    <Pencil size={18} />
                </button>
                <button
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Category"
                >
                    <Trash2 size={18} />
                </button>
            </div>

        </div>
    );
}