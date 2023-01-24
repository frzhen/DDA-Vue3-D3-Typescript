/**
 * @Author: Fred R. Zhen
 * @Date: 2023/1/24 12:37
 * @Email: fred.zhen@gmail.com
 */
// default router file
import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/HomeContent.vue";
import D3Page from "../views/D3Page.vue";

// export all routes in a single array
// helps to make tests easier to access routes
export const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/d3',
    component: D3Page,
    meta: {
      requiresAuth: false
    }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

