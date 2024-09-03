import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';

const prisma = new PrismaClient();

export const addBeneficiary = asyncHandler(async (req: Request, res: Response) => {
  const { name, accountNumber, bankName, ifscCode, email, phone, accountId } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError({ statusCode: 401, message: 'Unauthorized request' });
  }

  if (!accountId) {
    throw new ApiError({ statusCode: 400, message: 'Account ID is required' });
  }

  const beneficiary = await prisma.beneficiary.create({
    data: {
      userId,
      name,
      accountNumber,
      bankName,
      ifscCode,
      email,
      phone,
      accountId,
    },
  });

  return res.status(201).json(new ApiResponse({
    statusCode: 201,
    data: beneficiary,
    message: 'Beneficiary added successfully',
  }));
});

export const getAllBeneficiaries = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError({ statusCode: 401, message: 'Unauthorized request' });
  }

  const beneficiaries = await prisma.beneficiary.findMany({
    where: {
      userId: userId,
    },
  });

  return res.status(200).json(new ApiResponse({
    statusCode: 200,
    data: beneficiaries,
    message: 'Beneficiaries retrieved successfully',
  }));
});

export const getBeneficiaryById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  if (!userId) {
    throw new ApiError({ statusCode: 401, message: 'Unauthorized request' });
  }

  const beneficiary = await prisma.beneficiary.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!beneficiary || beneficiary.userId !== userId) {
    throw new ApiError({ statusCode: 404, message: 'Beneficiary not found' });
  }

  return res.status(200).json(new ApiResponse({
    statusCode: 200,
    data: beneficiary,
    message: 'Beneficiary retrieved successfully',
  }));
});
