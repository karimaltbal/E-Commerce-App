import React, {Fragment, useState} from 'react'
import { useNavigate } from "react-router-dom"
import "./Search.css"

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handelSubmit = (e)=>{
        e.preventDefault()

        keyword? navigate(`/products/${keyword}`): navigate("/products");
    }


    return (
        <Fragment>
            <form onSubmit={handelSubmit} className="searchBox ">
                <input type="text" placeholder='Search a Product' onChange={(e)=> setKeyword(e.target.value)} />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    )
}

export default Search