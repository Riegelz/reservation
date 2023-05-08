const logger = require('../config/logger');
const { reservationService } = require('../services');

const initTable = async (i) => {
  const init = await reservationService.initTableReservations(i, true);
  if (init.length > 0) {
    logger.info('Initializing successfully.');
  }
  return init;
};

module.exports = { initTable };
