import {
  createRouter,
  createWebHistory
} from 'vue-router';
import store from '../store';
import Dashboard from '../views/Dashboard.vue';
import Auth from '../views/Auth.vue';
import AuthService from '../services/AuthService';
store;


const routes = [{
    path: '/',
    name: 'Dashboard',
    component: Dashboard // import("../views/Dashboard.vue") 
  },
  {
    path: "/authenticate",
    name: "Authenticate",
    component: Auth,
    meta: {
      guest: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  let docTitle = String();

  if ("name" in to) {
    docTitle = to.name;
  } else if ("title" in to.meta) {
    docTitle = to.meta.title;
  }
  document.title = docTitle.length ?
    `${docTitle} | ${process.env.VUE_APP_TITLE || "Default"}` :
    `${process.env.VUE_APP_TITLE || "Default"}`;

  if (to.name.toLowerCase() == "authenticate") {
    AuthService.check().then(response => {
      response.status != 401 ? window.location = '/' : null;
    });
  }

  if (!("guest" in to.meta)) {
    AuthService.check().then(response => {
      response.status != 401 ? next() : window.location = "/authenticate";
    });
  } else next();

  // next();
});


export default router