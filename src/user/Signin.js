import React, { useState } from 'react'
import Base from '../core/Base'
import { isAuthenticated, signin, authenticate } from '../auth/helper'
import { Redirect } from 'react-router-dom'

const Signin =()=>{
    
    const [values,setValue] = useState({
        email:"s@sourav.in",
        password:"12345",
        error:"",
        isLoading:false,
        didRedirect:false
    })

    const {email,password,error,isLoading,didRedirect}=values

    //this is middleware, to check check wether login or not
    //this user(`jwt`) feathed from loacalStorage and {as of now} storing whole lot of info `name,email,id,token..` whatever we are saving using authenticated methord in localStorage
    //this `user` is actualy send by backend as we have set for responce, responce.json({token,user:{...}})
    const {user} = isAuthenticated();

    const handleChange =(field)=>(event)=>{
        setValue({...values,error:false,[field]:event.target.value})
    }

    const onSubmit=(event)=>{
        event.preventDefault()
        setValue({...values,error:false,isLoading:true})
        signin({email,password})
        .then((data)=>{
            if(data.err){
                setValue({...values,error:data.err,isLoading:false,didRedirect:false})
            }else{
                //this is middleware from auth index, to set jwt token in local storage
                //this `jwt` {as of now} storing whole lot of info whatever we are returning as responce from backend `name,id,token,email`...
                //as it is middleware it has next as secound parameter, and  next is nothing just a callback to pass(which excute at the end of this function), so this is how we work with that,(here we are using it to setValue(to redirect) after exection of this)
                authenticate(data,()=>{
                    //will use this didRedirect boolean for migration
                    setValue({...values,didRedirect:true,})
                })
            }
        })
        .catch((err)=>console.log("Failed to send signin request"))
    }

    const performRedirect = ()=>{
        if(didRedirect){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
        //if there is anyting present in `jwt` in localStorage
        //it will also kind of disable the feature of opening signup route, as it will load the page, it will runn this performRediect  as mentioned in <Base/>  with `()`, so it will check isAuthenticated() and as they will found that localStorage has somthing regarding `jwt`, <Redirect/> will run 
        if(isAuthenticated()){
            //this redirect is coming from react-router-dom
            return <Redirect to="/"/>
        }
    }

    const successMsg =()=>{
        return (
            //this logic is, when loading and (..) is true it will run, (..) is always true and it is running stuff so keep on running {when} isLoading is true otherwise (totally depends on isLoading) nothing will run
            isLoading && (
                <div className="container alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }
    const errorMsg = ()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                    style={{display: error ? "" :"none" }}
                    className="alert alert-danger text-center">
                        {JSON.stringify(error)}
                    </div>
                </div>
            </div>
        )
    }

    const signInForm= ()=>{
        return (
            <div className="row">
                <div className="col-md-6 text-left offset-sm-3">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input value={email} onChange={handleChange("email")} type="email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input value={password} onChange={handleChange("password")} type="password" className="form-control"/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Sign In</button>
                    </form>
                </div>
            </div>
        );
    }
    //onSumbit() will loads up as page loads and run in backgroud until its condition meet, so we use onSubmit which will loads up after triggered and all the events happened 

    return (
        <Base title="Sign In" description="This page is from user sign-in">
            {successMsg()}
            {errorMsg()}
            {signInForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
        //this performRedirect or other will keep on running as it loads up, as () is there 
    )
}

export default Signin;