import React from 'react'
import { API } from '../../backend'

//
export default function Image({product}) {
    const imageUrl=product
        ?`${API}/product/photo/${product._id}`
        :"https://image.shutterstock.com/image-vector/banner-new-product-260nw-723831040.jpg";
    return (
        <div className="rounded border border-success p-2">
            <img
                src={imageUrl}
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                className="mb-3 rounded"
            />
        </div>
    )
}
