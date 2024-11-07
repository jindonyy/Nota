import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { CHAT_MODELS, CHATS } from './data';

let chatData = CHATS;
const chatModels = CHAT_MODELS;

// test용 end point 입니다.
export const getTest = (req: Request, res: Response) => {
  res.json({
    test: 'test',
  });
};

// 채팅 목록
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getChats = (req: Request, res: Response) => {
  res.json({
    data: chatData,
  });
};

// 채팅생성
export const creatChat = (
  req: Request<unknown, unknown, { chat_model_id: string }>,
  res: Response,
) => {
  const { chat_model_id } = req.body;

  chatData.push({
    chat_model_id: chat_model_id,
    chat_model_name:
      chatModels.find(({ chat_model_id: modelId }) => chat_model_id === modelId)?.chat_model_name ||
      '',
    chat_id: randomUUID(),
    dialogues: [],
  });

  res.json({
    data: chatData,
  });
};

// 단일 채팅 조회
export const getChat = (req: Request<{ chat_id: string }, unknown, unknown>, res: Response) => {
  const { chat_id } = req.params;
  const data = chatData.find((chat) => chat.chat_id === chat_id);

  res.json({
    data: data,
  });
};

// 단일 채팅에 대화 추가
export const addChat = (
  req: Request<{ chat_id: string }, unknown, { prompt: string }>,
  res: Response,
) => {
  setTimeout(() => {
    const { chat_id } = req.params;
    const { prompt } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = chatData.find((chat) => chat.chat_id === chat_id) || [];
    const response = {
      ...data,
      dialogues: data.dialogues.concat({
        dialogue_id: randomUUID(),
        prompt,
        completion: 'Mock 응답',
      }),
    };

    chatData = chatData.map((item) => {
      if (item.chat_id === chat_id) {
        return response;
      }
      return item;
    });

    res.json({
      data: response,
    });
  }, 2000);
};

// 모델 목록
export const getChatModel = (req: Request, res: Response) => {
  res.json({
    data: chatModels,
  });
};
