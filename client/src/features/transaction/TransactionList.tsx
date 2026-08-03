import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetTransactionsQuery } from '../../api/transactionApi';
import { TransactionInput, type ITransaction } from '../../types/transaction';
import TransactionFormModal from './TransactionFormModal';

export default function TransactionList() {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const location = useLocation();
    const type = location.pathname.includes('expense') ? TransactionInput.Expense : TransactionInput.Income;

    const { data: transactions, isLoading } = useGetTransactionsQuery(type);

    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">

            <div className="flex items-center justify-between bg-white p-6 border border-orange-100 rounded-2xl shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Manage and inspect your logged financial items container rows.</p>
                </div>

                <button
                    onClick={() => setIsFormOpen(true)}
                    className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Transaction
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {transactions?.data.map((tx: ITransaction) => (
                        <div
                            key={tx._id}
                            onClick={() => navigate(`/transactions/${tx._id}`)}
                            className="bg-white border border-gray-100 hover:border-orange-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
                        >
                            <div className={`absolute top-0 left-0 right-0 h-1 ${tx.type === 'Income' ? 'bg-green-500' : 'bg-red-500'}`} />

                            <div className="space-y-3">
                                <div className="flex justify-between items-start gap-2">
                                    <h4 className="font-bold text-gray-800 text-base group-hover:text-orange-600 transition-colors line-clamp-1">
                                        {tx.title}
                                    </h4>
                                    <span className={`text-xs font-black tracking-wide px-2 py-0.5 rounded-md uppercase whitespace-nowrap ${tx.type === 'Income' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                        {tx.type === 'Income' ? '+' : '-'} ₹{tx.amount.toLocaleString('en-IN')}
                                    </span>
                                </div>
                                {tx.description && <p className="text-xs text-gray-500 line-clamp-2 min-h-[2rem]">{tx.description}</p>}
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-4 text-[11px] font-medium text-gray-400">
                                <div className="flex items-center gap-1.5">
                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 font-bold rounded-full uppercase tracking-wider text-[9px]">{tx.category}</span>
                                    <span className="uppercase font-bold text-gray-500">• {tx.paymentMethod}</span>
                                </div>
                                <span>{new Date(tx.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                            </div>
                        </div>
                    ))}
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
                            {/* Form implementation handles submission hooks directly */}
                            <TransactionFormModal setOpenModal={setIsFormOpen} transactionData={{ type }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}