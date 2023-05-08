const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

const initTable = require('./middlewares/reservation');

const server = app.listen(config.port, async () => {
  // init table
  await initTable.initTable(process.env.TOTAL_TABLE || 10);
  logger.info(`Listening to port ${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
