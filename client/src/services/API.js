import axios from "axios";
import Vue from "vue";
export default () => {
    let axiosInstance = axios.create({
        baseURL: 'https://identitytoolkit.googleapis.com/v1'
    });
    Vue.use(axiosInstance)
    return axiosInstance;
}