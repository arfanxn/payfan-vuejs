import {
  createStore
} from 'vuex'
import activity from './modules/activity.js';
import user from './modules/user.js';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    activity,
    user,
  }
})