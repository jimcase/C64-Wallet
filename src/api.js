import axios from 'axios';

const apiUrl = 'http://localhost:9002';

export const api = axios.create({baseURL: apiUrl});
