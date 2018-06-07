import server from './main';
import logger from './lib/logger';

try {
  server.start();
} catch (err) {
  logger.error(`Something went wrong! can\'t start the server: ${err.stack}`);
  process.exit(1);
}
