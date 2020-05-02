import { API } from "../../backend";

//
export const getProductsHome=()=>{
    return fetch(`${API}/products`,{method:"GET"})
    .then((responce)=>{
        return responce.json()
    })
    .catch(err=>{
        console.log(err);
    })
}