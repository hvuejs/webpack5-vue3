/*
 * @Author: 清风
 * @Date: 2021-01-29 17:17:55
 * @Description: 
 */
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../pages/Home.vue")
    },
    {
      path: "/login",
      component: () => import("../pages/Login.vue")
    }
  ]
})
  
export default router