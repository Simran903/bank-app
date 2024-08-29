import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';

const prisma = new PrismaClient();

export const initiateTransfer = asyncHandler(async (req: Request, res: Response) => {
  const { amount, toUserId, description } = req.body;

  const parsedAmount = parseInt(amount, 10);
  if (isNaN(parsedAmount) || parsedAmount <= 0 || !toUserId) {
    throw new ApiError({
      statusCode: 400,
      message: 'Invalid inputs',
    });
  }

  const fromUserId = req.user?.id;
  if (!fromUserId) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized request',
    });
  }

  if (fromUserId === toUserId) {
    throw new ApiError({
      statusCode: 400,
      message: 'Cannot transfer to the same user',
    });
  }

  const fromAccount = await prisma.account.findFirst({
    where: { userId: fromUserId },
    include: { balance: true },
  });

  const toAccount = await prisma.account.findFirst({
    where: { userId: toUserId },
    include: { balance: true },
  });

  if (!fromAccount || !fromAccount.balance) {
    throw new ApiError({
      statusCode: 404,
      message: 'Sender account or balance not found',
    });
  }

  if (!toAccount || !toAccount.balance) {
    throw new ApiError({
      statusCode: 404,
      message: 'Recipient account or balance not found',
    });
  }

  if (fromAccount.balance.amount < parsedAmount) {
    throw new ApiError({
      statusCode: 400,
      message: 'Insufficient funds',
    });
  }

  const transaction = await prisma.transaction.create({
    data: {
      amount: parsedAmount,
      type: 'Transfer',
      status: 'Completed',
      description: description || '',
      fromAccountId: fromAccount.id,
      toAccountId: toAccount.id,
      userId: fromUserId,
    },
  });

  await prisma.balance.update({
    where: { id: fromAccount.balance.id },
    data: { amount: { decrement: parsedAmount } },
  });

  await prisma.balance.update({
    where: { id: toAccount.balance.id },
    data: { amount: { increment: parsedAmount } },
  });

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: { transaction },
      message: 'Transfer initiated successfully',
    })
  );
});

export const getAllSentTransfers = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized request',
    });
  }

  const sentTransfers = await prisma.transaction.findMany({
    where: { fromAccount: { userId: userId } },
    include: { toAccount: true, fromAccount: true },
    orderBy: { timestamp: 'desc' },
  });

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: { sentTransfers },
      message: 'Sent transfers fetched successfully',
    })
  );
});

export const getAllReceivedTransfers = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized request',
    });
  }

  const receivedTransfers = await prisma.transaction.findMany({
    where: { toAccount: { userId: userId } },
    include: { fromAccount: true, toAccount: true },
    orderBy: { timestamp: 'desc' },
  });

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: { receivedTransfers },
      message: 'Received transfers fetched successfully',
    })
  );
});

export const getAllTransfers = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized request',
    });
  }

  const allTransfers = await prisma.transaction.findMany({
    where: {
      OR: [
        { fromAccount: { userId: userId } },
        { toAccount: { userId: userId } },
      ],
    },
    include: { fromAccount: true, toAccount: true },
    orderBy: { timestamp: 'desc' },
  });

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: { allTransfers },
      message: 'All transfers fetched successfully',
    })
  );
});

