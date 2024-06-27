import axios, { AxiosRequestConfig } from 'axios';
import { EndPoints } from '@/utils/urls';

class Service {
    async getAllLocations(page: number) {
        let options: AxiosRequestConfig = {
            method: "get",
            url: `${EndPoints.LOCATION}/?page=${page}`
        }
        let response = await axios(options);
        return response.data;
    }

    async getLocationByParams(page: number, params: string) {
        let options: AxiosRequestConfig = {
            method: "get",
            url: `${EndPoints.LOCATION}/?page=${page}&${params}`
        }
        console.log(options.url);
        let response = await axios(options);
        return response.data;
    }
}

export default Service;