export default {
    path: '/upload',
    name: 'uploadFile',
    component: () => import('@/views/upload'),
    meta: {
        title: '文件处理',
        desc: '图片、视频、音频、表格、PDF、PPT'
    }
}