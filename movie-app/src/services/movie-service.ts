import * as movieRepository from '../repositories/movie-repository';
import { handleResponse } from '../configs/apiResponse';

export const getMovieList = async (params: any, apiPath: string) => {
    try {
        const response = await movieRepository.getMovieList(params, apiPath);
        return handleResponse(response);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const getVideoById = async (id: number, params: any) => {
    try {
        const response = await movieRepository.getVideoById(id, params);
        return handleResponse(response);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const getMovieDetailById = async (id: number) => {
    try {
        const response = await movieRepository.getMovieDetailById(id);
        return handleResponse(response);

    } catch (error) {
        return Promise.reject(error);
    }
}