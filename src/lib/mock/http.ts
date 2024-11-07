import express from 'express';
import cors from 'cors';
import { addChat, creatChat, getChat, getChatModel, getChats, getTest } from './handlers';

const app = express();
const port = 9090;

app.use(express.json());
app.use(cors());

app.get('/test', getTest);
app.get('/chats', getChats);
app.post('/chats', creatChat);
app.get('/chats/:chat_id', getChat);
app.post('/chats/:chat_id/dialogues', addChat);
app.get('/chat_model', getChatModel);

app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
