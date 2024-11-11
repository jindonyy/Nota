import { randomUUID } from 'crypto';

import { CHAT_MODELS, CHATS } from '@/lib/mock/data';
import type { Request, Response } from 'express';

let chatData = CHATS;
const chatModels = CHAT_MODELS;

// 모델 목록
export const getChatModel = (req: Request, res: Response) => {
    res.json({
        data: chatModels,
    });
};
