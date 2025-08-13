<template>
    <div class="container mt-5" style="max-width:400px">
      <h2 class="mb-3 text-center">Member Login</h2>
  
      <div v-if="error" class="alert alert-danger py-1">{{ error }}</div>
  
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input v-model="username" class="form-control" />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" />
        </div>
  
        <button class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import useAuth from '../composables/useAuth'
  
  const { login } = useAuth()
  const router = useRouter()
  
  const username = ref('')
  const password = ref('')
  const error = ref(null)
  
  function handleLogin() {
    if (login(username.value, password.value)) {
      router.push('/about')          // 成功后跳到受保护页
    } else {
      error.value = 'Wrong credentials'
    }
  }
  </script>
  