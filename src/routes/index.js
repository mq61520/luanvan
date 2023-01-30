//pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';
import Resgister from '~/pages/Resgister';
import Admin from '~/pages/Admin';
import Cart from '~/pages/Cart';
import ProductDetails from '~/pages/ProductDetails';
import OrderManager from '~/pages/OrderManager';

//layouts
import AdminLayout from '~/layouts/AdminLayout/index';
import ProductsManager from '~/pages/ProductsManager/index';

export const publicPages = [
   { path: '/', component: Home },
   { path: '/profile', component: Profile },
   { path: '/login', component: Login, layout: null },
   { path: '/register', component: Resgister, layout: null },
   { path: '/cart', component: Cart },
   { path: '/detail/:slug', component: ProductDetails },
   { path: '/admin', component: Admin, layout: AdminLayout },
   { path: '/admin/productsmanager', component: ProductsManager, layout: AdminLayout },
   { path: '/admin/ordermanager', component: OrderManager, layout: AdminLayout },
];

export const privatePages = [];
