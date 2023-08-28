import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import IDecodedToken from '../models/interfaces/IDecodedToken';
import ICustomRequest from '../models/interfaces/ICustomRequest';

export const authenticateJWT = (req: ICustomRequest, res: Response, next: NextFunction) => {
    // Extract the token from the header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    const token = authHeader.split(' ')[1]; // "Bearer <token> format"

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decodedToken: any) => {
        if (err) {
            return res.status(403).json({message: 'Forbidden'});
        }
        
        const userPayload = decodedToken as IDecodedToken;
        req.userId = userPayload?.id;

        next();
    })
}