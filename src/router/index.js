import {createRouter,createWebHashHistory} from 'vue-router'
import Login from '@/pages/Login'
import ChatRoom from '@/pages/ChatRoom'

const routes=[
    {
        path:'/login',
        component:Login
    },
    {
        path:'/chatroom/:username',
        name:'chatroom',
        component:ChatRoom,
        beforeEnter:(to,from,next)=>{
            if(from.path=='/login'){
                next()
            }
            next('/login')
        }
    },
    {
        path:'/:catchAll(.*)',
        redirect:'/login'
    }
]

export default createRouter({
    history:createWebHashHistory(),
    routes
})