import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import { Typography } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import SideBar from "./Sidebar";
import "./processOrder.css";

import { UPDATE_ORDER_RESET } from "../../redux/constants/orderConstants";
import { getOrderDetails, clearError, updateOrder} from "../../redux/actions/orderAction";

const ProcessOrder = () => {
    
    const {id} = useParams()
    const dispatch = useDispatch();
    const alert = useAlert();

    const [status, setStatus] = useState("");

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        let data = { "status": status };

        dispatch(updateOrder(id, data));
    };


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        
        if (updateError) {
            alert.error(updateError);
            dispatch(clearError());
        }
        
        if (isUpdated) {
            alert.success("Order Updated Successfully");
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, isUpdated, updateError]);

    return (
        <Fragment>
            <MetaData title="Process Order" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading ? ( <Loader />):(
                        <div className="confirmOrderPage" style={{ display: order.orderStatus === "Delivered" ? "block" : "grid"}}>
                            <div>
                                <div className="confirmshippingArea">
                                    <Typography>Shipping Info</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span> {order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span> 
                                                {order.shippingInfo && 
                                                `${order.shippingInfo.address}, 
                                                ${order.shippingInfo.city}, 
                                                ${order.shippingInfo.state}, 
                                                ${order.shippingInfo.pinCode}, 
                                                ${order.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>

                                    <Typography>Payment</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                        <p className={ order.paymentInfo && 
                                        order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}
                                        >
                                            {order.paymentInfo && order.paymentInfo.status === "succeeded"? "PAID": "NOT PAID"}
                                        </p>
                                        </div>

                                        <div>
                                            <p>Amount:</p>
                                            <span>{order.totalPrice && order.totalPrice}</span>
                                        </div>
                                    </div>

                                    <Typography>Order Status</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                        <p
                                            className={ order.orderStatus && order.orderStatus === "Delivered"?"greenColor":"redColor"}
                                        >
                                            {order.orderStatus && order.orderStatus}
                                        </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="confirmCartItems">
                                    <Typography>Your Cart Items:</Typography>
                                    <div className="confirmCartItemsContainer">
                                        {order.orderItems && order.orderItems.map((item) => (
                                            <div key={item.idd}>
                                                <img src={item.image} alt="Product" />
                                                <Link to={`/product/${item.idd}`}>
                                                    {item.name}
                                                </Link>{" "}
                                                <span>
                                                    {item.quantity} X ₹{item.price} ={" "}
                                                    <b>₹{item.price * item.quantity}</b>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div style={{ display: order.orderStatus === "Delivered" ? "none" : "block" }}>
                                <form className="updateOrderForm" onSubmit={updateOrderSubmitHandler} >
                                    <h1>Process Order</h1>

                                    <div>
                                        <AccountTreeIcon />
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            {order.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}

                                            {order.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>

                                    <Button id="createProductBtn" type="submit" disabled={loading?true:false || status === "" ?true:false }>
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;
