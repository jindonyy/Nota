import { getChatModel } from './handlers';

import cors from 'cors';
import express from 'express';

const app = express();
const port = 9090;

app.use(express.json());
app.use(cors());

app.get('/chat_model', getChatModel);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
