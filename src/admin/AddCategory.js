import React, { useState } from 'react'
import Base from '../core/Base'
//
import { isAuthenticated } from '../auth/helper'
import {Link} from 'react-router-dom'
import { addCategory } from './helper/adminapicall'

export default function AddCategory() {

    //
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user,token} = isAuthenticated();
    
    function backBtn(){
        return (
            <Link className="btn btn-dark btn-md mb-3" to="/admin/dashboard">Admin Home</Link>
        )
    }

    function handleChange(event){
        //
        setError(false);
        setSuccess(false);
        setName(event.target.value)
    }

    function onSubmit(event){
        event.preventDefault();
        setError(false)
        setSuccess(false)
        //
        addCategory(user.id,token,{name})
        .then((data)=>{
            //
            //
            if(data.error){
                setError(data.error)
            }else{
                setSuccess(true)
                setName("")
            }
        })
        .catch((e)=>{
            console.log("Unable to Send Create Request")
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
                    placeholder="For Ex. Summer"
                    />
                    <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
                </div>            
            </form>
        )
    }

    const successMsg = ()=>{
        if(success){
            return (
                <div className="badge badge-success text-white">
                    Category Created Successfully
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
        <Base title="Create new category" 
            description="Add new category for products" 
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
