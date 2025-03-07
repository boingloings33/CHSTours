const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get Tour Data From Collection
  const tours = await Tour.find(); // 2) Build template

  // 3) Render Template
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug })
    .populate({
      path: 'reviews',
      fields: 'review rating user',
    })
    .populate('guides');

  if (!tour) {
    return next(new AppError('There is no tour with that name!', 404));
  }
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;",
    )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
});

exports.getLogIn = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log In',
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('account', {
    title: 'Your Account',
  });
});

exports.getSignUp = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Sign Up',
  });
});

exports.getResetPassword = catchAsync(async (req, res, next) => {
  const resetToken = req.params.resetToken;

  res.status(200).render('passwordResetPage', {
    title: 'Reset Password',
    resetToken,
  });
});

exports.getForgotPassword = catchAsync(async (req, res, next) => {
  res.status(200).render('forgotPassword', {
    title: 'Forgot Password',
  });
});
exports.getDeleteAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('deleteAccount', {
    title: 'Delete Account',
  });
});
exports.getAddReview = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug });
  // console.log(tour._id.toString());
  if (!tour) {
    return next(new AppError('There is no tour with that name!', 404));
  }
  res.status(200).render('addReview', {
    title: 'Add Review',
    tour,
  });
});
