import express from 'express';

import logger from './lib/logger';

// Routes
import statusRouter from './routes/status';
import flightsRouter from './routes/flights';

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
   * @param {number} port - the port
   */
  constructor(port) {
    _app = express();
    this.port = port;
    this.loadMiddlewares();
  }

  /**
   * Start the server
   *
   * @param {Server~callback} [cb] - An optional callback
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
    _app.use(express.json());

    // A middleware to make 'from' & 'to' values uppercase
    // in case the user provides a lowercase values
    _app.use((req, res, next) => {
      if ('from' in req.query && 'to' in req.query) {
        req.query.from = req.query.from.toUpperCase();
        req.query.to = req.query.to.toUpperCase();
      }
      next();
    });

    // Routes
    _app.use('/api', statusRouter);
    _app.use('/api', flightsRouter);

    // Error handler middleware
    /* eslint-disable-next-line no-unused-vars */
    _app.use((err, req, res, next) => {
      const errorCode = err.message.startsWith('Bad request') ? 400 : 500;
      return res.status(errorCode).json({
        error: { message: err.message }
      });
    });
  }
}
