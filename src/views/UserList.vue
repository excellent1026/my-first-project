<template>
  <div class="user-list-container">
    <h2>用户列表</h2>
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
      <tr>
        <th>ID</th>
        <th>用户名</th>
        <th>密码</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in userList" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.password }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 定义用户列表数据
const userList = ref([])

// 页面加载时获取用户列表
onMounted(async () => {
  try {
    // 发送请求（代理会转发到后端 /student/list）
    const res = await axios.get('/user/list')
    userList.value = res.data
  } catch (error) {
    alert('获取用户列表失败：' + error.message)
  }
})
</script>

<style scoped>
.user-list-container {
  width: 600px;
  margin: 50px auto;
}
table {
  width: 100%;
  text-align: center;
}
</style>