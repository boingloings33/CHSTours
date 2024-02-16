import axios from 'axios';
import { showAlert } from './alert';

export const deleteAccount = async (input) => {
  if (input === 'DELETE') {
    try {
      await axios({
        method: 'DELETE',
        url: '/api/v1/users/deleteMe',
      });
      showAlert('success', 'Account Succesfully Deleted');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  }

  if (input !== 'DELETE') {
    showAlert('error', 'Please make sure "DELETE" is spelled correctly!');
  }
};
