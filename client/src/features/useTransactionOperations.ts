import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateTransactionMutation, useDeleteTransactionMutation, useLazyGetTransactionsQuery, useUpdateTransactionMutation } from "../api/transactionApi";
import useLoading from "../hooks/useLoading";
import type { ITransaction } from "../types/transaction";
import { clearSelectedTransaction, updateTransactionInList } from "./transactionSlice";

function useTransactionOperations() {
    const Loading = useLoading();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [createTransactionMutation, { isLoading: isCreatingTransaction }] = useCreateTransactionMutation();
    const [triggerFetchById, {
        isLoading: isLoadingSingle
    }] = useLazyGetTransactionsQuery();
    const [updateTransactionMutation, { isLoading: isUpdatingTransaction }] = useUpdateTransactionMutation()
    const [deleteTransactionMutation, { isLoading: isDeletingTransaction }] = useDeleteTransactionMutation()

    const getTransactionById = useCallback(async (id: string) => {
        if (isLoadingSingle) return false;

        try {
            if (id) {
                return await triggerFetchById(id).unwrap();
            }
        } catch (err) {
            console.error("Error fetching transaction:", err);
        }
    }, [isLoadingSingle, triggerFetchById]);

    const createTransaction = async (data: ITransaction) => {
        if (isCreatingTransaction) return false

        const isLoadingModal = Loading({ message: "Creating Transactions..." });

        try {
            await createTransactionMutation(data).unwrap();
            isLoadingModal()
            return true;
        } catch (error) {
            console.log("Error in Creating Transaction", error);
        }
    }

    const updateTransaction = async (data: ITransaction) => {
        if (isUpdatingTransaction) return false

        const isLoadingModal = Loading({ message: "Updating Transaction..." });

        try {
            const res = await updateTransactionMutation(data).unwrap();
            isLoadingModal()
            if (res.success) {
                dispatch(updateTransactionInList(res.data));
                dispatch(clearSelectedTransaction());
                return true;
            }
        }
        catch (error) {
            console.log("Error in updating Transaction", error)
        }
    }

    const deleteTransaction = async (id: string) => {
        if (isDeletingTransaction) return false

        const isLoadingModal = Loading({ message: "Deleting Transaction..." });

        try {
            await deleteTransactionMutation(id).unwrap()
            isLoadingModal()
            navigate(-1)
            return true
        } catch (error) {
            console.log("Error in deleting Transaction", error)
        }
    }

    return {
        getTransactionById,
        createTransaction,
        updateTransaction,
        deleteTransaction
    }
}

export default useTransactionOperations
