import { model, Schema } from "mongoose";
import { PaymentMethod, Status, TransactionInput, type ITransaction } from "../types/transaction";

const TransactionSchema = new Schema<ITransaction>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    type: {
        type: String,
        enum: TransactionInput, required: true
    },
    paymentMethod: { type: String, enum: PaymentMethod },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: Status
    },
}, { timestamps: true });

const Transaction = model("Transaction", TransactionSchema);

export default Transaction;