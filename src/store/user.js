// src/store/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        username: '',
        role: '' // 存储用户角色：ADMIN/USER
    }),
    actions: {
        // 登录成功后存储用户信息
        setUserInfo(username, role) {
            this.username = username
            this.role = role
            localStorage.setItem('token', 'xxx') // 实际项目用后端返回的 token
        },
        // 退出登录清空信息
        logout() {
            this.username = ''
            this.role = ''
            localStorage.removeItem('token')
        }
    }
})