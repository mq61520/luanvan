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
import Promotion from '~/pages/Promotion/index';
import AllProduct from '~/pages/AllProduct/index';

//admin
import Admin from '~/pages/Admin';
import OrderManager from '~/pages/OrderManager';
import AccountsManager from '~/pages/AccountsManager';
import ProductsManager from '~/pages/ProductsManager/index';

//layouts
import AdminLayout from '~/layouts/AdminLayout/index';
import FilterLayout from '~/layouts/FillterLayout/index';

export const publicPages = [
   { path: '/', component: Home },
   { path: '/profile', component: Profile },
   { path: '/login', component: Login, layout: null },
   { path: '/register', component: Resgister, layout: null },
   { path: '/cart', component: Cart },
   { path: '/pay', component: SubmitPay },
   { path: '/brand/:id', component: Brand },
   { path: '/products/:id', component: Products },
   { path: '/all_product/:conditions', component: AllProduct, layout: FilterLayout },
   { path: '/orders', component: Orders },
   { path: '/orders/:order_status', component: Orders },
   { path: '/detail/:ma_sp', component: ProductDetails },
   { path: '/admin', component: Admin, layout: AdminLayout },
   { path: '/admin/productsmanager', component: ProductsManager, layout: AdminLayout },
   { path: '/admin/ordermanager/:type', component: OrderManager, layout: AdminLayout },
   { path: '/admin/accountsmanager', component: AccountsManager, layout: AdminLayout },
   { path: '/admin/promotion', component: Promotion, layout: AdminLayout },
];

export const privatePages = [];
