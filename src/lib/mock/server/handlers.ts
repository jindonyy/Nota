import type { Request, Response } from 'express';

import { CHAT_MODELS } from '@/lib/mock/data';

const chatModels = CHAT_MODELS;

// 모델 목록
export const getChatModel = (req: Request, res: Response) => {
    res.json({
        data: chatModels,
    });
};
