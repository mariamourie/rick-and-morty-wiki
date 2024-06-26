import axios, { AxiosRequestConfig } from 'axios';
import { EndPoints } from '@/utils/urls';

class Service {
    async getAllCharacters(page: number) {
        let options: AxiosRequestConfig = {
            method: "get",
            url: EndPoints.CHARACTERS + '/?page=' + page
        }
        let response = await axios(options);
        return response.data;
    }

    async getCharactersBy(params: string, page: number) {
        let options: AxiosRequestConfig = {
            method: "get",
            url: EndPoints.CHARACTERS + `?page=${page}&${params}`
        }
        let response = await axios(options);
        return response.data;
    }
}

export default Service;