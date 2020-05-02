import React,{useState,useEffect} from 'react'
import "../styles.css"
//
import Base from './Base'
import Card from './Card'
import {getProductsHome} from './helper/coreapicalls'

export default function Home() {

    const [products, setProduct] = useState([]);
    const [error, setError] = useState("");

    const preLoad =()=>{
        getProductsHome()
        .then((data)=>{
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data);
            }
        })
    }

    useEffect(() => {
        preLoad();
    }, [])

    return (
        <Base title="Home Page" description="Welcome To T-Shirt Store">
            <h3 className="text-white">All T-shirt</h3>
            <div className="row">
                {products.map((product,index)=>{
                    return (
                        <div key={index} className="col-4 mb-4">
                            <Card product={product}/>
                        </div>
                    )
                })}
            </div>
        </Base>
    )
}
