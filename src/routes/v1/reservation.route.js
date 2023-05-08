const express = require('express');
const validate = require('../../middlewares/validate');
const tokenValidator = require('../../middlewares/tokenValidator');
const reservationValidation = require('../../validations/reservation.validation');
const reservationController = require('../../controllers/reservation.controller');

const router = express.Router();

router.post(
  '/change-init-reservation',
  tokenValidator,
  validate(reservationValidation.verifyInit),
  reservationController.changedInitReservation
);
router.get('/get-reservation-info', tokenValidator, reservationController.getReservationInfo);
router.post(
  '/reserv-table',
  tokenValidator,
  validate(reservationValidation.verifyReservTable),
  reservationController.reservationTable
);
router.post(
  '/cancel-reserv-table',
  tokenValidator,
  validate(reservationValidation.verifyCancelReservTable),
  reservationController.cancelReservationTable
);

module.exports = router;
