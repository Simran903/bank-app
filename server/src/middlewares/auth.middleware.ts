
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError';
import { asyncHandler } from '../utils/asyncHandler';
import { PrismaClient } from '@prisma/client';

//TODO: add user type
declare module 'express' {
  interface Request {
    user?: any;
  }
}

const prisma = new PrismaClient();

export const verifyJWT = asyncHandler(async (req: Request, res: Response, next: () => void) => {
  try {
    const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError({
        statusCode: 401,
        message: "Unauthorized request"
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { id: number };

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken?.id
      }
    });

    if (!user) {
      throw new ApiError({
        statusCode: 401,
        message: "Invalid access token"
      });
    }

    req.user = user;
    next();

  } catch (error) {
    throw new ApiError({
      statusCode: 401,
      message: "Invalid Access Token"
    });
  }
});

