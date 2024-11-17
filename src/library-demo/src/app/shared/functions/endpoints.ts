import { ConfigResponse } from "../models/config-response";

export const Endpoints = () => {
    const rawData = sessionStorage.getItem("endpoints");
    if (rawData) {
        const data: ConfigResponse = JSON.parse(rawData);
        return data;
    }
    return {
        endpoints: {
            Statistics: '',
            Library: ''
        }
    }
}