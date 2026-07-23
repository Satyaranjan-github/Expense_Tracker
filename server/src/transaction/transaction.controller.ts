import { Request, Response } from "express";
import { getUserFromClerkId } from "../user/user.service";
import { createTransaction, deleteTransaction, getTransactionById, getTransactions, updateTransaction } from "./transaction.service";

export const createTransactionController = async (req: Request, res: Response) => {
    const data = req.body
    const user = await getUserFromClerkId(data.user as string);

    data.user = user?._id

    const result = await createTransaction(data);
    return res.json({
        message: "Transaction created successfully",
        success: true,
        data: result
    })
}

export const getTransactionsController = async (req: Request, res: Response) => {
    const result = await getTransactions();
    return res.json({
        message: "Transactions fetched successfully",
        success: true,
        data: result
    })
}

export const getTransactionByIdController = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const result = await getTransactionById(id);

    return res.json({
        message: "Transaction fetched successfully",
        success: true,
        data: result
    })
}

export const updateTransactionByController = async (req: Request, res: Response) => {
    const id = req.params.id as string
    const transaction = req.body
    const updatedTransaction = await updateTransaction(id, transaction)

    return res.json({
        success: true,
        message: "Transaction updated successfully",
        data: updatedTransaction
    })
}

export const deleteTransactionByController = async (req: Request, res: Response) => {
    const id = req.params.id as string
    console.log("ID=>", id)
    const deletedTransaction = await deleteTransaction(id)
    console.log("Deleted transaction=>", deletedTransaction)
    return res.json({
        message: "Transaction deleted successfully",
        success: true,
        data: deletedTransaction
    })
}