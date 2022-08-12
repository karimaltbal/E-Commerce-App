import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

import "./Cart.css";
import CartItemCard from "./CartItemCard";

import { addItemToCart, removeItemFromCart } from "../../redux/actions/cartActions";

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItem } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) { return; }

        dispatch(addItemToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) { return;}

        dispatch(addItemToCart(id, newQty));
    };

    const deletecartItem = (id) => {
        dispatch(removeItemFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    };

    return (
        <Fragment>
            {cartItem.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />

                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItem && cartItem.map((item, indx) => (
                            <div className="cartContainer" key={item.idd}>
                                <CartItemCard item={item} deleteCartItems={deletecartItem} />
                                <div className="cartInput">
                                    <button onClick={() => decreaseQuantity(item.idd, item.quantity)}>
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                    onClick={() => increaseQuantity(item.idd, item.quantity, item.stock)}>
                                        +
                                    </button>
                                </div>
                                <p className="cartSubtotal">{`£${ item.price * item.quantity }`}</p>
                            </div>
                        ))}

                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`₹${cartItem.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkoutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Cart;
