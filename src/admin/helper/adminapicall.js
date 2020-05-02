//
import { API } from "../../backend";

//

export const addCategory=(userId,token,category)=>{
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then((responce)=>{
        return responce.json()
    })
    .catch((error)=>{
        console.log(error)
    })
}

export const getCategory=(categoryId)=>{
    return fetch(`${API}/category/${categoryId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    })
    .then((responce)=>{
        return responce.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const getAllCategoires =()=>{
    //
    return fetch(`${API}/categories`,{
        method:"GET"
    })
    .then((responce)=>{
        return responce.json()
    })
    .catch((error)=>{
        console.log(error)
    })
}

export const updateCategory=(userId,token,categoryId,catergory)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(catergory)
    })
    .then((responce)=>{
        return responce.json()
    })
    .catch((error)=>{
        console.log(error)
    })
}

export const deleteCategory=(userId,token,categoryId)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    })
    .then((responce)=>{
        return responce.json()
    })
    .catch((error)=>{
        console.log(error)
    })
}

//

export const addProduct = (userId,token,product)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then((responce)=>{
        return responce.json()
    })
    .catch((error)=>{
        console.log(error)
    })
}

//
export const getAllProducts =()=>{
    return fetch(`${API}/products`,{
        method:"GET"
    })
    .then((responce)=>{
        return responce.json()
    })
    .catch((error)=>{
        console.log(error)
    })
}

export const getProduct =(productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    })
    .then((responce)=>{
        return responce.json()
    })
    .catch((error)=>{
        console.log(error)
    })
}

export const updateProduct = (productId,userId,token,product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then((responce)=>{
        return responce.json()
    })
    .catch((error)=>{
        console.log(error)
    })
}

export const deleteProduct = (productId,userId,token)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    })
    .then((responce)=>{
        return responce.json()
    })
    .catch((error)=>{
        console.log(error)
    })
}