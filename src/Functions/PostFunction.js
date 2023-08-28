/* eslint no-use-before-define: 0 */  // --> OFF
import axios from 'axios';

export const PostFunction = async (url, payload, token = null) => {
  try {
    const headers = {}

    if(token){   
      headers.Authorization = `Bearer ${token}`;
    }
      
  
    let config = {
      method: 'POST',
      url,
      headers,
    };

    if (payload instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
      config = {
        ...config,
        data: payload,
      };
    } else {
      headers['Content-Type'] = 'application/json';
      config = {
        ...config,
        data: JSON.stringify(payload),
      };
    }

    const response = await axios(config);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
