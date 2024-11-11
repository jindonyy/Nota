import DialogueList from '@/app/[chat_id]/_components/DialogueList';
import './chat.scss';

export default function ChatPage() {
    return (
        <div className="chat-page">
            <DialogueList />
        </div>
    );
}
