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
    path: '/:pathMatch(.*)*',
    component: () => import("@/views/Errors/404PageNotFound.vue")
  },
  {
    path: "/auth/:menu?",
    name: "Auth",
    component: Auth,
    meta: {
      guest: true
    }
  },
  {
    path: '/transfer/:menu?',
    name: 'Send And Request',
    component: () => import( /* webpackChunkName: "about" */ '../views/SendAndRequest.vue')
  },
  {
    path: "/activity",
    name: "Activity",
    component: () => import('@/views/Activity.vue'),
  },
  {
    path: '/help',
    name: 'Help',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Help.vue')
  },
  {
    path: "/account/settings/:menu?",
    name: "Account Settings",
    component: () => import("@/views/Settings.vue"),
  },
  {
    path: '/test/view',
    name: 'TestView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/TestView.vue')
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  let docTitle = String();

  if (to.name) {
    docTitle = to.name;
  } else if ("title" in to.meta) {
    docTitle = to.meta.title;
  }
  document.title = docTitle.length ?
    `${process.env.VUE_APP_TITLE || "Default"}: ${docTitle}` :
    `${process.env.VUE_APP_TITLE || "Default"}`;

  window.scrollTo(0, 0);

  if (to.name && to.name.toLowerCase() == "auth") {
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