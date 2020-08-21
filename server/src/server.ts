import express from 'express';
import cors from 'cors';
import router from './routes';
import uploadConfig from './config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(router);

app.listen(3333);
