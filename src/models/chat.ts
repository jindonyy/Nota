export type Dialogue = {
    dialogue_id: string;
    prompt: string;
    completion: string;
};

export type Chat = {
    chat_model_id: string;
    chat_model_name: string;
    chat_id: string;
    dialogues: Dialogue[];
};
