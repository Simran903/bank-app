import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { uploadCloudinary } from '../utils/cloudinary';

const prisma = new PrismaClient();

const generateAccessToken = (user: any) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const isPasswordCorrect = async (password: string, encryptedPassword: string) => {
  return await bcrypt.compare(password, encryptedPassword);
};

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(18),
  name: z.string(),
  username: z.string().min(3).max(20),
});

const signInSchema = z.object({
  identifier: z.string(),
  password: z.string().min(6).max(18),
});

const updatePasswordSchema = z.object({
  oldPassword: z.string().min(6).max(18),
  newPassword: z.string().min(6).max(18),
});

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name, username } = req.body;

  const result = signUpSchema.safeParse(req.body);
  if (!result.success) {
    throw new ApiError({
      statusCode: 411,
      message: 'Invalid inputs',
    });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new ApiError({ statusCode: 409, message: 'Email already exists' });
    }
    if (existingUser.username === username) {
      throw new ApiError({ statusCode: 409, message: 'Username already exists' });
    }
  }

  const encryptedPassword = await encryptPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: encryptedPassword,
      name,
      username,
    },
  });

  const account = await prisma.account.create({
    data: {
      userId: user.id,
      type: 'Savings',
      category: 'General',
    },
  });

  await prisma.balance.create({
    data: {
      amount: 10000,
      accountId: account.id,
    },
  });

  const accessToken = generateAccessToken(user);

  return res
    .status(200)
    .cookie('accessToken', accessToken)
    .json(
      new ApiResponse({
        statusCode: 200,
        data: { accessToken },
        message: 'User registered successfully',
      })
    );
});

export const signIn = asyncHandler(async (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  const result = signInSchema.safeParse(req.body);
  if (!result.success) {
    throw new ApiError({
      statusCode: 411,
      message: 'Invalid inputs',
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) {
    throw new ApiError({
      statusCode: 404,
      message: 'User does not exist',
    });
  }

  const isPasswordValid = await isPasswordCorrect(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError({
      statusCode: 401,
      message: 'Password incorrect',
    });
  }

  const accessToken = generateAccessToken(user);

  return res
    .status(200)
    .cookie('accessToken', accessToken)
    .json(
      new ApiResponse({
        statusCode: 200,
        data: { accessToken },
        message: 'User logged in successfully',
      })
    );
});

export const signOut = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized request',
    });
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken: null,
    },
  });

  return res
    .status(200)
    .clearCookie('accessToken')
    .json(
      new ApiResponse({
        statusCode: 200,
        data: {},
        message: 'User logged out',
      })
    );
});

export const updatePassword = asyncHandler(async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  const result = updatePasswordSchema.safeParse(req.body);
  if (!result.success) {
    throw new ApiError({
      statusCode: 411,
      message: 'Invalid inputs',
    });
  }

  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized request',
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError({
      statusCode: 404,
      message: 'User not found',
    });
  }

  const isOldPasswordValid = await isPasswordCorrect(oldPassword, user.password);

  if (!isOldPasswordValid) {
    throw new ApiError({
      statusCode: 401,
      message: 'Old password is incorrect',
    });
  }

  const encryptedNewPassword = await encryptPassword(newPassword);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: encryptedNewPassword,
    },
  });

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: {},
      message: 'Password updated successfully',
    })
  );
});

export const updateProfilePicture = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ApiError({
      statusCode: 400,
      message: "Profile picture file is required"
    });
  }

  const userId = req.user?.id;
  const localFilePath = req.file.path;

  const uploadedImage = await uploadCloudinary(localFilePath);

  if (!uploadedImage) {
    throw new ApiError({
      statusCode: 500,
      message: "Error uploading profile picture"
    });
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { profilePictureUrl: uploadedImage.url }
  });

  if (!user) {
    throw new ApiError({
      statusCode: 500,
      message: "Something went wrong while updating profile picture"
    });
  }

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: { profilePicture: uploadedImage.url },
      message: "Profile picture updated successfully"
    })
  );
});

export const getUserBalance = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized request',
    });
  }

  const accounts = await prisma.account.findMany({
    where: {
      userId: userId,
    },
    include: {
      balance: true,
    },
  });

  if (!accounts || accounts.length === 0) {
    throw new ApiError({
      statusCode: 404,
      message: 'No accounts found for the user',
    });
  }

  const totalBalance = accounts.reduce((sum, account) => sum + (account.balance?.amount || 0), 0);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: { totalBalance },
      message: 'Balance fetched successfully',
    })
  );
});

export const getAccountDetails = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized request',
    });
  }

  const account = await prisma.account.findFirst({
    where: { userId: userId },
    include: { balance: true },
  });

  if (!account) {
    throw new ApiError({
      statusCode: 404,
      message: 'Account not found',
    });
  }

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: {
        accountId: account.id,
        type: account.type,
        category: account.category,
        balance: account.balance?.amount || 0,
      },
      message: 'Account details retrieved successfully',
    })
  );
});

export const getAccountOverview = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized request',
    });
  }

  const account = await prisma.account.findFirst({
    where: { userId },
    include: { balance: true },
  });

  if (!account || !account.balance) {
    throw new ApiError({
      statusCode: 404,
      message: 'Account or balance not found',
    });
  }

  const recentTransactions = await prisma.transaction.findMany({
    where: {
      OR: [
        { fromAccount: { userId } },
        { toAccount: { userId } },
      ],
    },
    include: { fromAccount: true, toAccount: true },
    orderBy: { timestamp: 'desc' },
    take: 5,
  });

  const totalSentAmount = await prisma.transaction.aggregate({
    where: {
      fromAccount: { userId },
    },
    _sum: {
      amount: true,
    },
  });

  const totalReceivedAmount = await prisma.transaction.aggregate({
    where: {
      toAccount: { userId },
    },
    _sum: {
      amount: true,
    },
  });

  const overviewData = {
    balance: account.balance.amount,
    recentTransactions,
    totalSentAmount: totalSentAmount._sum.amount || 0,
    totalReceivedAmount: totalReceivedAmount._sum.amount || 0,
  };

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: { overview: overviewData },
      message: 'Account overview retrieved successfully',
    })
  );
});
