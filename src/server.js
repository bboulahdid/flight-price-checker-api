import logger from './lib/logger';
import statusRouter from './routes/status';

// A private variable to hold our express app
let _app;

/**
 * Manage all the states of our express server
 */
export default class Server {
  /**
   * Get the express instance, the port & load all middlewares
   *
   * @param {object} app - the express instance
   * @param {number} port - the port
   */
  constructor(app, port) {
    _app = app;
    this.port = port;
    this.loadMiddlewares();
  }

  /**
   * Start the server
   */
  start() {
    _app.listen(this.port, () => logger.info(`Server listening on port ${this.port}...`));
  }

  /**
   * Stop the server
   */
  stop() {
    _app.close();
  }

  /**
   * Load all middlewares
   */
  loadMiddlewares() {
    _app.use('/api', statusRouter);
  }
}
