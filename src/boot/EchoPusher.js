import Echo from 'laravel-echo';
import axios from 'axios';

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

