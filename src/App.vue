<template>
  <!-- 路由出口：未来的登录页、列表页都会显示在这里 -->
  <router-view></router-view>
</template>

<script setup>
// 暂时无逻辑
</script>

<style scoped>
/* 全局样式：去除默认边距 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #f5f5f5;
}
</style>