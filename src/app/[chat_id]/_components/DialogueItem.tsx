import type { Dialogue } from '@/app/[chat_id]/_models';
import Message from '@/components/Message';

interface Props {
    data: Dialogue;
}

export default function DialogueItem(props: Props) {
    const { data } = props;

    return (
        <div className="chat-dialogue-item">
            <div className="chat-dialogue-prompt">
                <Message text={data.prompt} hasProfile={false} />
            </div>
            <div className="chat-dialogue-completion">
                <Message text={data.completion} profileImageUrl="/static/images/nota_profile.webp" />
            </div>
        </div>
    );
}
