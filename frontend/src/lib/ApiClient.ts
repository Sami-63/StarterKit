import { store } from "@/redux/store";
import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:8000/api/",
    timeout: 60000,
});

apiClient.interceptors.request.use((config) => {
    const access_token = store.getState().auth.token;
    if (access_token) {
        config.headers.Authorization = `Token ${access_token}`;
    }
    return config;
});
