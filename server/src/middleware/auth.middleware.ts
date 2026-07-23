import { getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";

export const protect = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const auth = getAuth(req);

    if (!auth.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    next();
};