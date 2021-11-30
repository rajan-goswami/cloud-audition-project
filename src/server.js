const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const { logger } = require('./config/logger');

let server;

const initServer = async () => {
  await mongoose.connect(config.mongoose.url, config.mongoose.options);
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
};

// Initialize application server
initServer();

const exitHandler = () => {
  if (server) {
    server.close(async () => {
      logger.info('Server closed');
      await mongoose.connection.close(false);
      logger.info('Mongodb connection closed');
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

// Perform graceful shutdown.
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  exitHandler();
});
