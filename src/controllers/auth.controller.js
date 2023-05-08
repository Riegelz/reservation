const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');

const getToken = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email !== process.env.JWT_SAMPLE_EMAIL || password !== process.env.JWT_SAMPLE_PASSWORD) {
      return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorization' });
    }
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 1000 * 1000,
        email,
      },
      process.env.JWT_ACCESS_TOKEN_SECRET
    );
    return res.send({ token });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ error });
  }
});

module.exports = { getToken };
