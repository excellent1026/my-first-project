// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// 1. 公开路由（无需登录即可访问）
const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    redirect: '/login',
  },
];

// 2. 私有路由（需登录+对应角色）
const privateRoutes = [
  // 普通用户路由
  {
    path: '/user-list',
    name: 'UserList',
    component: () => import('@/views/UserList.vue'),
    meta: { role: ['USER', 'ADMIN'] }, // 允许 USER/ADMIN 访问
  },
];

// 3. 合并所有路由
const allRoutes = [...publicRoutes, ...privateRoutes];

// 4. 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes,
});

// 5. 路由守卫（权限控制核心）
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // 登录成功后存储的标识

  // 5.1 未登录：仅允许访问登录页
  if (!token) {
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
    return;
  }

  // 5.2 已登录：禁止重复登录
  if (to.path === '/login') {
    next(from.path || '/user-list');
    return;
  }

  // 5.3 角色校验（简化版，使用 localStorage 存储角色）
  const userRole = localStorage.getItem('userRole') || ''; // 登录后存储的用户角色
  const requiredRoles = to.meta.role || [];
  if (requiredRoles.length === 0 || requiredRoles.includes(userRole)) {
    next();
  } else {
    next('/user-list'); // 无权限则跳转到普通用户页
  }
});

export default router;
