
import multer, { StorageEngine, FileFilterCallback } from 'multer';
import { Request } from 'express';

const storage: StorageEngine = multer.diskStorage({
  destination: function(req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, './public/temp');
  },
  filename: function(req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname);
  }
});

export const upload = multer({
  storage,
});

