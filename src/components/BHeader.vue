<template>
  <!-- Bootstrap Header -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills w-100">

        <!-- 左侧导航 -->
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>

        <!-- 仅登录后可见 -->
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>

        <!-- 右侧 Login / Logout -->
        <li class="nav-item ms-auto" v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li class="nav-item ms-auto" v-else>
          <a href="#" class="nav-link" @click.prevent="logoutAndGo">Logout</a>
        </li>
        <li class="nav-item">
          <router-link to="/Firelogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link" active-class="active">FireRegister</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">AddBook</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">
            Get Weather
          </router-link>

        </li>
        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">
            CountBookAPI
          </router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'   // ← 第 4 步创建的简易 auth

const { isAuthenticated, logout } = useAuth()
const router = useRouter()

function logoutAndGo() {
  logout()              // 1) 清除认证状态
  router.push('/login') // 2) 跳回登录页
}
</script>

<style scoped>
/* 保留你原有的 Bootstrap demo 样式——若无冲突可不动 */
</style>
