/*
 * @Author: 清风
 * @Date: 2021-01-29 17:17:55
 * @Description: 
 */
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
const history = createWebHistory();

const routes: RouteRecordRaw[] = [
    {
      path: "/",
      component: () => import("@/pages/Home.vue")
    },
    {
      path: "/login",
      component: () => import("@/pages/Login.vue")
    },
    {
        path: "/utils",
        component: () => import("@/pages/Utils.vue")
      }
  ]

const router = createRouter({
  history,
  routes,
})
  
export default router;
