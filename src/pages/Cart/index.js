import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './Cart.module.scss';
import currencyFormater from '~/common/formatCurrency';
import CartItem from '~/components/CartItem/index';
import Button from '~/components/Button/index';
import { CartContext } from '~/globalState/Context';

const cn = classNames.bind(styles);

function Cart() {
   document.title = 'Giỏ hàng';

   const [listPay, setListPay] = useContext(CartContext);

   const [listProducts, setListProducts] = useState([]);

   const [product, setProduct] = useState([]);

   const [selectedList, setSelectedList] = useState([]);

   const [total, setTotal] = useState(0);
   const [productCount, setProductCount] = useState(0);

   const handleGetCart = async () => {
      try {
         var user_id = localStorage.getItem('current_user');
         const get_cart_response = await axios.get('http://localhost:4000/cart_products/' + user_id);

         if (get_cart_response.data.length > 0) {
            setListProducts(get_cart_response.data);

            // console.log('list product:', get_cart_response.data);

            var id_product = [];

            for (let i = 0; i < get_cart_response.data.length; i++) {
               try {
                  var product_info_response;

                  if (get_cart_response.data[i] !== undefined) {
                     product_info_response = await axios.get(
                        'http://localhost:4000/product_id/' + get_cart_response.data[i].sp_ma,
                     );
                  }

                  if (product_info_response.data.length > 0) {
                     var promotion_res;
                     var km;
                     try {
                        promotion_res = await axios.get(
                           'http://localhost:4000/promotion_id/' + product_info_response.data[0].sp_khuyenmai,
                        );
                        if (promotion_res.data.length > 0) {
                           km = promotion_res.data[0].km_value;
                        } else {
                           km = 0;
                        }
                     } catch (error) {
                        console.log('loi km:' + error);
                     }

                     id_product.push({
                        promotion: km,
                        sl_sp: get_cart_response.data[i].gh_soluong,
                        info: product_info_response.data[0],
                     });
                  }
               } catch (error) {
                  console.log('loi info', error);
               }
            }

            // console.log('id_product', id_product);
            setProduct(id_product);
         }
      } catch (error) {
         console.log(error);
      }
   };

   // console.log('product info:', product);

   // const getIdProducts = (list) => {
   //    console.log('product list:', list);

   //    list.map((c) => {
   //       id_product.push({ ma_sp: c.sp_ma, sl_sp: c.gh_soluong });
   //    });

   //    console.log('id product list:', id_product);
   // };

   // const getProductsInfo = async (ma_sp) => {
   //    try {
   //       const product_info_response = await axios.get('http://localhost:4000/product_id/' + ma_sp);

   //       if (product_info_response.data.length > 0) {
   //          setProduct(product_info_response.data);
   //       }
   //    } catch (error) {
   //       console.log(error);
   //    }
   // };

   const goShop = () => {
      window.open('http://localhost:3000/product/all', '_self');
   };

   useEffect(() => {
      handleGetCart();
   }, []);

   // console.log(selectedList);

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h1 className={cn('title')}>Giỏ hàng</h1>

            {listProducts.length > 0 ? (
               <>
                  <div className={cn('header-list')}>
                     <h4 className={cn('product-info')}>Sản phẩm</h4>

                     <h4 className={cn('product-price')}>Đơn giá</h4>

                     <h4 className={cn('product-amount')}>Số lượng</h4>

                     <h4 className={cn('product-total-price')}>Thành tiền</h4>

                     <h4 className={cn('action')}>Thao tác</h4>
                  </div>

                  <div className={cn('list-products')}>
                     {product.map((p) => {
                        return (
                           <CartItem
                              key={p.info.sp_id}
                              ma_sp={p.info.sp_ma}
                              ten_sp={p.info.sp_ten}
                              image={p.info.sp_image}
                              sl_sp={p.sl_sp}
                              gia_sp={p.info.sp_gia}
                              km={p.promotion}
                              deleted={(e) => {
                                 if (e === 'Deleted') {
                                    window.open('http://localhost:3000/cart', '_self');
                                 } else {
                                    return;
                                 }
                              }}
                              checked={(e) => {
                                 console.log(e);
                                 if (e.status === true) {
                                    setTotal(total + e.gia);

                                    var list = [];
                                    list.push({
                                       ma_sp: e.ma_sp,
                                       sl: e.sl,
                                       gia: e.gia,
                                       don_gia: e.don_gia,
                                       location: 'Cart',
                                    });
                                    setSelectedList(selectedList.concat(list));

                                    setProductCount(productCount + 1);
                                 } else {
                                    setTotal(total - e.gia);
                                    setProductCount(productCount - 1);

                                    var new_list = selectedList.filter((i) => i.ma_sp !== e.ma_sp);
                                    setSelectedList(new_list);
                                 }
                              }}
                              updated={(e) => {
                                 if (e === 'Updated') {
                                    window.open('http://localhost:3000/cart', '_self');
                                 } else {
                                    return;
                                 }
                              }}
                           />
                        );
                     })}
                  </div>

                  <div className={cn('actions')}>
                     <div className={cn('total')}>
                        <h4 className={cn('amount')}>
                           <b>{productCount}</b> sản phẩm
                        </h4>

                        <div className={cn('total-price')}>
                           <h4 style={{ color: '#333' }}>Tổng thanh toán:</h4>
                           <h4>{currencyFormater.format(total)}</h4>
                        </div>
                     </div>
                  </div>

                  <div className={cn('btn-flex')}>
                     <div className={cn('pay-btn')}>
                        <Button
                           borderfill
                           thinfont
                           to={'/pay'}
                           onClick={() => {
                              setListPay({ ...listPay, listPay: selectedList });
                           }}
                        >
                           Tiến hành thanh toán
                        </Button>
                     </div>
                  </div>
               </>
            ) : (
               <>
                  <div className={cn('no-product')}>
                     <h1 className={cn('message')}>Bạn chưa có sản phẩm nào trong giỏ hàng.</h1>

                     <div className={cn('go-shop')}>
                        <Button onlytext onClick={goShop}>
                           Tiến hành mua hàng
                        </Button>
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}

export default Cart;
