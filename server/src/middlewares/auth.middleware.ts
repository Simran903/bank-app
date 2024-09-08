
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError';
import { asyncHandler } from '../utils/asyncHandler';
import { PrismaClient, User } from '@prisma/client';

declare module 'express' {
  interface Request {
    user?: User;
  }
}

const prisma = new PrismaClient();

export const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
      return next(new ApiError({
        statusCode: 401,
        message: "Unauthorized request"
      }));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { userId: number };

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId
      }
    });

    if (!user) {
      return next(new ApiError({
        statusCode: 401,
        message: "Invalid access token"
      }));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError({
      statusCode: 401,
      message: "Invalid Access Token"
    }));
  }
});

