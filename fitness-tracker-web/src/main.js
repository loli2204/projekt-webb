import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Se till att importera router


const app = createApp(App);
app.use(router); // Använd router här
app.mount('#app');
