const express = require('express');
const authRoute = require('./auth.route');
const reservationRoute = require('./reservation.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/reservation',
    route: reservationRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
