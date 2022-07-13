import { NextFunction, Request, Response } from "express";
import AppError from "../../../shared/errors/AppError";
import { verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth'


export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Token not found')

  const [, token] = authHeader.split(' ');

  try {
    verify(token, authConfig.jwt.secret)
    return next();
  } catch (error) {
    throw new AppError('Invalid Token')
  }

}
