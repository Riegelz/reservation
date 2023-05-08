const Joi = require('joi');

const verifyAuth = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  verifyAuth,
};
