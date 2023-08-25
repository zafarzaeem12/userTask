import axios from 'axios';

export const GetFunction = async (url , token) => {
    const urls = `${url}`;

    const headers = {
        Authorization: `Bearer ${token}` 
        
    };
      const config = {
        urls,
        headers
      };
    const data = await axios.get(url, config);
    const response = data?.data;
    return response;
}