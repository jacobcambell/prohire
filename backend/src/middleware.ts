import Express, { Request, Response } from 'express'

export const adminAuth = (req: Request, res: Response, next) => {
    if (req.headers.admin_password === process.env.ADMIN_PASSWORD) {
        next();
    }
    else {
        return res.sendStatus(400);
    }
}