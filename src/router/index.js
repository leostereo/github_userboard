import { createRouter, createWebHistory } from "vue-router";
import UsersView from "../views/UsersView.vue";
import UserDetailsView from "../views/UserDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: UsersView,
    },
    { path: '/:username', component: UserDetailsView },

  ],
});

export default router;
