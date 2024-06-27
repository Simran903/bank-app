import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const generateAccessToken = (user: any) => {
  return jwt.sign({
    userId: user.id,
    email: user.email
  },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

const encryptPassword = async function(password: string) {
  return await bcrypt.hash(password, 10)
}

const isPasswordCorrect = async function(password: string, encryptedPassword: string) {
  return await bcrypt.compare(encryptedPassword, password)
}


const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(18),
  name: z.string()
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(18)
});

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const { success } = signUpSchema.safeParse(req.body)
  if (!success) {
    return res.status(411).json({
      message: "Invalid Inputs"
    });
  }

  if ([name, email, password].some((field) => field.trim() === "")) {
    throw new ApiError({ statusCode: 400, message: "All fields are required" });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email
    }
  })
  if (existingUser) {
    throw new ApiError({ statusCode: 409, message: "User already exists" });
  }

  const encryptedPassword = await encryptPassword(password);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: encryptedPassword,
      name: name
    }
  });

  const createdUser = await prisma.user.findFirst({
    where: {
      email: email
    }
  })
  if (!createdUser) {
    throw new ApiError({ statusCode: 500, message: "Something went wrong while signing up user" });
  }

  const accessToken = generateAccessToken(user);

  return res.status(200)
    .cookie("accessToken", accessToken)
    .json(
      new ApiResponse({
        statusCode: 200,
        data: accessToken,
        message: "user registered successfully"
      })
    )
})


export const signIn = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { success } = signInSchema.safeParse(req.body);
  if (!success) {
    throw new ApiError({
      statusCode: 411,
      message: "Invalid inputs"
    });
  }

  if (!email || !password) {
    throw new ApiError({
      statusCode: 400,
      message: "Email and password is required"
    })
  }

  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  });

  if (!user) {
    throw new ApiError({
      statusCode: 404,
      message: "User does not exist"
    });
  };

  const isPasswordValid = await isPasswordCorrect(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError({
      statusCode: 401,
      message: "Password incorrect"
    });
  };

  const accessToken = generateAccessToken(user);

  return res.status(200)
    .cookie("accessToken", accessToken)
    .json(
      new ApiResponse({
        statusCode: 200,
        data: accessToken,
        message: "User logged in successfully"
      })
    )
})
