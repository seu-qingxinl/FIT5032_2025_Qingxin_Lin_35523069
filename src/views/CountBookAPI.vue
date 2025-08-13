<template>
    <div class="container py-4">
      <h1 class="mb-4">Authors & Books Summary</h1>
  
      <!-- 加载 & 错误状态 -->
      <p v-if="loading">Loading…</p>
      <p v-if="error" class="text-danger">{{ error }}</p>
  
      <!-- 成功返回 -->
      <div v-if="apiResponse">
        <h5>接口返回 JSON：</h5>
        <pre class="bg-light p-3 rounded">{{ jsonPretty }}</pre>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import rawAuthors from '@/assets/json/authors.json'   // 直接静态导入
  
  /* 响应式状态 */
  const loading      = ref(false)
  const error        = ref(null)
  const apiResponse  = ref(null)
  
  /* 统计用 */
  const authors      = ref([])
  const authorsCount = ref(0)
  const totalBooks   = ref(0)
  
  /* 计算属性：把对象格式化为带缩进的 JSON 字符串，template 里直接用 */
  const jsonPretty = computed(() =>
    JSON.stringify(apiResponse.value, null, 2)
  )
  
  /* 统计函数 */
  function calculateStats () {
    authorsCount.value = authors.value.length
    totalBooks.value   = authors.value.reduce(
      (sum, a) => sum + a.famousWorks.length,
      0
    )
  }
  
  /* “获取 API 数据”——这里模拟一次异步读取 */
  async function getApiData () {
    loading.value = true
    error.value   = null
  
    try {
      // 这里改为直接使用静态导入的数据，避免 fetch 路径问题
      authors.value = rawAuthors
      calculateStats()
  
      // 组装模拟的 API JSON
      apiResponse.value = {
        success: true,
        data: {
          authorsCount : authorsCount.value,
          totalBooks   : totalBooks.value,
          authors      : authors.value.map(a => ({
            name      : a.name,
            bookCount : a.famousWorks.length
          }))
        },
        timestamp: new Date().toISOString()
      }
    } catch (err) {
      error.value = `Error: ${err.message}`
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    getApiData()
  })
  
  /* 若其它组件想调用，可暴露方法 */
  defineExpose({ getApiData })
  </script>
  
  <style scoped>
  pre {
    white-space: pre-wrap;
    word-break : break-word;
  }
  </style>
  