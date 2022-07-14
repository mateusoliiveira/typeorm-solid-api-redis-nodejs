import { NextFunction, Request, Response } from "express";
import AppError from "../../../shared/errors/AppError";
import { JwtPayload, verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth'

interface ITokenPayload {
  iat: string;
  exp: number;
  sub: string;
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError('Token not found')
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret)
    const { sub } = decoded as ITokenPayload
    request.user = {
      id: sub
    }
    return next();
  } catch (error) {
    throw new AppError('Invalid Token')
  }

}
