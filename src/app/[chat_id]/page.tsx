import { ChatInput } from '@/layout/ChatInput/ChatInput';
import DialogueList from '@/app/[chat_id]/_components/DialogueList';
import './chat.scss';

interface Props {}

export default function ChatPage(props: Props) {
    return (
        <div className="chat-page">
            <DialogueList />
        </div>
    );
}
