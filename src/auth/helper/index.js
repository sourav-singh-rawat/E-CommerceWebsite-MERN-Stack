import {API} from "../../backend"
//

export const signup = (user)=>{
    return fetch(`${API}/singup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    }).then((responce)=>{
        return responce.json()
    }).catch((err)=>{
        console.log(err);
    })
}

export const signin = (user)=>{
    return fetch(`${API}/singin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    }).then((responce)=>{
        return responce.json()
    }).catch((err)=>{
        console.log(err);
    })
}

export const authenticate = (data,next)=>{
    //
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }
}

//
export const signout = (next)=>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}/signout`,{
            method:"GET"
        }).then((responce)=>console.log("Signout Succesfull"))
        .catch((err)=>console.log(err))
    }
}

export const isAuthenticated = ()=>{
    if(typeof window=="undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false;
    }
}