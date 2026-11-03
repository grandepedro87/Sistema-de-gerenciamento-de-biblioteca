import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5202/api',
});

export default api;