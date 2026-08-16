import { ArrowLeft, Calendar, CheckCircle2, CreditCard, Edit3, FileText, Receipt, Tag, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTransactionByIdQuery } from '../../api/transactionApi';
import { Status, TransactionInput, type ITransaction } from '../../types/transaction';
import TransactionFormModal from './TransactionFormModal';
import useTransactionOperations from './useTransactionOperations';

export default function TransactionDetailsPage() {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const { id: transactionId } = useParams()
    const navigate = useNavigate();
    const { data: transaction, isLoading, isError } = useGetTransactionByIdQuery(transactionId)
    const { deleteTransaction } = useTransactionOperations()

    if (isLoading) {
        return (
            <div className="flex justify-center p-10">
                <span className="loading loading-spinner text-primary">Loading transaction details...</span>
            </div>
        );
    }

    const transactionData: ITransaction = transaction?.data
    const isIncome = transactionData?.type === TransactionInput.Income;

    if (isError || !transaction) {
        return <div className="p-10 text-red-500">Transaction not found!</div>;
    }

    return (
        <div className="w-full bg-[#FCFBF7] border border-amber-900/10 rounded-2xl shadow-xs overflow-hidden relative font-sans text-neutral-800">
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#78350f_1px,transparent_1px)]" />
            <div className="p-6 pb-2 relative z-10 flex justify-between items-center">
                <button
                    onClick={() => navigate('/transactions/expense')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors duration-150 cursor-pointer"
                >
                    <ArrowLeft size={14} />
                    Back
                </button>
                <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    <Receipt size={13} className="text-neutral-300" />
                    Voucher No:
                </div>
            </div>

            <div className="px-6 pt-4 pb-8 text-center relative z-10">
                <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border ${isIncome
                    ? 'bg-emerald-50/60 text-emerald-800 border-emerald-100'
                    : 'bg-rose-50/60 text-rose-800 border-rose-100'
                    }`}>
                    {transactionData?.type} Account Log
                </span>

                <h2 className={`text-4xl font-extrabold tracking-tight mt-5 font-mono ${isIncome ? 'text-emerald-700' : 'text-neutral-900'}`}>
                    {isIncome ? '+' : '-'} ₹{transactionData?.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </h2>
                <h1 className="text-base font-bold text-neutral-600 mt-2 max-w-xs mx-auto italic">
                    "{transactionData?.title}"
                </h1>
            </div>

            <div className="px-6 flex items-center justify-between gap-1 opacity-30 select-none pointer-events-none">
                <div className="w-full border-b border-dashed border-neutral-400" />
            </div>

            <div className="p-6 space-y-4 text-sm relative z-10">
                <div className="flex justify-between items-baseline group">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                        <Calendar size={13} /> Created At
                    </span>
                    <span className="font-mono font-bold text-neutral-700">
                        {new Date(transactionData?.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                </div>

                {/* Method Mode Row */}
                <div className="flex justify-between items-baseline group">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                        <CreditCard size={13} /> Payment Method
                    </span>
                    <span className="font-bold text-neutral-700 uppercase tracking-wide text-xs">
                        {transactionData?.paymentMethod}
                    </span>
                </div>

                {/* Category Scope Row */}
                <div className="flex justify-between items-baseline group">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                        <Tag size={13} /> Transaction Category
                    </span>
                    <span className="font-bold text-amber-900/80 underline decoration-amber-950/20 underline-offset-4 decoration-2 capitalize">
                        {transactionData?.category}
                    </span>
                </div>

                <div className="flex justify-between items-baseline group">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 size={13} /> Audit Clearance
                    </span>
                    <span className={`font-mono text-xs font-extrabold uppercase ${transactionData?.status === Status.Cancelled ? 'text-rose-600' : 'text-emerald-700'
                        }`}>
                        // {transactionData?.status || 'N/A'}
                    </span>
                </div>

                {transactionData?.description && (
                    <div className="pt-3 border-t border-neutral-200/60 space-y-1.5">
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                            <FileText size={13} /> Description
                        </span>
                        <p className="text-xs text-neutral-500 leading-relaxed font-medium bg-gray-100 border border-neutral-200/40 p-3 rounded-lg block">
                            {transactionData?.description}
                        </p>
                    </div>
                )}
            </div>

            <div className="border-t border-neutral-200/60 bg-neutral-50 p-4 px-6 flex items-center gap-3 relative z-10">
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl shadow-xs transition-colors duration-150 cursor-pointer"
                >
                    <Edit3 size={13} />
                    Update Transaction
                </button>
                <button
                    onClick={() => deleteTransaction(transactionData._id as string)}
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-neutral-200 text-neutral-500 hover:text-rose-600 hover:bg-rose-50/50 hover:border-rose-100 text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-150 cursor-pointer"
                >
                    <Trash2 size={13} />
                    Delete Statement
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-xl transition-all z-10"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <div className="p-1">
                            {/* Form implementation handles submission hooks directly */}
                            <TransactionFormModal transactionData={transactionData} setOpenModal={setIsFormOpen} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}