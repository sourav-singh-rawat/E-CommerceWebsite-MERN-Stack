import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getCategory, updateCategory } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'


export default function UpdateCategory({match}) {
    
    const preLoad=(categoryId)=>{
        getCategory(categoryId)
        .then((data)=>{
            if(data.error){
                setError(data.error);
            }else{
                setName(data.name);
            }
        })
    }

    useEffect(() => {
        preLoad(match.params.categoryId);
    }, [])

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user,token} = isAuthenticated();

    function handleChange(event){
        //
        setError(false);
        setSuccess(false);
        setName(event.target.value)
    }
    
    function backBtn(){
        return (
            <Link className="btn btn-dark btn-md mb-3" to="/admin/dashboard">Admin Home</Link>
        )
    }

    const onSubmit=(event)=>{
        event.preventDefault();
        setError(false);
        setSuccess(false);
        updateCategory(user.id,token,match.params.categoryId,{name})
        .then((data)=>{
            if(data.error){
                setError(data.error);
            }else{
                setSuccess(true);
            }
        })
    }

    function myCategoryForm(){
        return (
            <form>
                <div className="form-group">
                    <p className="lead">Enter the Category</p>
                    <input type="text"
                    className="form-control my-3"
                    value={name}
                    onChange={handleChange}
                    autoFocus
                    required 
                    />
                    <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
                </div>            
            </form>
        )
    }

    const successMsg = ()=>{
        if(success){
            return (
                <div className="badge badge-success text-white">
                    Category Updated Successfully
                </div>
            )
        }
    }

    const errorMsg = ()=>{
        if(error){
            return (
                <div className="badge badge-danger text-white">
                    {error}   
                </div>
            )
        }
    }
    
    return (
        <Base title="Update category" 
            description="Update category for products" 
            className="container bg-info p-4"
        >
            {backBtn()}
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2 py-3">
                    {successMsg()}
                    {errorMsg()}
                    {myCategoryForm()}
                    
                </div>
            </div>
        </Base>
    )
}
