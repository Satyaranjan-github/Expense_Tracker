import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import transactionUIReducer from "../features/transactionSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // 🎯 Only ONE API reducer needed!
        transactionUI: transactionUIReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});