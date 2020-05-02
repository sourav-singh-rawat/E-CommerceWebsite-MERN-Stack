import React, { useState } from 'react'
import Image from './helper/imageReuseable'
import { Redirect } from 'react-router-dom';
import { addToCart, removeFromCart } from './helper/cartHelper';

//
//
export default function Card({product,addToCartButton=true,removeFromCartButton=false, 
    //
    setReload=value=>value, 
    reload=undefined}) {
    
    const [redirect, setRedirect] = useState(false);

    const productTitle=product? product.name : "A Dfault Product"
    const productDesc=product? product.description :"Default Description"
    const productPrice=product?product.price : "0" 

    const addInCart=()=>{
        addToCart(product,()=>{
            setRedirect(true);
        })
    }

    //
    const getRedirect=(redirect)=>{
        return (
            redirect && (
                <Redirect to="./cart"/>
            )
        )
    }

    const showAddToCart=(addToCartButton)=>{
        return (
            addToCartButton && (
                <button
                    onClick={addInCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                    >
                    Add to Cart
                </button>
            )
        )
    }
    
    const showRemoveToCart=(removeFromCartButton)=>{
        return (
            removeFromCartButton && (
                <button
                    onClick={()=>{
                        removeFromCart(product._id);
                        //
                        setReload(!reload);
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                    >
                    Remove from cart
                </button>
            )
        )
    }

    return (
        <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{productTitle}</div>
        <div className="card-body text-center">
            
            {//
                getRedirect(redirect)}

            <Image product={product}/>
            
            <p className="lead bg-success font-weight-normal text-wrap">
                {productDesc}
            </p>
            <p className="btn btn-success rounded  btn-sm px-4">$ {productPrice}</p>
            <div className="row">
            <div className="col-12">
                {showAddToCart(addToCartButton)}
            </div>
            <div className="col-12">
                {showRemoveToCart(removeFromCartButton)}
            </div>
            </div>
        </div>
        </div>
    )
}
