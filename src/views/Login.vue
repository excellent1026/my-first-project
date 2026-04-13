<!-- src/views/Login.vue -->
<template>
  <div class="login-container">
    <h2>用户登录</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label>用户名：</label>
        <input v-model="username" type="text" placeholder="请输入用户名" />
      </div>
      <div>
        <label>密码：</label>
        <input v-model="password" type="password" placeholder="请输入密码" />
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const res = await axios.post('/user/login', {
      username: username.value,
      password: password.value
    })
    if (res.data.code === 200) {
      // 存储用户信息到 localStorage
      localStorage.setItem('token', 'xxx') // 实际项目用后端返回的 token
      localStorage.setItem('username', res.data.username)
      localStorage.setItem('userRole', res.data.role.replace('ROLE_', ''))
      // 跳转到用户列表页
      router.push('/user-list')
    } else {
      alert(res.data.msg)
    }
  } catch (error) {
    alert('登录失败：' + error.message)
  }
}
</script>