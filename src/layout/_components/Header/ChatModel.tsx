import { serverGetChatModels } from '@/apis';
import ChatModelSelect from '@/layout/_components/Header/ChatModelSelect.client';

export default async function ChatModel() {
    const chatModels = await serverGetChatModels({ next: { revalidate: 60 } });

    return <ChatModelSelect data={chatModels} />;
}
