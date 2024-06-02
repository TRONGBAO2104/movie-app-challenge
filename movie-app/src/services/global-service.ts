import * as globalRepository from '../repositories/global-repository';
import { handleResponse } from '../configs/apiResponse';

export const getGenresMovie = async () => {
    try {
        const response = await globalRepository.getGenresMovie();
        return handleResponse(response);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const getMoviesByKeyword = async (params: any) => {
    try {
        const response = await globalRepository.getMoviesByKeyword(params);
        return handleResponse(response);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const getMovieDiscover = async (params: any) => {
    try {
        const response = await globalRepository.getMovieDiscover(params);
        return handleResponse(response);

    } catch (error) {
        return Promise.reject(error);
    }
}