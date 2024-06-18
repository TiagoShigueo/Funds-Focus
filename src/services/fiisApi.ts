import axios from "axios";

const fiisApi = axios.create({
    baseURL: 'http://localhost:8080',
});

export const getFiis = async() => {
    try {
        const response = await fiisApi.get('/fiis');
        return response.data;
    } catch(error){
        console.error('Erro ao buscar os FIIs da api: ', error);
        return [];
    }
};