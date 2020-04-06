import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Countdown from "../views/Countdown.vue";
import Create from "../views/Create.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/create",
    name: "Create",
    component: Create
  },
  {
    path: "/countdown/:id",
    component: Countdown
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
