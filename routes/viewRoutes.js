const express = require('express');

const router = express.Router();
const {
  getOverview,
  getTour,
  getLogIn,
  getAccount,
  getSignUp,
  getResetPassword,
  getForgotPassword,
  getDeleteAccount,
  getAddReview,
} = require('../controllers/viewsController');

const { isLoggedIn, protect } = require('../controllers/authController');

router.get('/', isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/tour/:slug/review', protect, getAddReview);
router.get('/login', isLoggedIn, getLogIn);
router.get('/signup', getSignUp);
router.get('/me', protect, getAccount);
router.get('/resetPassword/:resetToken', getResetPassword);
router.get('/forgotPassword', getForgotPassword);
router.get('/deleteAccount', protect, getDeleteAccount);

module.exports = router;
