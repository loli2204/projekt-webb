import { createRouter, createWebHistory } from 'vue-router';
import StartPage from './views/StartPage.vue';
import LoginPage from './views/LoginPage.vue';
import UserProfile from './views/UserProfile.vue';
import WorkoutsPage from './views/WorkoutPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: StartPage, meta: { requiresAuth: true } },
    { path: '/login', component: LoginPage },
    { path: '/profile', component: UserProfile, meta: { requiresAuth: true } },
    { path: '/workouts', component: WorkoutsPage, meta: { requiresAuth: true } }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Om sidan kräver inloggning
    if (!isAuthenticated) {
      // Om användaren inte är inloggad, omdirigera till login-sidan
      next('/login');
    } else {
      // Om användaren är inloggad, fortsätt till önskad sida
      next();
    }
  } else {
    // Om sidan inte kräver inloggning, fortsätt till önskad sida
    next();
  }
});

export default router;
