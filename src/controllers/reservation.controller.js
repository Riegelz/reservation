/* eslint-disable camelcase */
const httpStatus = require('http-status');
const { reservationService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const changedInitReservation = catchAsync(async (req, res) => {
  try {
    const { init_table } = req.body;
    const init = await reservationService.initTableReservations(init_table, false);
    return res.status(httpStatus.CREATED).send(init);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }
});

const getReservationInfo = catchAsync(async (req, res) => {
  try {
    const reservationInfo = await reservationService.getReservationInfo();
    return res.status(httpStatus.OK).send({ table_info: reservationInfo });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }
});

const reservationTable = catchAsync(async (req, res) => {
  try {
    const { number_customer } = req.body;
    const reservation = await reservationService.reservationTable(number_customer);
    return res.status(httpStatus.OK).send({ table_info: reservation });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }
});

const cancelReservationTable = catchAsync(async (req, res) => {
  try {
    const { booking_id } = req.body;
    const reservationInfo = await reservationService.cancelReservationTable(booking_id);
    return res.status(httpStatus.OK).send({ table_info: reservationInfo });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }
});

module.exports = { changedInitReservation, getReservationInfo, reservationTable, cancelReservationTable };
