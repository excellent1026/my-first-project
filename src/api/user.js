// src/api/user.js
import request from '@/utils/request' // 导入封装好的Axios

/**
 * 登录接口
 * @param {Object} data - 登录参数 {username: '', password: ''}
 * @returns {Promise} - 返回Promise对象
 */
export function login(data) {
    return request({
        url: '/user/login', // 后端接口路径（会被代理到8081端口）
        method: 'post',     // 请求方式（和后端一致）
        data               // 请求参数（JSON格式）
    })
}

/**
 * 获取用户列表接口
 * @returns {Promise} - 返回用户列表数据
 */
export function getUserList() {
    return request({
        url: '/user/list', // 后端接口路径
        method: 'get'      // 请求方式（和后端一致）
    })
}

/**
 * 新增用户接口（可选，后续扩展）
 * @param {Object} data - 用户信息
 * @returns {Promise}
 */
export function addUser(data) {
    return request({
        url: '/user/add',
        method: 'post',
        data
    })
}

/**
 * 删除用户接口（可选，后续扩展）
 * @param {Number} id - 用户ID
 * @returns {Promise}
 */
export function deleteUser(id) {
    return request({
        url: `/user/delete/${id}`,
        method: 'delete'
    })
}