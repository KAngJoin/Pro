import Home from "../views/Home.vue"
export const mainRouter = {
    path: '/',
    name: 'mainRouter',
    redirect: '/home',
    meta: {
        title: 'Happy Twelve'
    },
    component: Home,
    children: [
        {
            path: '/home',
            name: 'Home',
            meta: {
                title: 'Happy Twelve'
            },
            component: resolve => { require(['@/views/homePage/homePage.vue'], resolve); },
        },
        {
            path: '/rules',
            name: 'rules',
            meta: {
                title: '规则介绍'
            },
            component: resolve => { require(['@/views/basic/Rules.vue'], resolve); },
        },
        {
            path: '/double',
            name: 'double',
            meta: {
                title: 'Double'
            },
            component: resolve => { require(['@/views/double/Double.vue'], resolve); },
        }

    ]
}
export const defaultRouter = [
    {
        path: '/analyze',
        name: 'analyze',
        meta: {
            title: '数据分析图表'
        },
        component: Home,
        children: [
            {
                path: '/analyze/sum',
                name: 'sum',
                meta: {
                    title: '和值分析'
                },
                component: resolve => { require(['@/views/analyze/Sum.vue'], resolve); },
            },
            {
                path: '/analyze/span',
                name: 'span',
                meta: {
                    title: '跨度值分析'
                },
                component: resolve => { require(['@/views/analyze/Span.vue'], resolve); },
            }
        ]
    }
]
export const routers = [
    mainRouter,
    ...defaultRouter
]