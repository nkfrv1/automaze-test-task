import { NextFunction, Request, Response } from "express";
import ClientError from "../exceptions/client-error";

const handleError = (
    err: Error | ClientError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ClientError) {
        return res.status(err.status).json({ message: err.message });
    }
    res.status(500).json({ message: "Unexpected error has occured " });
};

export default handleError;
