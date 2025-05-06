import axios from 'axios';
import { getToken } from '~/composables/auth'
import { toast } from '~/composables/utils'

const service = axios.create({
    baseURL: '/api',
});

// 添加请求拦截器
service.interceptors.request.use(
    config => {
        const token = getToken()
        if(token){
            config.headers["token"] = token
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//添加响应拦截器
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        toast(error.response.data.msg || '请求失败，请稍后重试', 'error')
        return Promise.reject(error);
    });

export default service;
