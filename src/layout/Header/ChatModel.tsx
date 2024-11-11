import { serverGetChatModels } from '@/apis/chatModel';
import ChatModelSelect from '@/layout/Header/ChatModelSelect.client';

export default async function ChatModel() {
    const chatModels = await serverGetChatModels({ next: { revalidate: 60 } });

    return <ChatModelSelect data={chatModels} />;
}
