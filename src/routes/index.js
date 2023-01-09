//pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';
import Resgister from '~/pages/Resgister';
import Admin from '~/pages/Admin';
import Cart from '~/pages/Cart';

//layouts
import AdminLayout from '~/layouts/AdminLayout/index';

export const publicPages = [
   { path: '/', component: Home },
   { path: '/profile', component: Profile },
   { path: '/login', component: Login, layout: null },
   { path: '/register', component: Resgister, layout: null },
   { path: '/admin', component: Admin, layout: AdminLayout },
   { path: '/cart', component: Cart },
];

export const privatePages = [];
