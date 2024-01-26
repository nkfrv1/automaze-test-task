import { Schema } from "zod";
import { NextFunction, Request, Response } from "express";

const validate = (schema: Schema, resourse: "body" | "query" = "body") => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parse(req[resourse]);
            next();
        } catch (error) {
            res.status(400).json(error.flatten());
        }
    };
};

export default validate;
