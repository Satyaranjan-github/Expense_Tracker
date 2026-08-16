import { UserButton } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import type { NavItems } from '../types';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const location = useLocation();

    const navItems: NavItems[] = [
        { target: '/dashboard', match: '/dashboard', label: 'Dashboard' },
        { target: '/transactions/expense', match: '/transactions', label: 'Transactions' },
        { target: '/categories/expense', match: '/categories', label: 'Categories' },
        { target: '/budget', match: '/budget', label: 'Budget' },
    ];

    const isTransactions = location.pathname.startsWith('/transactions');
    const isCategories = location.pathname.startsWith('/categories');

    let subNavItems: { path: string; label: string }[] = [];
    if (isTransactions) {
        subNavItems = [
            { path: '/transactions/expense', label: 'Expense' },
            { path: '/transactions/income', label: 'Income' }
        ];
    } else if (isCategories) {
        subNavItems = [
            { path: '/categories/expense', label: 'Expense' },
            { path: '/categories/income', label: 'Income' }
        ];
    }

    const getLinkClass = (isActive: boolean, isMobile = false, isSubNav = false) => {
        const baseClass = isMobile
            ? "block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all"
            : "px-3 py-2 rounded-md text-sm font-medium transition-all";

        if (isSubNav) {
            return isActive
                ? `${baseClass} bg-orange-100 text-orange-700 shadow-sm cursor-default`
                : `${baseClass} text-gray-500 hover:text-orange-600 hover:bg-orange-50`;
        }

        return isActive
            ? `${baseClass} bg-orange-500 text-white shadow-sm cursor-default`
            : `${baseClass} text-gray-600 hover:bg-orange-50 hover:text-orange-600`;
    };

    return (
        <div className="sticky top-0 z-50 shadow-sm">
            <nav className="bg-white border-b border-orange-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-orange-600 tracking-tight">
                                Spenda<span className="text-gray-800">Wise</span>
                            </span>
                            <div className="hidden md:ml-8 md:flex md:space-x-4">
                                {navItems.map((item: NavItems) => {
                                    const isActive = location.pathname.startsWith(item.match);

                                    return (
                                        <NavLink
                                            key={item.label}
                                            to={item.target}
                                            className={getLinkClass(isActive)}
                                        >
                                            {item.label}
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <UserButton afterSignOutUrl="/" />
                        </div>

                        <div className="flex items-center md:hidden space-x-4">
                            <UserButton afterSignOutUrl="/" />
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-orange-500 hover:bg-orange-50 focus:outline-none"
                            >
                                {isOpen ? (
                                    <X />
                                ) : (
                                    <Menu />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden bg-white border-b border-orange-100 px-2 pt-2 pb-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                        {navItems.map((item) => {
                            const isActive = location.pathname.startsWith(item.match);

                            return (
                                <NavLink
                                    key={item.label}
                                    to={item.target}
                                    onClick={() => setIsOpen(false)}
                                    className={getLinkClass(isActive, true)}
                                >
                                    {item.label}
                                </NavLink>
                            );
                        })}
                    </div>
                )}
            </nav>

            {subNavItems.length > 0 && (
                <div className="bg-gray-50 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center space-x-4">
                            {subNavItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => getLinkClass(isActive, false, true)}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}