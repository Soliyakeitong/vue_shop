import axios from 'axios';
import { ElNotification } from 'element-plus'
import { useCookies } from '@vueuse/integrations/useCookies.mjs';


const service = axios.create({
    baseURL: '/api',
});

// 添加请求拦截器
service.interceptors.request.use(
    config => {
        const cookies = useCookies()
        const token = cookies.get('admin-token')
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
        ElNotification({
            message: error.response.data.msg || '请求失败，请稍后重试',
            type: 'error',
            duration: 2000
        })
        console.log(error)
        return Promise.reject(error);
    });

export default service;
