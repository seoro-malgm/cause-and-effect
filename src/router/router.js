// src/router.ts
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import LayoutDefault from "@/layouts/LayoutDefault.vue";

const routes = [
  {
    path: "/",
    component: LayoutDefault,
    children: [
      {
        path: "",
        component: () => import("@/views/Home.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
