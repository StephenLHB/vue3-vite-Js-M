import axios from "axios"
import { ElNotification } from "element-plus"
import router from "@/router";
import qs from "qs";


let service = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    paramsSerializer: (params) => qs.stringify(params, { indices: false }), // get请求序列化处理
    timeout: 50000
})


// // 请求拦截
// service.interceptors.request.use((config) => {
//     // 统一加上token
//     const token = sessionStorage.getItem('token')
//     // 将token设置成请求头
//     token && (config.headers.Authorization = token)

//     return config
// }, error =>  Promise.reject(error)
// )


// 响应拦截
service.interceptors.response.use(
    response => {
        return response;
    },
    error =>  Promise.reject(error)
)

function generateErrorOperation(code) {
    let message = '';
    switch (code) {
        case 401:
            sessionStorage.clear();
            router.push("/")
            break;
        case 403:
            message = "未授权的操作";
            break;
        case 404:
            message = "您所请求的资源无法找到";
            break;
        case 500:
            message = "服务器内部错误，无法完成请求";
            break;
        case 501:
            message = "服务器未实现";
            break;
        case 502:
            message = "网关错误";
            break;
        case 504:
            message = "网关超时";
            break;
        default:
            message = "服务暂不可用，请稍后再试";
    }
    if (message != '') {
        ElNotification({
            title: '提示',
            message: message,
            type: 'error',
            duration: 1500
        });
    }
}


export default {
    //get请求
    get(url, param) {
        return new Promise((resolve, reject) => {
            service({
                method: 'get',
                url,
                params:  param
            }).then(res => {
                let data = res.data;
                if (data.code === 200) {
                    resolve(data)
                } else {
                    // 注：振动、温度实时监测数据get接口返回值500时，因为设备没有传输数据，没有创建表，查不到数据库报错
                    /* if(url === '/statusMonitoring/tempVibMonitoring/list' && data.code === 500){
                        data.data = []
                        resolve(data)
                    }else { */
                        if(data.code === 401){
                            sessionStorage.clear();
                            router.push("/")
                            ElNotification({
                                title: '提示',
                                message: '账号已过期，请重新登录',
                                type: 'warning',
                                duration: 1500
                            });
                        }else {
                            ElNotification({
                                title: '提示',
                                message: data.msg,
                                type: 'warning',
                                duration: 1500
                            });
                        }
                    // }
                }
            }).catch(error => {
                if (error.response) {
                    generateErrorOperation(error.response.status)
                } else {
                    ElNotification({
                        title: '提示',
                        message: error.msg,
                        type: 'error',
                        duration: 1500
                    });
                }
            })
        })
    },
    //post请求
    post(url, param) {
        return new Promise((resolve, reject) => {
            service({
                method: 'post',
                url,
                data: param
            }).then(res => {
                let data = res.data;
                if (data.code === 200) {
                    resolve(data)
                } else {
                    if(data.code === 401){
                        sessionStorage.clear();
                        router.push("/")
                        ElNotification({
                            title: '提示',
                            message: '账号已过期，请重新登录',
                            type: 'warning',
                            duration: 1500
                        });
                    }else {
                        ElNotification({
                            title: '提示',
                            message: data.msg,
                            type: 'warning',
                            duration: 1500
                        });
                    }
                }
            }).catch(error => {
                if (error.response) {
                    generateErrorOperation(error.response.status)
                } else {
                    ElNotification({
                        title: '提示',
                        message: error.msg,
                        type: 'error',
                        duration: 1500
                    });
                }
            })
        })
    },

    // put请求
    // put(url, param) {
    //     return new Promise((resolve, reject) => {
    //         service({
    //             method: 'put',
    //             url,
    //             data: param
    //         }).then(res => {
    //             let data = res.data;
    //             if (data.code === 200) {
    //                 resolve(data)
    //             } else {
    //                 if(data.code === 401){
    //                     sessionStorage.clear();
    //                     router.push("/")
    //                     ElNotification({
    //                         title: '提示',
    //                         message: '账号已过期，请重新登录',
    //                         type: 'warning',
    //                         duration: 1500
    //                     });
    //                 }else {
    //                     ElNotification({
    //                         title: '提示',
    //                         message: data.msg,
    //                         type: 'warning',
    //                         duration: 1500
    //                     });
    //                 }
    //             }
    //         }).catch(error => {
    //             if (error.response) {
    //                 generateErrorOperation(error.response.status)
    //             } else {
    //                 ElNotification({
    //                     title: '提示',
    //                     message: error.msg,
    //                     type: 'error',
    //                     duration: 1500
    //                 });
    //             }
    //         })
    //     })
    // },

    //delete请求
    // delete(url, param) {
    //     return new Promise((resolve, reject) => {
    //         service({
    //             method: 'delete',
    //             url,
    //             data: param
    //         }).then(res => {
    //             let data = res.data;
    //             if (data.code === 200) {
    //                 resolve(data)
    //             } else {
    //                 if(data.code === 401){
    //                     sessionStorage.clear();
    //                     router.push("/")
    //                     ElNotification({
    //                         title: '提示',
    //                         message: '账号已过期，请重新登录',
    //                         type: 'warning',
    //                         duration: 1500
    //                     });
    //                 }else {
    //                     ElNotification({
    //                         title: '提示',
    //                         message: data.msg,
    //                         type: 'warning',
    //                         duration: 1500
    //                     });
    //                 }
    //             }
    //         }).catch(error => {
    //             if (error.response) {
    //                 generateErrorOperation(error.response.status)
    //             } else {
    //                 ElNotification({
    //                     title: '提示',
    //                     message: error.msg,
    //                     type: 'error',
    //                     duration: 1500
    //                 });
    //             }
    //         })
    //     })
    // },
}

