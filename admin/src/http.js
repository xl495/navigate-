import axios from "axios";
import Vue from 'vue'
const http = axios.create({
    baseURL: "http://localhost:3000/admin/api"
});

http.interceptors.request.use(function(config) {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`
    }
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

http.interceptors.response.use(
    function(response) {
        return response.data;
    },
    function(error) {
        switch (error.response.status) {
            case 422:
                Vue.prototype.$message.error(error.response.data.message)
                break;

            default:
                Vue.prototype.$message.error(error.response.data.message)
                break;
        }
        return Promise.reject(error);
    }
);

export default http;