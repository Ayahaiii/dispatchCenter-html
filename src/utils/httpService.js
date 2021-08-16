import axios from 'axios';
let qs = require('qs');

axios.defaults.withCredentials = true;

let baseUrl = '/api';

/**
 * get 请求
 */
const httpGet = function (url = '', data = {}) {
    const instance = axios.create({
        baseURL: baseUrl,
        headers: {
            'Accept': 'application/json;charset=UTF-8',
            'content-type': 'application/json'
        }
    });
    // http get request 拦截器
    instance.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token')
            if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers.common["tokenWeb"] = token //请求头加上token
            }
            return config
        },
        err => {
            return Promise.reject(err)
        })
    return instance.get(url, {
        params: data
    }).then((result) => {
        var res = result.data;
        if (res) {
            return Promise.resolve(res);
        } else {
            this.$message({
                message: res.message,
                type: 'info'
            });
        }
    }).catch(() => {
        console.log('网络请求错误');
    })
}

/** 
 * post 请求
 */
const httpPost = function (url = '', data = {}) {
    const instance = axios.create({
        baseURL: baseUrl,
        headers: {
            'Accept': 'application/json;charset=UTF-8',
            'content-type': 'application/json'
        }
    });
    // // //axios拦截器--request请求拦截(需求：拦截后修改配置信息)---
    // instance.interceprors.request.use(config => {
    //     console.log(config); //这里打印的是一些成功后的请求配置信息
    //     //request请求拦截(需求：拦截后修改配置信息,2.配置请求动画图标3.某些网络请求-登录携带token
    //     return config //拦截后要返回，不然报错，接收不到数据
    // }, err => {
    //     console.log(err);
    // })
    // http post request 拦截器
    instance.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token')
            if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers.common["tokenWeb"] = token //请求头加上token
            }
            return config
        },
        err => {
            return Promise.reject(err)
        })
    return instance.post(url, JSON.stringify(data)).then((result) => {
        var res = result.data;
        // console.log(res)
        if (res && res.code === 0) {
            return Promise.resolve(res);
        } else {
            this.$message({
                message: res.message,
                type: 'info'
            });
        }
    }).catch(() => {
        console.log('网络请求错误');
        console.log(url);
    })
}

export {
    baseUrl,
    httpGet,
    httpPost
}