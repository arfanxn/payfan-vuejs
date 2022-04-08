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
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './assets/css/main.css';

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_PUSHER_KEY,
    cluster: process.env.VUE_APP_PUSHER_CLUSTER,
    forceTLS: true,
    encrypted: true,
    // disableStats: false,
    authorizer: (channel, options) => {
        options
        return {
            authorize: (socketId, callback) => {
                axios.post('/api/broadcasting/auth', {
                        socket_id: socketId,
                        channel_name: channel.name
                    })
                    .then(response => {
                        callback(false, response.data);
                    })
                    .catch(error => {
                        callback(true, error);
                    });
            }
        };
    },
});

createApp(App).use(pinia).use(router).mount('#app')