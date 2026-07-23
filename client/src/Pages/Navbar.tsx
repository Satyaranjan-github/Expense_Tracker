import { UserButton } from '@clerk/clerk-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Map configuration profiles to match your explicit React Router DOM URL endpoints
    const navItems = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/transactions', label: 'Transactions' },
    ];

    // System hook mapping utility to handle active layout styles dynamically via router context
    const getLinkClass = (isActive: boolean, isMobile = false) => {
        const baseClass = isMobile
            ? "block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all"
            : "px-3 py-2 rounded-md text-sm font-medium transition-all";

        return isActive
            ? `${baseClass} bg-orange-500 text-white shadow-sm cursor-default`
            : `${baseClass} text-gray-600 hover:bg-orange-50 hover:text-orange-600`;
    };

    return (
        <nav className="bg-white border-b border-orange-100 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">

                    {/* Logo Branding Section */}
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-orange-600 tracking-tight">
                            Spenda<span className="text-gray-800">Wise</span>
                        </span>

                        {/* Desktop Navigation Links Container */}
                        <div className="hidden md:ml-8 md:flex md:space-x-4">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }: { isActive: boolean }) => getLinkClass(isActive)}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Desktop User Widget */}
                    <div className="hidden md:flex items-center space-x-4">
                        <UserButton afterSignOutUrl="/" />
                    </div>

                    {/* Mobile Menu Action Trigger Button */}
                    <div className="flex items-center md:hidden space-x-4">
                        <UserButton afterSignOutUrl="/" />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-orange-500 hover:bg-orange-50 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Navigation View Menu Overlay */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-orange-100 px-2 pt-2 pb-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)} // Smoothly collapses drawer frame on path update
                            className={({ isActive }: { isActive: boolean }) => getLinkClass(isActive, true)}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}