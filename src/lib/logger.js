import { createLogger, format, transports } from 'winston';
import { DateTime } from 'luxon';

const { combine, timestamp, printf } = format;

const disableLogs = process.env.LOG !== 'true';

// Custom log format: 'Thu, 07 Jun 2018 11:17:29 GMT - INFO: Server listening on port 3000...'
const customLogFormat = printf((log) => {
  return `${DateTime.fromISO(log.timestamp).toHTTP()} - ${log.level.toUpperCase()}: ${log.message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    customLogFormat
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      silent: disableLogs
    })
  ]
});

export default logger;
