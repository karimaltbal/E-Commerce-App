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
    
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,

    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,


    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,



    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,


    CLEAR_ERRORS,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
} from "../constants/productConstants";
import axios from "axios";




const getProductAction = (keyword = "", currentPage = 1)=>{
    return async (dispatch) => {
    try {
        dispatch({
            type: FATCH_PRODUCT_REQUSET,
        });

        const link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;

        const {data} = await axios.get(link)

        dispatch({
            type: FATCH_PRODUCT_SUCCSESS,
            payload: data.product,
            payload2: data.productCount
        });
    } catch (error) {
        dispatch({
            type: FATCH_PRODUCT_FAIL,
            payload: error.response && error.response.data.message
        });
    }
    };
}



const detailsProductAction = (id)=>{
    return async (dispatch)=>{
        try {
            dispatch({
                type: PRODUCT_DETAILS_REQUEST,
            });

            const { data } = await axios.get(`/api/v1/products/${id}`);

            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data.product,
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    }
}




const newReview = (dataReviwe)=>{
    return async (dispatch)=>{
        try {
            dispatch({
                type: NEW_REVIEW_REQUEST,
            });

            const config = { headers: { "Content-Type": "application/json" }};
            const { data } = await axios.put(`/api/v1/reviwe`, dataReviwe, config);

            dispatch({
                type: NEW_REVIEW_SUCCESS,
                payload: data.success,
            });
        } catch (error) {
            dispatch({
                type: NEW_REVIEW_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    }
}



// Get All Products For Admin
const getAdminProduct = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST });

        const { data } = await axios.get("/api/v1/admin/products");

        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};





// Create Product --Admin
const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = { headers: { "Content-Type": "application/json" }};

        const { data } = await axios.post( `/api/v1/admin/products/new`, productData, config );

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};






// Update Product --Admin
const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const config = { headers: { "Content-Type": "application/json" }};

        const { data } = await axios.put( `/api/v1/admin/products/${id}`, productData, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        });
        
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};





// Delete Product --Admin
const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/products/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};



// Get All Reviews of a Product
const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEW_REQUEST });

        const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

        dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.reviews,
        });
    } catch (error) {
        dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
        });
    }
};

// Delete Review of a Product
const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });

        const { data } = await axios.delete(`/api/v1/review?id=${reviewId}&productId=${productId}`);

        dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
        });
    } catch (error) {
        dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
        });
    }
};






const clearError = ()=>{
    return async (dispatch) => {
        dispatch({
            type: CLEAR_ERRORS,
        });
    };
}

export {
    getProductAction,
    detailsProductAction,
    newReview,
    getAdminProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllReviews,
    deleteReviews,
    clearError,
}; 