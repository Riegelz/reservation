const Joi = require('joi');

const verifyInit = {
  body: Joi.object().keys({
    init_table: Joi.number().integer().required(),
  }),
};

const verifyReservTable = {
  body: Joi.object().keys({
    number_customer: Joi.number().integer().required(),
  }),
};

const verifyCancelReservTable = {
  body: Joi.object().keys({
    booking_id: Joi.string().required(),
  }),
};

module.exports = {
  verifyInit,
  verifyReservTable,
  verifyCancelReservTable,
};
