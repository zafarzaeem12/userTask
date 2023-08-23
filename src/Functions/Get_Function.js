import axios from 'axios';

export const Get_Function = (url) => {
    const url = `${url}`;
    const config = {
        header: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const data = axios.post(url, config);
    const response = data?.data;
    return response;
}