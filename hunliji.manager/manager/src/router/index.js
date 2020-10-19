import Vue from 'vue';
import Router from 'vue-router';
import routes from './router.config'
import sessionStorage from '../utils/sessionStorage'
Vue.use(Router);

let router = new Router(routes);

//         const nextRoute = ['login','dashboard', 'UserManagement', 'ResourceManagement', 'RoleManagement', 'CityManagement', 'WeddingBanquetHotel', 'HomeRotaryMap', 'TopReview',

router.beforeEach((to, from, next) => {
    
        const nextRoute = ['changePass','dashboard', 'UserManagement', 'ResourceManagement', 'RoleManagement', 'CityManagement', 'WeddingBanquetHotel', 'HomeRotaryMap', 'TopReview',]
        // let isLogin = localStorage.getItem('ms_userId'); // 判断是否登录，本地存储有用户数据则视为已经登录
        let isLogin = sessionStorage.getSessionStorage('ms_userId');
        if (nextRoute.indexOf(to.name) >= 0) { // 检测是否登录的页面
            if (!isLogin) { // 如果未登录（本地存储无用户数据），并且要跳到登录页面
              if (from.name === 'login') {
                next('/login')
                return
              }
        　　　　// 登录后，跳到到当前页面
              router.push({
                name: 'login',
                params: {redirect: to.fullPath}  
              //   params: {redirect: to.fullPath} 
               
              })
            }
          }
          // 已登录状态；当路由到 UserLogIn 时，跳转至 Home
          if (to.name === 'login') {
            if (isLogin) {
              next('/home')
              return
            }
          }
          next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
        })
export default router