/* eslint-disable */
import axios from 'axios';

export const PutFunction = async (url, payload, token = null) => {
  try {
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    let config = {
      method: 'PUT',
      url,
      headers,
    };

    if (payload instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
      config.data = payload;
    } else {
      headers['Content-Type'] = 'application/json';
      config.data = JSON.stringify(payload);
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error in PutFunction:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};
