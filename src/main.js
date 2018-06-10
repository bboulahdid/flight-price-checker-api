import Server from './server';

const port = process.env.PORT || 3000;

export default new Server(port);
