// src/app/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        prepareHeaders: async (headers) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const clerk = (window as any).Clerk;
            if (clerk?.session) {
                const token = await clerk.session.getToken();
                if (token) headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Transactions',"Category"], // Define all global tags here
    endpoints: () => ({}), // Leave this completely empty!
});