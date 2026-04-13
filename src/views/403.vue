<template>
  <div class="no-permission">
    <el-empty description="您暂无访问权限，请联系管理员"></el-empty>
    <el-button type="primary" @click="goBack" style="margin-top: 20px;">返回首页</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
// 返回首页
const goBack = () => {
  router.push('/login')
}
</script>

<style scoped>
.no-permission {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}
</style>