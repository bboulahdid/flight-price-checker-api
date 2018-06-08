import logger from './lib/logger';
import statusRouter from './routes/status';

// A private variable to hold our express app
let _app;

// Another private variable to hold the server instance when it's strated
let _serverInsance;

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
   *
   * @param {Server~callback} cb - An optional callback
   */
  start(cb) {
    _serverInsance = _app.listen(this.port, () => {
      logger.info(`Server listening on port ${this.port}...`);
      // If a callback is provided, execute it
      cb && cb();
    });
  }

  /**
   * Stop the server
   */
  stop() {
    _serverInsance.close();
  }

  /**
   * Load all middlewares
   */
  loadMiddlewares() {
    _app.use('/api', statusRouter);
  }
}
