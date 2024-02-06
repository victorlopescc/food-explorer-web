import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://food-explorer-api-cdrw.onrender.com:3000'
});