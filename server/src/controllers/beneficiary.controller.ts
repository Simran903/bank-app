import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import { z } from 'zod';

const prisma = new PrismaClient();

const beneficiarySchema = z.object({
  name: z.string().min(1),
  accountNumber: z.string().min(1),
  bankName: z.string().min(1),
  ifscCode: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  accountId: z.number({ required_error: "Account ID is required" }),
});

const beneficiaryUpdateSchema = beneficiarySchema.partial();

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a valid integer"),
});

export const addBeneficiary = asyncHandler(async (req: Request, res: Response) => {
  const validationResult = beneficiarySchema.safeParse(req.body);
  if (!validationResult.success) {
    throw new ApiError({
      statusCode: 400,
      message: validationResult.error.errors.map(e => e.message).join(', '),
    });
  }

  const { name, accountNumber, bankName, ifscCode, email, phone, accountId } = validationResult.data;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError({ statusCode: 401, message: 'Unauthorized request' });
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
  const idValidation = idParamSchema.safeParse(req.params);
  if (!idValidation.success) {
    throw new ApiError({
      statusCode: 400,
      message: idValidation.error.errors.map(e => e.message).join(', '),
    });
  }

  const userId = req.user?.id;
  const { id } = idValidation.data;

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

export const updateBeneficiary = asyncHandler(async (req: Request, res: Response) => {
  const idValidation = idParamSchema.safeParse(req.params);
  if (!idValidation.success) {
    throw new ApiError({
      statusCode: 400,
      message: idValidation.error.errors.map(e => e.message).join(', '),
    });
  }

  const validationResult = beneficiaryUpdateSchema.safeParse(req.body);
  if (!validationResult.success) {
    throw new ApiError({
      statusCode: 400,
      message: validationResult.error.errors.map(e => e.message).join(', '),
    });
  }

  const { name, accountNumber, bankName, ifscCode, email, phone, accountId } = validationResult.data;
  const userId = req.user?.id;
  const { id } = idValidation.data;

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

  const updatedBeneficiary = await prisma.beneficiary.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      accountNumber,
      bankName,
      ifscCode,
      email,
      phone,
      accountId,
    },
  });

  return res.status(200).json(new ApiResponse({
    statusCode: 200,
    data: updatedBeneficiary,
    message: 'Beneficiary updated successfully',
  }));
});

export const removeBeneficiary = asyncHandler(async (req: Request, res: Response) => {
  const idValidation = idParamSchema.safeParse(req.params);
  if (!idValidation.success) {
    throw new ApiError({
      statusCode: 400,
      message: idValidation.error.errors.map(e => e.message).join(', '),
    });
  }

  const userId = req.user?.id;
  const { id } = idValidation.data;

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

  await prisma.beneficiary.delete({
    where: {
      id: parseInt(id),
    },
  });

  return res.status(200).json(new ApiResponse({
    statusCode: 200,
    data: {},
    message: 'Beneficiary removed successfully',
  }));
});

