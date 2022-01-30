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
    path: "/auth/:menu?",
    name: "Auth",
    component: Auth,
    meta: {
      guest: true
    }
  },
  // {
  //   path: "/login",
  //   component: Auth,
  //   meta: {
  //     guest: true
  //   }
  // },
  // {
  //   path: "/register",
  //   component: Auth,
  //   meta: {
  //     guest: true
  //   }
  // },
  {
    path: '/transfer/:menu?',
    name: 'Send And Request',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/SendAndRequest.vue')
  },
  {
    path: '/help',
    name: 'Help',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Help.vue')
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
    `${process.env.VUE_APP_TITLE || "Default"}: ${docTitle}` :
    `${process.env.VUE_APP_TITLE || "Default"}`;

  if (to.name.toLowerCase() == "auth") {
    AuthService.check().then(response => {
      response.status != 401 ? window.location = '/' : null;
    });
  }

  if (!("guest" in to.meta)) {
    AuthService.check().then(response => {
      response.status != 401 ? next() : window.location = "/auth";
    });
  } else next();

  // next();
});


export default router