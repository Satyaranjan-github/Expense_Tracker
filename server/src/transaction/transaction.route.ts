import Router from "express";
import { validateBody } from "../utils/validateBody";
import { createTransactionController, deleteTransactionByController, getTransactionByIdController, getTransactionsController, updateTransactionByController } from "./transaction.controller";
import { transactionValidationSchema } from "./transaction.validation";

const router = Router()

router
.post("/create-transaction", validateBody(transactionValidationSchema), createTransactionController)
    .get("/get-transactions", getTransactionsController)
    .get("/:id", getTransactionByIdController)
    .patch("/:id/update", validateBody(transactionValidationSchema), updateTransactionByController)
    .patch("/:id/delete", deleteTransactionByController)

export default router