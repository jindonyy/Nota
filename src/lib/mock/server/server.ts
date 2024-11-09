import { addChat, createChat, getChat, getChatModel, getChats, getTest } from './handlers';

import cors from 'cors';
import express from 'express';

const app = express();
const port = 9090;

app.use(express.json());
app.use(cors());

app.get('/test', getTest);
app.get('/chats', getChats);
app.post('/chats', createChat);
app.get('/chats/:chat_id', getChat);
app.post('/chats/:chat_id/dialogues', addChat);
app.get('/chat_model', getChatModel);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
