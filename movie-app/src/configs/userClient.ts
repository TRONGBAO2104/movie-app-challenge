import axios from 'axios';
import { BASE_URL } from './contants';

const userClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json'
    }
});

export default userClient;