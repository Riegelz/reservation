const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const tokenValidator = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorization' });
    }
    const token = authorization.replace(/^Bearer\s+/, '');
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorization' });
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(httpStatus.UNAUTHORIZED).send('unauthorized');
    }
    next();
  } catch (e) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorization' });
  }
};

module.exports = tokenValidator;
