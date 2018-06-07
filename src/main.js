import express from 'express';

import Server from './server';

const app = express();
const port = process.env.PORT || 3000;

export default new Server(app, port);
