import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import {date, Notify} from "quasar";
import jwtDecode from "jwt-decode";

// import profileRouter from "../modules/profile/router/index";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store } ) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

Router.beforeEach((to, from, next) => {


   const userRole = store.state.user.status

   switch (userRole) {
     case 'not-authenticated':
       if (to.meta.public) {
         next()
         break
       } else {
         console.log("Permission denied")
         next("/")
         break
       }
     case 'authenticated':
       if (to.meta.protected || to.meta.public) {
         next()
         return
       } else {
         console.log("Permission denied")
         next("/")
         break
       }
     case 'super-admin':
       if (to.meta.protected || to.meta.public || to.meta.super || to.meta.both) {
         next()
         break
       } else {
         console.log("Permission denied")
         next("/")
         break
       }
     case 'administrator':
       if (to.meta.protected || to.meta.public || to.meta.admin || to.meta.both) {
         next()
         break
       } else {
         console.log("Permission denied")
         next("/")
         break
       }
   }
 })
  return Router;

})
