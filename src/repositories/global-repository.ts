import userClient from '../configs/userClient';
import { API_KEY } from '../configs/contants';

const searchMovieUrl = "search/movie";
const genresMovieUrl = 'genre/movie/list'
const discoverMovieUrl = 'discover/movie'

export const getMoviesByKeyword = (params: any) => {
    return userClient.get(`${searchMovieUrl}?api_key=${API_KEY}`, { params });
}

export const getGenresMovie = () => {
    return userClient.get(`${genresMovieUrl}?api_key=${API_KEY}`);
}

export const getMovieDiscover = (params: any) => {
    return userClient.get(`${discoverMovieUrl}?api_key=${API_KEY}`, { params });
}