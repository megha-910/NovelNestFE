import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log("TOKEN:", token);
        console.log("REQUEST:", config.method, config.url);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api;
//npm i axios