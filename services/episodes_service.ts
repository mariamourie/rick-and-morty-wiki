import axios, { AxiosRequestConfig } from 'axios';
import { EndPoints } from '@/utils/urls';

class Service {
    async getAllEpisodes(page: number) {
        let options: AxiosRequestConfig = {
            method: "get",
            url: `${EndPoints.EPISODES}/?page=${page}`
        }
        const response = await axios(options);
        return response.data;
    }
    async getEpisodeByParams(page: number, params: string) {
        const options: AxiosRequestConfig = {
            method: "get",
            url: `${EndPoints.EPISODES}/?page=${page}&${params}`
        }
        const response = await axios(options);
        return response.data;
    }
}

export default Service;