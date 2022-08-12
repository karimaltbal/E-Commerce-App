import {ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constants/cartConstants"
import axios from "axios"

const addItemToCart = (id, quantity)=>{
    return async (dispatch, getState)=>{
        const { data } = await axios.get(`/api/v1/products/${id}`);

        dispatch({
            type: ADD_TO_CART,
            payload:{
                idd: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.Stock,
                quantity,
            }
        })

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItem));

    }
}



const removeItemFromCart = (id)=>{
    return async (dispatch, getState)=>{

        dispatch({
            type: REMOVE_CART_ITEM,
            payload: id 
        })

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItem));

    }
}


// SAVE SHIPPING INFO
const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
}



export { addItemToCart, removeItemFromCart, saveShippingInfo };