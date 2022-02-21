import {
    createApp
} from 'vue';
import {
    createPinia
} from 'pinia';
import App from './App.vue';

const pinia = createPinia();
import './registerServiceWorker';
import router from './router';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './assets/css/main.css';

createApp(App).use(pinia).use(router).mount('#app')