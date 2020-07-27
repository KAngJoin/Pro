import routerList from '../utils/routes';
import Home from "@/views/Home.vue";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    ...routerList
]
export default routes