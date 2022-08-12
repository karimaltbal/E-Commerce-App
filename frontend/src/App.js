import React, { useEffect, useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import WebFont from "webfontloader";
import axios from "axios"

import './App.css';
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home";

import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Produts";
import Search from "./component/Product/Search";

import LoginSignUp from "./component/User/LoginSignUp";
import UserOptions from "./component/layout/Header/UserOptions";
import store from "./redux/store/store";

import { loadUser } from "./redux/actions/userActions";
import { useSelector } from "react-redux";

import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";

import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import Dashboard from "./component/Admin/Dashboard"

import MyOrders from "./component/Order/MyOrders";

import ProtectedRoute from "./component/Route/ProtectedRoute"

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderDetails from "./component/Order/OrderDetails";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UserList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";




const App = ()=>{
  
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);

  const [stripeApiKey, setStripeApiKey] = useState("");
  
  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }; 


  useEffect(() => {
    //WebFont.load({ google: { families: ["Roboto", "Droid Sans", "Chilanka"]} });

    store.dispatch(loadUser());

    getStripeApiKey()
    
  }, []);
  

  return (
    <BrowserRouter>
      <Elements stripe={loadStripe(stripeApiKey)}>
        
        <Header />

        {isAuthenticated && <UserOptions error={error} user={user} />}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />

          <Route exact path="/search" element={<Search />} />

          <Route exact path="/account" element={ProtectedRoute(Profile)} />
          <Route exact path="/profile/update" element={ProtectedRoute(UpdateProfile)} />

          <Route exact path="/cart" element={<Cart />} />
          {/*<Route exact path="/shipping" element={ProtectedRoute(Shipping)} />*/}
          <Route exact path="/shipping" element={<Shipping />} />

          <Route exact path="/order/confirm" element={ProtectedRoute(ConfirmOrder)} />


          <Route exact path="/process/payment" element={ProtectedRoute(Payment)} />
          <Route exact path="/success" element={ProtectedRoute(OrderSuccess)} />

          <Route exact path="/orders" element={ProtectedRoute(MyOrders)} />
          <Route exact path="/order/:id" element={ProtectedRoute(OrderDetails)} />


          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/products" element={<ProductList />} />
          <Route exact path="/admin/product" element={<NewProduct />} />
          <Route exact path="/admin/product/:id" element={<UpdateProduct />} />

          <Route exact path="/admin/orders" element={<OrderList />} />
          <Route exact path="/admin/order/:id" element={<ProcessOrder />} />

          <Route exact path="/admin/users" element={<UsersList />} />
          <Route exact path="/admin/user/:id" element={<UpdateUser />} />

          <Route exact path="/admin/reviews" element={<ProductReviews />} />

          <Route exact path="/login" element={<LoginSignUp />} />
        </Routes>

        <Footer />
      </Elements>
    </BrowserRouter>
  );
}

export default App;
