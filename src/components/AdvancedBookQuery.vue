<template>
    <div class="card mt-5">
      <div class="card-header">Custom Book Query</div>
  
      <div class="card-body">
        <!-- 条件选择 -->
        <form class="row g-3" @submit.prevent="runQuery">
          <!-- where -->
          <div class="col-md-4">
            <label class="form-label">Field</label>
            <select v-model="whereField" class="form-select">
              <option value="">-- None --</option>
              <option value="isbn">isbn</option>
              <option value="name">name</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Operator</label>
            <select v-model="whereOp" class="form-select" :disabled="!whereField">
              <option value="==">==</option>
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value=">=">&gt;=</option>
              <option value="<=">&lt;=</option>
            </select>
          </div>
          <div class="col-md-5">
            <label class="form-label">Value</label>
            <input
              v-model="whereValue"
              type="text"
              class="form-control"
              :disabled="!whereField"
            />
          </div>
  
          <!-- orderBy -->
          <div class="col-md-4">
            <label class="form-label">Order By</label>
            <select v-model="orderField" class="form-select">
              <option value="">-- None --</option>
              <option value="isbn">isbn</option>
              <option value="name">name</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Direction</label>
            <select v-model="orderDir" class="form-select" :disabled="!orderField">
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </select>
          </div>
  
          <!-- limit -->
          <div class="col-md-3">
            <label class="form-label">Limit</label>
            <input v-model.number="limitNum" type="number" class="form-control" min="1" />
          </div>
  
          <div class="col-md-2 d-grid">
            <button class="btn btn-primary mt-4">Run</button>
          </div>
        </form>
  
        <!-- 结果 -->
        <hr />
        <h5 v-if="books.length">Result ({{ books.length }})</h5>
        <p v-else class="text-muted">No data.</p>
  
        <ul class="list-group">
          <li
            v-for="b in books"
            :key="b.id"
            class="list-group-item d-flex justify-content-between"
          >
            <span>{{ b.name }}</span><span class="text-muted">ISBN: {{ b.isbn }}</span>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import db from '../firebase/init.js'
  import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs
  } from 'firebase/firestore'
  
  /* --- 用户输入绑定 --- */
  const whereField  = ref('')
  const whereOp     = ref('==')
  const whereValue  = ref('')
  const orderField  = ref('')
  const orderDir    = ref('asc')
  const limitNum    = ref(null)
  
  /* --- 结果数组 --- */
  const books = ref([])
  
  /* --- 构造查询并执行 --- */
  async function runQuery () {
    try {
      let q = collection(db, 'books')
  
      // where
      if (whereField.value) {
        // Firestore 会把字符串当字符串，数字请确保是 number 类型
        const val =
          whereField.value === 'isbn'
            ? Number(whereValue.value)
            : whereValue.value
        q = query(q, where(whereField.value, whereOp.value, val))
      }
  
      // orderBy
      if (orderField.value) {
        q = query(q, orderBy(orderField.value, orderDir.value))
      }
  
      // limit
      if (limitNum.value) {
        q = query(q, limit(limitNum.value))
      }
  
      // 执行
      const snap = await getDocs(q)
      books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    } catch (err) {
      console.error(err)
      alert(err.code ?? 'Query failed')
    }
  }
  </script>
  