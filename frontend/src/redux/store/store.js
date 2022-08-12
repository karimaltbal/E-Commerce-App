import { createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    productListReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    upt_del_productReducer,
    productReviewsReducer,
    reviewReducer,
} from "../reducers/productReducers";

import { allUsersReducer, authReducer, profileReducer, userDetailsReducer } from "../reducers/userReducer";

import { cartReducer } from "../reducers/cartReducer";

import { 
    allOrdersReducer, 
    myOrdersReducer, 
    newOrderReducer, 
    orderDetailsReducer, 
    orderReducer 
} from "../reducers/orderReducer";


const reducers = combineReducers({
    
    productList: productListReducer,
    
    auth: authReducer,
    
    profile: profileReducer,
    
    cart: cartReducer,
    
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,

    newReview: newReviewReducer,
    
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: upt_del_productReducer,

    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,

    productReviews: productReviewsReducer,
    review: reviewReducer,
});


const initialState = {
    cart:{
        cartItem: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo")? JSON.parse(localStorage.getItem("shippingInfo")) : [],
    }
}

const middleware = [thunk]


const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;