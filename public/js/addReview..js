import axios from 'axios';
import { showAlert } from './alert';

export const addReview = async (review, rating, tour, user) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/reviews',
      data: {
        review,
        rating,
        tour,
        user,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Review successfully created!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    console.log(res);

    showAlert('error', err.response.data.message);
  }
};
