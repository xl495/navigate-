import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Main from "../views/Main.vue";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "main",
        component: Main,
        children: [{
                path: "/user",
                component: () =>
                    import ('../views/user/'),
            },
            {
                path: "/cover",
                component: () =>
                    import ('../views/cover/'),
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue")
    }
];


const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        if (to.name !== 'Login') {
            Vue.prototype.$message.error('301 未登录!')
            next('/login')
        } else {
            next()
        }
    } else {
        next();
    }
})

export default router;