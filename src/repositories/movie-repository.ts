import userClient from '../configs/userClient';
import { API_KEY } from '../configs/contants';

const movieUrl = "/movie";

export const getMovieList = (params: any, apiPath: string) => {
    return userClient.get(`${movieUrl}/${apiPath}?api_key=${API_KEY}`, { params });
}

export const getVideoById = (id: number, params: any) => {
    return userClient.get(`${movieUrl}/${id}?api_key=${API_KEY}`, { params } );
}

export const getMovieDetailById = (id: number) => {
    return userClient.get(`${movieUrl}/${id}?api_key=${API_KEY}`);
}