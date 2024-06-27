import axios, { AxiosRequestConfig } from 'axios';
import { EndPoints } from '@/utils/urls';

class Service {
    async getAllCharacters(page: number) {
        const options: AxiosRequestConfig = {
            method: "get",
            url: EndPoints.CHARACTERS + '/?page=' + page
        }
        let response = await axios(options);
        return response.data;
    }

    async getCharactersByParams(params: string, page: number) {
        const options: AxiosRequestConfig = {
            method: "get",
            url: EndPoints.CHARACTERS + `/?page=${page}&${params}`
        }
        const response = await axios(options);
        return response.data;
    }
}

export default Service;