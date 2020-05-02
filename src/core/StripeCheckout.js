import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper'
import { loadCart } from './helper/cartHelper'
import { Link } from 'react-router-dom'
import StripeChcekoutComponent from 'react-stripe-checkout'
import { API } from '../backend'

export default function StripeCheckout({proudcts,stateReload=f=>f,reload=undefined}) {
    
    const [data, setdata] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })

    const token =isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user.id

    const getFinalPrice=()=>{
        var amount=0;
        proudcts.map((item)=>{
            amount = amount+item.price
        })
        return amount;
    } 

    const makePayment = (token)=>{
       //
        //
        //
        const body={
            token,
            proudcts
        }
        return fetch(`${API}/payment/stripe`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        }).then((responce)=>{
            console.log(responce)
            const {status}=responce;
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    
    const showStripeBtn=()=>{
        return isAuthenticated() ?(
            <StripeChcekoutComponent
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                amount={getFinalPrice() * 100}
                token={
                    //
                    //
                    //
                    makePayment
                }
                name="Buy Tshirt"
            >
               <button className="btn btn-success disabled">Pay With Stripe</button>
            </StripeChcekoutComponent>
        )
        :(
            <Link className="btn btn-warning">SingIn</Link>
        )
    }

    return (
        <div>
            <h1>Stipe Checkout {getFinalPrice()}</h1>
            {showStripeBtn()}
        </div>
    )
}
