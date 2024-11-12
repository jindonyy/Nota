import DialogueList from '@/app/[chat_id]/_components/DialogueList';
import './page.scss';

export default function ChatPage() {
    return (
        <div className="chat-page">
            <DialogueList />
        </div>
    );
}
