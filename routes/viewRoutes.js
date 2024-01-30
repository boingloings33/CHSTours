const express = require('express');

const router = express.Router();
const {
  getBase,
  getOverview,
  getTour,
} = require('../controllers/viewsController');

router.get('/', getBase);

router.get('/overview', getOverview);

router.get('/tour', getTour);

module.exports = router;
