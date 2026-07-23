import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate, Route, Routes } from 'react-router-dom'; // 🎯 Removed BrowserRouter import
import Dashboard from './Components/Dashboard';
import TransactionDetailsPage from './Components/TransactionDetailsView';
import TransactionsView from './features/Transactions';
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
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto transition-all duration-300">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionsView />} />
              <Route path="/transactions/:id" element={<TransactionDetailsPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </SignedIn>
    </>
  );
}