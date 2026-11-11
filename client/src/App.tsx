import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CategoryList from './features/category/CategoryList';
import TransactionDetailsPage from './features/transaction/TransactionDetailsView';
import TransactionList from './features/transaction/TransactionList';
import AuthPage from './Pages/AuthPage';
import Navbar from './Pages/Navbar';

export default function App() {
  return (
    <>
      <SignedOut>
        <AuthPage />
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-orange-50/30 flex flex-col antialiased font-sans">
          <Navbar />
          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto transition-all duration-300">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions/expense" element={<TransactionList />} />
              <Route path="/transactions/expense/:id" element={<TransactionDetailsPage />} />
              <Route path="/transactions/income" element={<TransactionList />} />
              <Route path="/transactions/income/:id" element={<TransactionList />} />
              <Route path="/categories/expense" element={<CategoryList />} />
              <Route path="/categories/income" element={<CategoryList />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </SignedIn>
    </>
  );
}