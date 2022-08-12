import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CgMouse } from "react-icons/cg/index";
import {useAlert} from "react-alert";

import "./Home.css";
//import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader"
import ProductCard from "./ProductCard";


import { getProductAction } from "../../redux/actions/productActions"



const Home = () => {

    const { loading, error, productData }  = useSelector((state) => state.productList);

    const dispatch = useDispatch();
    const alert = useAlert()
    
    useEffect(() => {
        if(error){ return alert.error(error)}

        dispatch(getProductAction());
    }, [alert, dispatch, error]);

    
    return (
        <Fragment>
            {loading ?(
                <Loader />
            ):(
                <>
                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {productData && productData.map((ele) => (
                            <ProductCard key={ele._id} product={ele} />
                        ))}
                    </div>
                </>
            )}
        </Fragment>
    );
};

export default Home;