import React,{useState,useEffect} from 'react'
import "../styles.css"
//
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import StripeCheckout from './StripeCheckout'
import BraintreePayment from './BraintreePayment'

export default function Cart() {

    const [products, setProduct] = useState([])
    //
    const [reload, setreload] = useState(false)

    useEffect(() => {
        //
        setProduct(loadCart());    
        

        //
        //
        //
        //
        //
        //
    }, [reload])

    const loadCartProducts=(products)=>{
        return(
            <div>
                <h2>Cart Products</h2>
                {
                    products.map((product,index)=>{
                        return(
                            <Card 
                                key={index} 
                                product={product} 
                                addToCartButton={false} 
                                removeFromCartButton={true}
                                //
                                //
                                setReload={setreload}
                                reload={reload}
                            />
                        )
                    })
                }
            </div>
        )
    }

    return (
        <Base title="Home Page" description="Welcome To T-Shirt Store">
            <div className="row">
                <div className="col-md-6 text-center">{products.length>0 ? loadCartProducts(products) : <h3>No Product In Cart</h3>}</div>
                <div className="col-md-6 text-center">
                    <BraintreePayment prodcuts={products} setReload={setreload} reload={reload}/>
                </div>
            </div>
        </Base>
    )
}
