//pages
//customer
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';
import Resgister from '~/pages/Resgister';
import Cart from '~/pages/Cart';
import SubmitPay from '~/pages/SubmitPay';
import ProductDetails from '~/pages/ProductDetails';
import Orders from '~/pages/Orders';
import Brand from '~/pages/Brand';
import Products from '~/pages/Products';

//admin
import Admin from '~/pages/Admin';
import OrderManager from '~/pages/OrderManager';
import AccountsManager from '~/pages/AccountsManager';

//layouts
import AdminLayout from '~/layouts/AdminLayout/index';
import ProductsManager from '~/pages/ProductsManager/index';

export const publicPages = [
   { path: '/', component: Home },
   { path: '/profile', component: Profile },
   { path: '/login', component: Login, layout: null },
   { path: '/register', component: Resgister, layout: null },
   { path: '/cart', component: Cart },
   { path: '/pay', component: SubmitPay },
   { path: '/brand', component: Brand },
   { path: '/products', component: Products },
   { path: '/orders', component: Orders },
   { path: '/detail/:slug', component: ProductDetails },
   { path: '/admin', component: Admin, layout: AdminLayout },
   { path: '/admin/productsmanager', component: ProductsManager, layout: AdminLayout },
   { path: '/admin/ordermanager', component: OrderManager, layout: AdminLayout },
   { path: '/admin/accountsmanager', component: AccountsManager, layout: AdminLayout },
];

export const privatePages = [];
