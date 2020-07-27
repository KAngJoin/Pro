export default {
    path: '/games',
    name: 'games',
    component: () => import('@/views/games'),
    meta: {
        title: 'Games',
        desc: ''
    },
    children: [
        {
            path: '/bullfight',
            name: 'bullfight',
            component: () => import('@/views/games/bullfight.vue'),
        }
    ]
}