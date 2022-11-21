import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            name: "BlogList",
            component: () => import("@/pages/BlogList")
        },
        {
            path: "/view",
            name: "BlogView",
            component: () => import("@/pages/BlogView")
        },
    ]
});

export default router;
