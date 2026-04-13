// src/utils/request.js
import axios from 'axios'
import { ElMessage } from 'element-plus' // 引入Element Plus提示框

// 创建Axios实例
const service = axios.create({
    // 基础请求路径（开发环境会被Vite代理替换，生产环境改后端真实地址）
    baseURL: import.meta.env.VITE_APP_BASE_API || '/api',
    timeout: 5000 // 请求超时时间（5秒）
})

// -------------------------- 请求拦截器（发请求前执行） --------------------------
service.interceptors.request.use(
    (config) => {
        // 1. 给请求头加token（登录后存在localStorage里）
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token // 后端常用的token格式
        }
        // 2. 统一设置请求头（比如JSON格式）
        config.headers['Content-Type'] = 'application/json;charset=utf-8'
        return config
    },
    (error) => {
        // 请求出错时的提示
        ElMessage.error('请求发送失败，请检查网络！')
        console.error('请求拦截器错误：', error)
        return Promise.reject(error)
    }
)

// -------------------------- 响应拦截器（接收到响应后执行） --------------------------
service.interceptors.response.use(
    (response) => {
        // 1. 取出后端返回的数据（一般后端返回 {code:200, data:..., msg:...}）
        const res = response.data

        // 2. 统一处理响应码
        if (res.code !== 200) { // 非200都是失败
            ElMessage.error(res.msg || '请求失败！')
            // 比如token过期，跳回登录页
            if (res.code === 401) {
                localStorage.removeItem('token') // 清空过期token
                window.location.href = '/login' // 跳回登录页
            }
            return Promise.reject(new Error(res.msg || 'Error'))
        } else { // 200成功，返回数据
            return res
        }
    },
    (error) => {
        // 后端接口报错/网络错误的处理
        ElMessage.error(error.message || '服务器错误！')
        console.error('响应拦截器错误：', error)
        return Promise.reject(error)
    }
)

// 导出封装后的Axios实例
export default service