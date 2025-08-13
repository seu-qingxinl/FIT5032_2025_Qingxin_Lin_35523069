<template>
    <div class="container mt-5" style="max-width:480px">
      <h1 class="text-center mb-4">Add Book</h1>
  

      <form @submit.prevent="addBook">
        <!-- ISBN -->
        <div class="mb-3">
          <label for="isbn" class="form-label">ISBN (Number)</label>
          <input
            id="isbn"
            type="text"
            class="form-control"
            v-model="isbn"
            required
          />
        </div>
  

        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            id="name"
            type="text"
            class="form-control"
            v-model="name"
            required
          />
        </div>
  
        <button type="submit" class="btn btn-primary w-100">Add Book</button>
      </form>
      <BookList />
      <AdvancedBookQuery />

      <div v-if="message" class="alert alert-success mt-3">{{ message }}</div>
  

    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // ① 从你写的 firebase/init.js 命名导出 db
  import db from '../firebase/init.js'          // 路径按自己项目调整
  import { collection, addDoc } from 'firebase/firestore'
  
  // 可选：图书列表组件
  import BookList from '../components/BookList.vue'
  import AdvancedBookQuery from '../components/AdvancedBookQuery.vue'
  const isbn = ref('')
  const name = ref('')
  const message = ref(null)
  
  /** 提交表单：写入 Firestore */
  async function addBook () {
    try {
      // 转成数字并校验
      const isbnNumber = Number(isbn.value)
      if (Number.isNaN(isbnNumber)) {
        alert('ISBN must be a valid number')
        return
      }
  
      // ② 写入 books 集合
      await addDoc(collection(db, 'books'), {
        isbn: isbnNumber,
        name: name.value
      })
  
      message.value = 'Book added successfully!'
  
      // 清空输入框
      isbn.value = ''
      name.value = ''
    } catch (err) {
      console.error('Error adding book:', err)
      alert(err.code ?? 'Add book failed')
    }
  }
  </script>
  