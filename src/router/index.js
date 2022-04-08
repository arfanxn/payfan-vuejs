import {
  createRouter,
  createWebHistory
} from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Auth from '../views/Auth.vue';
import AuthService from '../services/AuthService';
import {
  useAuthUserStore
}
from '@/stores/auth/AuthUserStore.js';

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
  const AuthUserStore = useAuthUserStore();
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

  // this if statement is used to prevent already loged in user to accessing the "auth" page (login/register page)
  if (to.name && to.name.toLowerCase() == "auth") { // if redirect to "auth" page then check for user already loged in or not logged in
    AuthService.check().then(response => {
      if (response.status != 401 && response.status == 200) { // if response status != 401 that means that user is already logged in 
        window.location = '/'; // if already logged in then redirect to "dashboard" page 
      }
    });
  }

  if (!("guest" in to.meta)) { // if "guest" is not in the "to.meta" object (that's mean the routes require Authentication)
    AuthService.check().then(response => {
      if (response.status != 401 && response.status == 200) {
        AuthUserStore['isLoggedIn'] = true;
        next() // next if user is already logged in
      } else { // if not logged in/authenticated then redirect to "auth" page
        AuthUserStore['isLoggedIn'] = false;
        window.location = "/auth";
      }
    });
  } else next();

  // next();
});


export default router