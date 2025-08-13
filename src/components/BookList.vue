<template>
  <div class="mt-4">
    <h3>Books with ISBN &gt; 1000</h3>

    <ul v-if="books.length" class="list-group">
      <li
        v-for="book in books"
        :key="book.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>{{ book.name }} — ISBN: {{ book.isbn }}</span>

        <button
          class="btn btn-sm btn-danger"
          @click="removeBook(book.id)"
        >
          Delete
        </button>
      </li>
    </ul>

    <p v-else class="text-muted">No records found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted }       from 'vue'
import  db from '../firebase/init'
import {
  collection, query, where,
  getDocs, deleteDoc, doc
} from 'firebase/firestore'

const books = ref([])


async function fetchBooks () {
  const q    = query(collection(db, 'books'), where('isbn', '>', 1000))
  const snap = await getDocs(q)
  books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
}


async function removeBook (id) {
  if (!confirm('Delete this book?')) return
  try {
    await deleteDoc(doc(db, 'books', id))

    books.value = books.value.filter(b => b.id !== id)
  } catch (err) {
    console.error('Delete failed:', err)
    alert(err.code ?? 'Delete failed')
  }
}

onMounted(fetchBooks)
</script>
