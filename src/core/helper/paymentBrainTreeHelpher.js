import { API } from "../../backend";

//Step 1
export const getMeToken=(userId,token)=>{
    return fetch(`${API}/payment/braintree/gettoken/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then((responce)=>{
        return responce.json()
    }).catch((err)=>{
        console.log(err);
    })
}

//Step 4
//Nonce need to go
export const processPayment=(userId,token,paymentDetails)=>{
    return fetch(`${API}/payment/braintree/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(paymentDetails)
    })
    .then((responce)=>{
        return responce.json()
    }).catch((err)=>{
        console.log(err);
    })
}