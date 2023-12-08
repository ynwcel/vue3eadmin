import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/main'
    },
    {
        path:'/login',
        name:"login",
        component:()=>import("../views/Login.vue")
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('../views/AppLayout.vue'),
      children:[
        {
            path:"/main",name:"main",component:()=>import("../views/Main.vue"),
        }
      ]
    }
  ]
})

router.beforeEach((to,from)=>{
    if(to.path.toLowerCase()!="/login"){
        let auth = useAuthStore();
        if(!auth.store.nickname || !auth.store.authtoken){
            return '/login';
        }
    }
})

export default router
