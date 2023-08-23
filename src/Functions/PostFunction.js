import axios from 'axios';

export const PostFunction = async (url, payload) => {
  try {
    const headers = {};

    if (payload instanceof FormData) {
      
      headers['Content-Type'] = 'multipart/form-data';
    }

    const config = {
      method: 'POST',
      url,
      headers,
      data: payload,
    };

    const response = await axios(config);
    return response.data;
  } catch (err) {
    return null;
  }
};
