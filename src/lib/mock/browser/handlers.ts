import { delay, http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';

import { CHAT_MODELS, CHATS } from '@/lib/mock/data';
import { Chat } from '@/apis';
import { Data } from '@/types/data';

const isChats = (data: typeof CHATS): data is Chat[] => {
    return data.every(
        (item) =>
            typeof item.chat_model_id === 'string' &&
            typeof item.chat_model_name === 'string' &&
            typeof item.chat_id === 'string' &&
            Array.isArray(item.dialogues) &&
            item.dialogues.every(
                (dialogue) =>
                    typeof dialogue.dialogue_id === 'string' &&
                    typeof dialogue.prompt === 'string' &&
                    typeof dialogue.completion === 'string',
            ),
    );
};

let chatData = isChats(CHATS) ? CHATS : [];
const chatModels = CHAT_MODELS;

export const handlers = [
    // 채팅 목록
    http.get('/chats', async () => {
        return HttpResponse.json({
            data: chatData,
        });
    }),

    // 채팅 생성
    http.post<{}, { chat_model_id: string }, Data<Chat[]>>('/chats', async ({ request }) => {
        const { chat_model_id } = await request.json();

        chatData.push({
            chat_model_id: chat_model_id,
            chat_model_name:
                chatModels.find(({ chat_model_id: modelId }) => chat_model_id === modelId)?.chat_model_name || '',
            chat_id: uuidv4(),
            dialogues: [],
        });

        return HttpResponse.json({
            data: chatData,
        });
    }),

    // 단일 채팅 조회
    http.get<{ chatId: string }, {}, Data<Chat | undefined>, '/chats/:chatId'>('/chats/:chatId', async ({ params }) => {
        const { chatId } = params;
        const data = chatData.find((chat) => chat.chat_id === chatId);

        return HttpResponse.json({
            data,
        });
    }),

    // 단일 채팅에 대화 추가
    http.post<{ chatId: string }, { prompt: string }, Data<Chat>, '/chats/:chatId/dialogues'>(
        '/chats/:chatId/dialogues',
        async ({ params, request }) => {
            await delay(2000);
            const { chatId } = params;
            const { prompt } = await request.json();

            const data = chatData.find((chat) => chat.chat_id === chatId);

            if (!data) return;

            const response = {
                ...data,
                dialogues: data.dialogues.concat({
                    dialogue_id: uuidv4(),
                    prompt,
                    completion: 'Mock 응답',
                }),
            };

            chatData = chatData.map((item) => {
                if (item.chat_id === chatId) {
                    return response;
                }

                return item;
            });

            return HttpResponse.json({
                data: response,
            });
        },
    ),
];
