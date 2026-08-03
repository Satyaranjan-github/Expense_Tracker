import { ClerkProvider } from '@clerk/clerk-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import LoadingModal from './common/utils/LoadingModal';
import { LoadingProvider } from './common/utils/LoadingProvider';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key in environment variables.");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
          <LoadingProvider>
            <App />
            <LoadingModal />
          </LoadingProvider>
        </BrowserRouter>
      </ClerkProvider>
    </Provider>
  </React.StrictMode>
);