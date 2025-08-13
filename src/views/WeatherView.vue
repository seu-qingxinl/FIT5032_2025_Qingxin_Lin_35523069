<!-- src/views/WeatherView.vue -->
<template>
    <div class="container py-4">
      <h1 class="text-center mb-4">WEATHER APP</h1>
  
      <!-- 搜索栏 -->
      <div class="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-4">
        <input
          v-model="city"
          type="text"
          class="form-control"
          placeholder="Enter city name"
          @keyup.enter="searchByCity"
        />
        <button class="btn btn-primary" @click="searchByCity">Search</button>
      </div>
  
      <!-- 错误提示 -->
      <p v-if="error" class="text-danger text-center">{{ error }}</p>
  
      <!-- 天气展示 -->
      <main v-if="weatherData" class="text-center mt-4">
        <h2>
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
  
        <div class="d-flex justify-content-center align-items-center gap-3 my-3">
          <img :src="iconUrl" alt="Weather Icon" />
          <p class="display-6 mb-0">{{ temperature }} °C</p>
        </div>
  
        <span class="text-capitalize">
          {{ weatherData.weather[0].description }}
        </span>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  
  /* ---------- 你的 OpenWeather API Key ---------- */
  const apiKey = '85c57842bf8abaa96e5669acd2af36c0'   // ← 替换成真实 key
  
  /* ---------- 响应式数据 ---------- */
  const city        = ref('')
  const weatherData = ref(null)
  const error       = ref(null)
  
  /* ---------- 计算属性 ---------- */
  const temperature = computed(() =>
    weatherData.value ? Math.floor(weatherData.value.main.temp - 273) : null
  )
  const iconUrl = computed(() =>
    weatherData.value
      ? `https://openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`
      : null
  )
  
  /* ---------- 方法 ---------- */
  async function searchByCity () {
    if (!city.value.trim()) return
    error.value = null
    weatherData.value = null
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city.value
    )}&appid=${apiKey}`
  
    await fetchWeatherData(url)
  }
  
  async function fetchWeatherData (url) {
    try {
      const { data } = await axios.get(url)
      weatherData.value = data
    } catch (err) {
      console.error(err)
      error.value =
        err.response?.data?.message || 'Unable to fetch weather data.'
    }
  }
  
  /* ---------- mounted：尝试用浏览器定位 ---------- */
  onMounted(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async pos => {
          const { latitude, longitude } = pos.coords
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
          await fetchWeatherData(url)
        },
        () => {
          error.value =
            'Could not get current location, please search by city name.'
        }
      )
    }
  })
  </script>
  
  <style scoped>
  /* 简单局部样式：可按需调整 */
  img {
    width: 80px;
    height: 80px;
  }
  </style>
  