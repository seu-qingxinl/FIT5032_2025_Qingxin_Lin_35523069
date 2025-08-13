// src/composables/useAuth.js
import { ref } from 'vue'

// 最简单的“伪 store”
const isAuthenticated = ref(false)

function login(username, password) {
  // 硬编码账号
  if (username === 'admin' && password === '123456') {
    isAuthenticated.value = true
    return true
  }
  return false
}

function logout() {
  isAuthenticated.value = false
}

export default () => ({ isAuthenticated, login, logout })
