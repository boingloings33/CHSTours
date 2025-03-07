import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { passwordReset } from './passwordReset';
import { forgotPassword } from './forgotPassword';
import { deleteAccount } from './deleteAccount';
import { addReview } from './addReview.';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-settings');
const passwordResetForm = document.querySelector('.password-reset-form');
const forgotPasswordForm = document.querySelector('.forgot-password-form');
const deleteAccountForm = document.querySelector('.delete-account-form');
const reviewForm = document.querySelector('.review-form');
const filetag = document.querySelector('#photo');
const preview = document.querySelector('.form__user-photo');
const stars = document.querySelectorAll('.reviews__star');

const readURL = (input) => {
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = (e) => {
      preview.setAttribute('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
};
if (filetag && preview) {
  filetag.addEventListener('change', function () {
    readURL(this);
  });
}
// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    const name = document.getElementById('name').value;

    signup(email, password, passwordConfirm, name);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector('.btn--save-password').textContent = 'Save password';
  });
}

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    await forgotPassword(email);
  });
}

if (passwordResetForm) {
  passwordResetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = document.querySelector('.btn--new-pass').dataset.token;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await passwordReset(token, password, passwordConfirm);
  });
}

if (deleteAccountForm) {
  deleteAccountForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('delete-account-input').value;

    await deleteAccount(input);
    document.getElementById('delete-account-input').value = '';
  });
}

if (reviewForm) {
  let rating;
  stars.forEach((item, i) => {
    item.addEventListener('click', () => {
      stars.forEach((star, i2) => {
        rating = i + 1;
        i >= i2
          ? star.classList.add('reviews__star--active')
          : star.classList.remove('reviews__star--active');
      });
    });
  });

  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const review = document.querySelector('.review-text-area').value;
    const userId = document.querySelector('.userId').dataset.token;
    const tourId = document.querySelector('.tourId').dataset.token;

    await addReview(review, rating, tourId, userId);
  });
}
