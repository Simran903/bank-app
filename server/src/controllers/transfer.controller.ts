import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import { z } from 'zod';

const prisma = new PrismaClient();

const transferSchema = z.object({
  amount: z.number().min(1, "Amount must be greater than zero"),
  toUsername: z.string().min(3, "Recipient Username must be at least 3 characters long"),
  description: z.string().optional(),
});

const transactionIdSchema = z.object({
  id: z.string().transform(Number).refine((id) => !isNaN(id) && id > 0, {
    message: 'Transaction ID must be a positive number',
  }),
});

export const initiateTransfer = asyncHandler(async (req: Request, res: Response) => {
  const validationResult = transferSchema.safeParse(req.body);

  if (!validationResult.success) {
    throw new ApiError({
      statusCode: 400,
      message: validationResult.error.errors.map((e) => e.message).join(', '),
    });
  }

  const { amount, toUsername, description } = validationResult.data;
  const fromUserId = req.user?.id;

  if (!fromUserId) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized request',
    });
  }

  const toUser = await prisma.user.findUnique({
    where: { username: toUsername },
  });

  if (!toUser) {
    throw new ApiError({
      statusCode: 404,
      message: 'Recipient user not found',
    });
  }

  if (fromUserId === toUser.id) {
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
    where: { userId: toUser.id },
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

  if (fromAccount.balance.amount < amount) {
    throw new ApiError({
      statusCode: 400,
      message: 'Insufficient funds',
    });
  }

  const transaction = await prisma.transaction.create({
    data: {
      amount,
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
    data: { amount: { decrement: amount } },
  });

  await prisma.balance.update({
    where: { id: toAccount.balance.id },
    data: { amount: { increment: amount } },
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

export const getTransferById = asyncHandler(async (req: Request, res: Response) => {
  const validationResult = transactionIdSchema.safeParse(req.params);

  if (!validationResult.success) {
    throw new ApiError({
      statusCode: 400,
      message: validationResult.error.errors.map((e) => e.message).join(', '),
    });
  }

  const { id } = validationResult.data;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized request',
    });
  }

  const transaction = await prisma.transaction.findUnique({
    where: { id },
    include: { fromAccount: true, toAccount: true },
  });

  if (!transaction || (transaction.fromAccount.userId !== userId && transaction.toAccount.userId !== userId)) {
    throw new ApiError({
      statusCode: 404,
      message: 'Transaction not found',
    });
  }

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: { transaction },
      message: 'Transfer details retrieved successfully',
    })
  );
});

export const getFilteredTransactions = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized request',
    });
  }

  const filterSchema = z.object({
    year: z.number().optional(),
    month: z.number().min(1).max(12).optional(),
    day: z.number().min(1).max(31).optional(),
    maxAmount: z.number().optional(),
    minAmount: z.number().optional(),
  });

  const result = filterSchema.safeParse(req.query);
  if (!result.success) {
    throw new ApiError({
      statusCode: 400,
      message: 'Invalid filters',
    });
  }

  const { year, month, day, maxAmount, minAmount } = result.data;

  const filters: any = {
    AND: [
      { OR: [{ fromAccount: { userId: userId } }, { toAccount: { userId: userId } }] },
      {
        timestamp: {
          ...(year && { gte: new Date(`${year}-01-01T00:00:00.000Z`) }),
          ...(year && month && { lte: new Date(`${year}-${month + 1}-01T00:00:00.000Z`) }),
          ...(month && day && { gte: new Date(`${year}-${month}-${day}T00:00:00.000Z`) }),
        }
      },
      ...(minAmount !== undefined && maxAmount !== undefined
        ? [{ amount: { gte: minAmount, lte: maxAmount } }]
        : minAmount !== undefined
          ? [{ amount: { gte: minAmount } }]
          : maxAmount !== undefined
            ? [{ amount: { lte: maxAmount } }]
            : []
      ),
    ],
  };

  const transactions = await prisma.transaction.findMany({
    where: filters,
    include: { fromAccount: true, toAccount: true },
    orderBy: { timestamp: 'desc' },
  });

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: { transactions },
      message: 'Filtered transactions fetched successfully',
    })
  );
});

export const getLast5Transactions = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized request',
    });
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      OR: [
        { fromAccount: { userId: userId } },
        { toAccount: { userId: userId } },
      ],
    },
    include: { fromAccount: true, toAccount: true },
    orderBy: { timestamp: 'desc' },
    take: 5,
  });

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: { transactions },
      message: 'Last 5 transactions fetched successfully',
    })
  );
});

