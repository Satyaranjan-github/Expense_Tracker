export default function Dashboard() {
    return (
        <div className="space-y-6 animate-in fade-in duration-300">

            {/* 1. HERO GREETING SECTION */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Financial Overview</h2>
                <p className="text-sm text-gray-500 mt-0.5">Here is an overview of your money stream operations balances.</p>
            </div>

            {/* 2. ANALYTICS KPI SCORECARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Balance Card */}
                <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between group hover:border-orange-200 transition-all">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Net Balance</span>
                        <div className="p-2 bg-orange-50 rounded-xl text-orange-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className={`text-2xl font-black text-red-600`}>
                            ₹2000
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-1">Available spending limits balance</p>
                    </div>
                </div>

                {/* Total Income Card */}
                <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-green-200 transition-all">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Inflow</span>
                        <div className="p-2 bg-green-50 rounded-xl text-green-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-black text-green-600">
                            + ₹3000
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-1">Total incoming earnings cashpool</p>
                    </div>
                </div>

                {/* Total Expenses Card */}
                <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-red-200 transition-all">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Outflow</span>
                        <div className="p-2 bg-red-50 rounded-xl text-red-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-black text-red-600">
                            - ₹5000
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-1">Total processed charges outflow</p>
                    </div>
                </div>

            </div>

            {/* 3. DUAL GRID: RECENT TRANSACTIONS PREVIEW TABLE & INSIGHTS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Ledger Feed List */}
                <div className="lg:col-span-2 bg-white border border-orange-100 rounded-2xl p-6 shadow-sm space-y-4">
                    <div>
                        <h4 className="font-bold text-gray-900 text-base">Recent Activities</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Your latest transaction logs updates summary snapshot.</p>
                    </div>
                </div>

                {/* Mini Smart Insight Recommendation Card */}
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
                    <div className="space-y-2">
                        <span className="text-[10px] font-black tracking-widest uppercase bg-white/20 px-2.5 py-1 rounded-full w-max block">
                            Smart Budgets
                        </span>
                        <h4 className="text-lg font-bold tracking-tight mt-3">Need to inspect full tracking metrics?</h4>
                        <p className="text-xs text-orange-50/80 leading-relaxed font-medium">
                            Head into the Transactions management window pane to register elements records or modify layout sets dynamically.
                        </p>
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-6 flex items-center justify-between text-xs font-semibold text-white/90">
                        <span>SpendaWise Tracker Engine</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

            </div>

        </div>
    );
}