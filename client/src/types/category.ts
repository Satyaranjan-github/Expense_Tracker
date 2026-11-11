import type { IUser } from "./user";

export enum CategoryType{
    Expense = "Expense",
    Income = "Income"
}

export interface ICategory{
    _id?: string;
    user?: IUser | string;
    name: string;
    type?: CategoryType;
    icon?:string;
    createdAt?: Date;
    updatedAt?: Date
}
