import Vue from "vue";
import Router from "vue-router";
import Test from "@/components/Test";
import Customers from "@/components/Customers";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Customers",
      component: Customers
    },
    {
      path: "/test",
      name: "Test",
      component: Test
    }
  ],
  mode: "history"
});
