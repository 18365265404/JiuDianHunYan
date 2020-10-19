




let routes= [
    {
        path: '/',
        name:"dashboard",
        redirect: '/dashboard'
    },
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '自述文件' },
        children:[
            
            {
                path: '/UserManagement',
                name:"UserManagement",
                component: resolve => require(['../components/page/UserManagement.vue'], resolve),
                meta: { title: '用户管理' }
            },
            {
                path: '/ResourceManagement',
                name:"ResourceManagement",
                component: resolve => require(['../components/page/ResourceManagement.vue'], resolve),
                meta: { title: '资源管理' }
            },
            {
                path: '/RoleManagement',
                name:"RoleManagement",
                component: resolve => require(['../components/page/RoleManagement.vue'], resolve),
                meta: { title: '角色管理' }
            },
            {
                path: '/CityManagement',
                name:"CityManagement",
                component: resolve => require(['../components/page/CityManagement.vue'], resolve),
                meta: { title: '城市管理' }
            },
            {
                path: '/WeddingBanquetHotel',
                name:"WeddingBanquetHotel",
                component: resolve => require(['../components/page/WeddingBanquetHotel.vue'], resolve),
                meta: { title: '婚宴酒店' }
            },
            {
                path: '/HomeRotaryMap',
                name:"HomeRotaryMap",
                component: resolve => require(['../components/page/HomeRotaryMap.vue'], resolve),
                meta: { title: '首页轮播图' }
            },

            {
                path: '/TopReview',
                name:"TopReview",
                component: resolve => require(['../components/page/TopReview.vue'], resolve),
                meta: { title: '上热门审核' }
            },

            {
                path: '/HotHotelRecommendation',
                name:"HotHotelRecommendation",
                component: resolve => require(['../components/page/HotHotelRecommendation.vue'], resolve),
                meta: { title: '热门酒店推荐' }
            },

            {
                path: '/PlanningCases',
                name:"PlanningCases",
                component: resolve => require(['../components/page/PlanningCases.vue'], resolve),
                meta: { title: '策划案例' }
            },

            {
                path: '/HotWeddingPlanningRecommendation',
                name:"HotWeddingPlanningRecommendation",
                component: resolve => require(['../components/page/HotWeddingPlanningRecommendation.vue'], resolve),
                meta: { title: '热门策划案例推荐' }
            },

            {
                path: '/ThreeStepDataSearch',
                name:"ThreeStepDataSearch",
                component: resolve => require(['../components/page/ThreeStepDataSearch.vue'], resolve),
                meta: { title: '三步查数据' }
            },

            {
                path: '/FriendshipLinks',
                name:"FriendshipLinks",
                component: resolve => require(['../components/page/FriendshipLinks.vue'], resolve),
                meta: { title: '友情链接' }
            },

            {
                path: '/HomepageAds',
                name:"HomepageAds",
                component: resolve => require(['../components/page/HomepageAds.vue'], resolve),
                meta: { title: '首页广告' }
            },
            
            
            
            
            

            
            
            {
                path: '/dashboard',
                name:"dashboard",
                component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                meta: { title: '系统首页' }
            },

            {
                path: '/404',
                name: '404',
                component: resolve => require(['../components/page/404.vue'], resolve),
                meta: { title: '404' }
            },
            {
                path: '/403',
                name: '403',
                component: resolve => require(['../components/page/403.vue'], resolve),
                meta: { title: '403' }
            }
        ]
    },
    {
        path: '/changePass',
        name:"changePass",
        component: resolve => require(['../components/page/ChangePass.vue'], resolve),
        meta: { title: 'denglu' }
    },
    {
        path: '/login',
        name:"login",
        component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
        path: '*',
        name:"404",
        redirect: '/404'
    }
]


// export default routes;
export default {routes}