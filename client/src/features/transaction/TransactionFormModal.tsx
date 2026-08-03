import { useUser } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X } from "lucide-react";
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { PaymentMethod, Status, TransactionInput, type ITransaction } from '../../types/transaction';
import { transactionValidationSchema } from './transactionSchema';
import useTransactionOperations from './useTransactionOperations';

const TransactionFormModal = (
    { setOpenModal, transactionData }:
        {
            setOpenModal: Dispatch<SetStateAction<boolean>>,
            transactionData?: Partial<ITransaction>
        }
) => {
    const { user, isLoaded, isSignedIn } = useUser();

    console.log("Clerk State:", { isLoaded, isSignedIn, user });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } =
        useForm<ITransaction>({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            resolver: zodResolver(transactionValidationSchema as any),
            mode: "onChange",
            values: {
                ...transactionData,
                user: user?.id || ""
            } as ITransaction
        });
    const { createTransaction, updateTransaction } = useTransactionOperations()
    const { id } = useParams()
    const onSubmit = async (data: ITransaction) => {
        if (id) {
            await updateTransaction(data)
            setOpenModal(false)
        } else {
            await createTransaction(data)
            setOpenModal(false)
        }
    }

    useEffect(() => {
        if (transactionData) {

            reset({
                ...transactionData,
                date: transactionData?.date ? new Date(transactionData.date) : new Date(),
                user: user?.id || ""
            });
        }
    }, [reset, transactionData, user?.id])

    if (!isLoaded) {
        return (
            <div className="flex justify-center p-10">
                <span className="loading loading-spinner text-primary">Loading ...</span>
            </div>
        );
    }

    const inputFieldClass = "w-full border border-orange-100 bg-orange-50/10 rounded-xl p-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all";
    const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";
    console.log("Error->", errors)
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-xs p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-orange-100 animate-in fade-in zoom-in-95 duration-150">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 pb-4 border-b border-orange-50 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">
                                {id ? 'Update Transaction' : 'Add Transaction'}
                            </h3>
                            <p className="text-xs text-gray-400 mt-0.5">Log operational money stream movements variables.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpenModal(false)}
                            className="text-gray-400 hover:text-orange-500 p-1.5 hover:bg-orange-50 rounded-xl transition-all"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto divide-y divide-gray-50 ">

                        <div className="pt-0">
                            <label className={labelClass} htmlFor="title">Title</label>
                            <input
                                {...register("title")}
                                placeholder="e.g. Office Supplies"
                                className={inputFieldClass}
                            />
                            {errors.title &&
                                <span className="text-xs text-red-500 font-medium block mt-1">{errors.title.message}</span>
                            }
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <div>
                                <label className={labelClass} htmlFor="type">Transaction Type</label>
                                <select {...register("type")} className={inputFieldClass}>
                                    <option value="">Select Expense Type</option>
                                    {Object.values(TransactionInput).map((type) => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {errors.type &&
                                    <span className="text-xs text-red-500 font-medium block mt-1">{errors.type.message}</span>
                                }
                            </div>

                            <div>
                                <label className={labelClass} htmlFor="paymentMethod">Payment Method</label>
                                <select {...register("paymentMethod")} className={inputFieldClass}>
                                    <option value="">Select Payment Method</option>
                                    {Object.values(PaymentMethod).map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                {errors.paymentMethod &&
                                    <span className="text-xs text-red-500 font-medium block mt-1">{errors.paymentMethod.message}</span>
                                }
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <div>
                                <label className={labelClass} htmlFor="amount">Amount (INR)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">₹</span>
                                    <input
                                        {...register("amount", { valueAsNumber: true })}
                                        type="number"
                                        placeholder="0.00"
                                        className={`${inputFieldClass} pl-7`}
                                    />
                                </div>
                                {errors.amount &&
                                    <span className="text-xs text-red-500 font-medium block mt-1">{errors.amount.message}</span>
                                }
                            </div>

                            <div>
                                <label className={labelClass} htmlFor="date">Date</label>
                                <input
                                    {...register("date", {
                                        valueAsDate: true
                                    })}
                                    type='date'
                                    className={inputFieldClass}
                                />
                                {errors.date &&
                                    <span className="text-xs text-red-500 font-medium block mt-1">{errors.date.message}</span>
                                }
                            </div>
                        </div>

                        {/* Category Row Container */}
                        <div className="pt-4">
                            <label className={labelClass} htmlFor="category">Category</label>
                            <input
                                {...register("category")}
                                placeholder="e.g. Inventory, Utilities, Salary"
                                className={inputFieldClass}
                            />
                            {errors.category &&
                                <span className="text-xs text-red-500 font-medium block mt-1">{errors.category.message}</span>
                            }
                        </div>

                        <div className="pt-4">
                            <label className={labelClass} htmlFor="description">Description</label>
                            <textarea
                                {...register("description")}
                                rows={2}
                                placeholder="Provide extra analytical logs context data elements..."
                                className={`${inputFieldClass} resize-none`}
                            />
                            {errors.description &&
                                <span className="text-xs text-red-500 font-medium block mt-1">{errors.description.message}</span>
                            }
                        </div>

                        <div className="pt-4">
                            <label className={labelClass} htmlFor="status">Status</label>
                            <select {...register("status")} className={inputFieldClass}>
                                <option value="">Select Status</option>
                                {Object.values(Status).map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            {errors.status &&
                                <span className="text-xs text-red-500 font-medium block mt-1">{errors.status.message}</span>
                            }
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
                            {id ? "Update Transaction" : "Add Transaction"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default TransactionFormModal;