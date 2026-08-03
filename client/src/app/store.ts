import { configureStore } from '@reduxjs/toolkit';
import categoryUIReducer from "../features/category/categorySlice";
import transactionUIReducer from "../features/transaction/transactionSlice";
import { apiSlice } from './apiSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // 🎯 Only ONE API reducer needed!
        transactionUI: transactionUIReducer,
        categoryUI: categoryUIReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});