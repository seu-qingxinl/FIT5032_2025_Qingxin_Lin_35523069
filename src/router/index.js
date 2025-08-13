import { createRouter, createWebHistory } from 'vue-router'
import useAuth from '../composables/useAuth'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '../views/AccessDenied.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    { path: '/login', name: 'Login', component: LoginView },
    {
        path: '/about',
        name: 'About',
        component: AboutView
    },
    { path: '/denied', name: 'Denied', component: AccessDenied },
    { path: '/register', name: 'Register', component: FirebaseRegisterView },

    { path: '/addbook', name: 'AddBook', component: AddBookView },
    { path: '/WeatherCheck', name: 'GetWeather', component: WeatherView },
    { path: '/Firelogin', name: 'Firelogin', component: FirebaseSigninView },
    {
        path: '/CountBookAPI',
        name: 'CountBookAPI',
        component: CountBookAPI
      }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to) => {
    const { isAuthenticated } = useAuth()
    if (to.meta.requiresAuth && !isAuthenticated.value) {
        return '/denied'      // 或直接 return '/login'
    }
})
export default router
