// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { initializeApp } from "firebase/app";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJDjNWrmANKdK-1URXB4Pe61t5Eb616PM",
  authDomain: "zhu-library.firebaseapp.com",
  projectId: "zhu-library",
  storageBucket: "zhu-library.firebasestorage.app",
  messagingSenderId: "210853663011",
  appId: "1:210853663011:web:1e30ed1e41f3b9658d7c96"
};

// Initialize Firebase
initializeApp(firebaseConfig);