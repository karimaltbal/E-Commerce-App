import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

const cartReducer = (state = {cartItem: [], shippingInfo: {}}, action)=>{

    switch(action.type){
        case ADD_TO_CART:
            const item = action.payload;

            const itemExist = state.cartItem.find((i)=> i.idd === item.idd)


            if(itemExist){
                return {
                    ...state,
                    cartItem: state.cartItem.map((i) => i.idd === itemExist.idd ? item : i)
                }
            }else{
                return {
                    ...state,
                    cartItem: [...state.cartItem, item],
                };
            }
        
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItem: state.cartItem.filter((i) => i.idd !== action.payload),
            };
        
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };
        
        default:
            return state

    }
}


export { cartReducer };