import type { ITransaction } from "../types/transaction";
import Transaction from "./transaction.model";

export const createTransaction = (data: ITransaction) => {
    return Transaction.create(data);
}

export const getTransactions = async () => {
    return await Transaction.find()
}

export const getTransactionById = (id: string) => {
    if (!id) throw new Error("Invalid transaction id");
    return Transaction.findById(id);
}

export const updateTransaction = (id: string, data: Partial<ITransaction>) => {
    if (!id) throw new Error("Invalid transaction id");

    return Transaction.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export const deleteTransaction = (id: string) => {
    if (!id) throw new Error("Invalid transaction id");
    return Transaction.findByIdAndDelete(id);
}