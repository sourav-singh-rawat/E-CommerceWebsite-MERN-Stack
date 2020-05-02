//
//
export const addToCart=(product,next)=>{
    let cart=[]
    if(typeof window!==undefined){
        //
        if(localStorage.getItem("cart")){
            //
            cart=JSON.parse(localStorage.getItem("cart"));
        }  
        //
        cart.push({
            ...product
        })
        //
        localStorage.setItem("cart",JSON.stringify(cart));
        next();
    }
}

export const loadCart=()=>{
    if(typeof window!==undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
}

export const removeFromCart=(productId)=>{
    let cart=[]
    if(typeof window!==undefined){
        //
        if(localStorage.getItem("cart")){
            //
            cart=JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((product,i)=>{
            if(product._id===productId){
                //
                cart.splice(i,1)
            }
        })
        //
        localStorage.setItem("cart",JSON.stringify(cart));
    }   
}

export const emptyCart=(next)=>{
    if(typeof window!==undefined){
        if(localStorage.getItem("cart")){
            localStorage.removeItem("cart")
            //
            //
            let cart=[]
            localStorage.setItem("cart",JSON.stringify(cart));
        }
    }
    next();
}