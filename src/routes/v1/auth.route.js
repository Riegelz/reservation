const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.post('/get-token', validate(authValidation.verifyAuth), authController.getToken);

module.exports = router;
