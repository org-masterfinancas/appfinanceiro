import { Request, Response, NextFunction } from 'express';

function somentePost(req: Request, res: Response, next: NextFunction) {
    if (req.method !== 'POST') {
        res.set('Allow', 'POST');
        return res.status(405).json({
            error: `Método ${req.method} não permitido. Use POST para esta rota.`
        });
    }
    next();
}

export default somentePost;
