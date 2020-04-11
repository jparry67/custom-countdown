import Vue from "vue";
import VueRouter from "vue-router";
import Countdown from "../views/Countdown.vue";
import Create from "../views/Create.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Create",
    component: Create
  },
  {
    name: "Countdown",
    path: "/countdown/:id",
    component: Countdown
  },
  {
    path: "*", 
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
