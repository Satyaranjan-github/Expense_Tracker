import { createSlice } from "@reduxjs/toolkit";
import type { ITransaction } from "../../types/transaction";

interface TransactionState {
    transactions: ITransaction[]
    selectedTransaction: ITransaction | null
}
const initialState: TransactionState = {
    transactions: [],
    selectedTransaction: null,
}

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        setTransactions: (state, action) => {
            state.transactions = action.payload;
        },
        setSelectedTransaction: (state, action) => {
            state.selectedTransaction = action.payload;
        },
        clearSelectedTransaction: (state) => {
            state.selectedTransaction = null;
        },
        updateTransactionInList: (state, action) => {
            const updatedMed = action.payload;
            state.transactions = state.transactions.map((m) =>
                m._id === updatedMed._id ? updatedMed : m
            );
        }
    }
})

export const { setSelectedTransaction, clearSelectedTransaction, setTransactions, updateTransactionInList } = transactionSlice.actions
export default transactionSlice.reducer