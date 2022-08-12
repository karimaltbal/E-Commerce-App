import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom"

import Pagination from "react-js-pagination";

import ProductCard from "../Home/ProductCard";
import Loader from "../layout/Loader/Loader";
import "./Products.css";

import { getProductAction } from "../../redux/actions/productActions";
import { useAlert } from "react-alert";



const Produts = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const {loading, error, productData, numOFProduct=0, resultPerPage} = useSelector((state) => state.productList);
    
    const setCurrentPageNo = (e) => { setCurrentPage(e) };

    const dispatch = useDispatch();
    const alert = useAlert();
    const { keyword } = useParams();

    useEffect(() => {
        if (error) { return alert.error(error);}

        dispatch(getProductAction(keyword, currentPage));

    }, [alert, currentPage, dispatch, error, keyword]);

    return (
        <Fragment>
            {loading?(
                <Loader />
            ):(
                <Fragment>
                    <h2 className="productsHeading">Products</h2>
                    <div className="products">
                        <div className="products">
                            {productData && productData.map((ele) => (
                                <ProductCard key={ele._id} product={ele} />
                            ))}
                        </div>
                    </div>



                    <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={numOFProduct}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}

export default Produts