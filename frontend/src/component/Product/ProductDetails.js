import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useParams} from "react-router-dom"

import Carousel from "react-material-ui-carousel";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";


import "./ProductDetails.css";
import ReviewCard from "./ReviewCard.js";


import Loader from "../layout/Loader/Loader";

import { addItemToCart } from "../../redux/actions/cartActions";
import { NEW_REVIEW_RESET } from "../../redux/constants/productConstants";
import { detailsProductAction, clearError, newReview} from "../../redux/actions/productActions";
import { useAlert } from "react-alert";



const ProductDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert(); 
    let { id } = useParams();

    const {productData, loading, error} = useSelector( (state) => state.productDetails);

    
    const product = productData === undefined ? {} : productData;


/******************************************************************************************* */

    const [quantity, setQuantity] = useState(1);

    //increment and decrease btn 
    const increaseQuantity = ()=>{
        if(product.Stock <= quantity){return}
        
        const qunt = quantity + 1;
        setQuantity(qunt)
    }

    const decreaseQuantity = ()=>{
        if(quantity <= 1){return}

        const qunt = quantity - 1;
        setQuantity(qunt)
    }

    //add item to cart 
    const addToCartHandler = ()=>{
        
        dispatch(addItemToCart(id, quantity));

        alert.success("Done Add Item To Cart")
    }





    
    
    
    /*******add Reviwe***********/
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };


    const { success, error: reviewError } = useSelector((state) => state.newReview);

    const submitReviewToggle = () => { open ? setOpen(false) : setOpen(true);};

    const reviewSubmitHandler = () => {

        const dataReviwe = {
            "rating": rating,
            "comment": comment,
            "productId": id
        }
        dispatch(newReview(dataReviwe));

        setOpen(false);
    };



    /************************** */
    useEffect(() => {
        if(error){ 
            alert.error(error)
            dispatch(clearError());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearError());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }


        dispatch(detailsProductAction(id));
    }, [alert, dispatch, error, id, reviewError, success]);


    
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images.map((ele, ind) => (
                                    <img className="CarouselImage" key={ind} src={ele.url} alt={`${ind} Slide`} />
                                ))}
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>

                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>

                            <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <span>{quantity}</span>
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button 
                                        disabled={product.Stock < 1 ? true : false}
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <p> Status:
                                    <b className={product.Stock < 1 ? " redColor" : " greenColor"}>
                                        {product.Stock < 1 ? " OutOfStock" : " InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">REVIEWS</h3>

                    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating 
                                name="unique-rating" 
                                size="large" 
                                onChange={(e) => setRating(Number(e.target.value))} 
                                value={rating}
                            />
                            <textarea className="submitDialogTextArea" cols="30" rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary"> Cancel </Button>
                            <Button onClick={reviewSubmitHandler} color="primary"> Submit </Button>
                        </DialogActions>
                    </Dialog>

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews && product.reviews.map((review) => (
                                <ReviewCard key={review._id} review={review} />
                            ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDetails;
