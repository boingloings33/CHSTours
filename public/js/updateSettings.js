import axios from 'axios';
import { showAlert } from './alert';

export const updateSettings = async (data, type) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url:
        type === 'data'
          ? 'http://127.0.0.1:8000/api/v1/users/updateMe'
          : 'http://127.0.0.1:8000/api/v1/users/updateMyPassword',
      data,
    });
    if (res.data.status === 'success') {
      showAlert(
        'success',
        type === 'data'
          ? 'Settings succesfully changed!'
          : 'Password succesfully changed!',
      );
      window.setTimeout(() => {
        location.assign('/me');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
