import React, { useState, useEffect } from 'react'
import { getMeToken, processPayment } from './helper/paymentBrainTreeHelpher'
import { createOrder } from './helper/orderHelper'
import { isAuthenticated } from '../auth/helper'
import { loadCart, emptyCart } from './helper/cartHelper'
import { Link } from 'react-router-dom'
import DropInUi from 'braintree-web-drop-in-react'

export default function BraintreePayment({prodcuts,setReload=val=>val,reload=undefined}) {
    
    const [infostate, setInfostate] = useState({
        loading:false,
        success:false,
        clientToken:null,
        error:"",
        instance:{} //
    })

    const userId = isAuthenticated() && isAuthenticated().user.id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken=(userId,token)=>{
        getMeToken(userId,token).then((info)=>{
            //
            if(info.err){
                setInfostate({...infostate, error:info.err})
            }else{
                const clientToken=info.clientToken
                //
                setInfostate({clientToken})
            }
        })
    }
    
    useEffect(() => {
        //
        //
        getToken(userId,token)
    }, [])

    const onPurchase=(infostate,prodcuts)=>{
        setInfostate({loading:true});
        let nonce;  
        let getNonce=infostate.instance
            .requestPaymentMethod()
            .then((data)=>{
                nonce=data.nonce
                //
                var amount=getAmount(prodcuts);
                console.log(amount);
                var paymentDetails={
                    //
                    payment_method_nonce:nonce,
                    amount: amount
                }

                processPayment(userId,token,paymentDetails)
                .then((responce)=>{
                    //
                    setInfostate({...infostate,loading:false,success:responce.success})
                    console.log("SUCCESS");
                    
                    //
                    console.log(responce)
                    //
                    const orderData={
                        products:prodcuts,
                        transcation_id:responce.transcation.id,
                        amount:responce.transcation.amount
                    }
                    //
                    createOrder(userId,token,{order:orderData})

                    //
                    emptyCart(()=>{
                        console.log("Emptyed Cart")
                    });
                    //
                    setReload(!reload)
                })
                .catch((err)=>{
                    setInfostate({...infostate,loading:false,success:false})
                    console.log("Rejection from backend");
                    
                })
            })
    }

    const getAmount=(prodcuts)=>{
        let amount=0;
        prodcuts.map((item)=>{
            amount=amount+item.price
        })
        return amount;   
    }
    
    const showDropInUi=(infostate,prodcuts)=>{
        return (
            <div>
                {
                    infostate.clientToken!==null && prodcuts.length>0 ?(
                        <div>
                            <DropInUi
                                options={{ authorization: infostate.clientToken }}
                                onInstance={(instance) => (infostate.instance = instance)}
                            />
                            <button className="btn btn-block btn-primary" onClick={()=>{
                                onPurchase(infostate,prodcuts)
                            }}>Buy</button>
                        </div>
                    ):(<h3>Add Product To Cart</h3>)
                }
            </div>
        )
    }

    return (
        <div>
            <h3>Your Bill is ${getAmount(prodcuts)}</h3>
            {showDropInUi(infostate,prodcuts)}
        </div>
    )
}
