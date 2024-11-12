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
                <Message
                    text={data.completion}
                    profileImageUrl="https://static.wixstatic.com/media/6ee621_46b49dcb2b1e4bb8aa12c802e71492b0~mv2.png/v1/fill/w_210,h_210,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Nota%20AI_YouTube%20profile_4_edited.png"
                />
            </div>
        </div>
    );
}
