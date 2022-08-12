import {
    FATCH_PRODUCT_REQUSET,
    FATCH_PRODUCT_SUCCSESS,
    FATCH_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,

    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,


    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,

    CLEAR_ERRORS,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
} from "../constants/productConstants";


const productListReducer = (state={ products: [] }, action)=>{
    switch (action.type) {

        case FATCH_PRODUCT_REQUSET:
        case ADMIN_PRODUCT_REQUEST:
            return{
                loading: true,
                products: []
            }

        case FATCH_PRODUCT_SUCCSESS:
            return{
                productData: action.payload,
                numOFProduct: action.payload2,
                resultPerPage: action.payload.resultPerPage
            }

        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };

        case FATCH_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }

        default:
            return state;
    }
}


const productDetailsReducer = (state={ product: [] }, action)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return{
                loading: true
            }
        
        case PRODUCT_DETAILS_SUCCESS:
            return{
                productData: action.payload
            }    
        
        case PRODUCT_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        

        default:
            return state
    }
}




const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            };

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};





const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.products,
            };

        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};






const upt_del_productReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            };

        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};





const productReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case ALL_REVIEW_REQUEST:
        return {
            ...state,
            loading: true,
        };
        case ALL_REVIEW_SUCCESS:
        return {
            loading: false,
            reviews: action.payload,
        };
        case ALL_REVIEW_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };

        case CLEAR_ERRORS:
        return {
            ...state,
            error: null,
        };
        default:
        return state;
    }
};




const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
        return {
            ...state,
            loading: true,
        };
        case DELETE_REVIEW_SUCCESS:
        return {
            ...state,
            loading: false,
            isDeleted: action.payload,
        };
        case DELETE_REVIEW_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        case DELETE_REVIEW_RESET:
        return {
            ...state,
            isDeleted: false,
        };
        case CLEAR_ERRORS:
        return {
            ...state,
            error: null,
        };
        default:
        return state;
    }
};


export {
    productListReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    upt_del_productReducer,
    productReviewsReducer,
    reviewReducer
    
};