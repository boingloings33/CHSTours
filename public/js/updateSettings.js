import axios from 'axios';
import { showAlert } from './alert';

export const updateSettings = async (data, type) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url:
        type === 'data'
          ? '/api/v1/users/updateMe'
          : '/api/v1/users/updateMyPassword',
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
