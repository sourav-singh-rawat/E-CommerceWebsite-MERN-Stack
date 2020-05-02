import React, { useState } from 'react'
import Base from '../core/Base'
import { signup } from '../auth/helper'
import { Link } from 'react-router-dom'

const Signup =()=>{

    //useState will create a state (block) of data to send
    //value will use for fetch data, setValue is methord use to set data
    //we can never set these value directly, we can only do by setValue
    const [values,setValue]= useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    })
    
    const {name,email,password,error,success} = values;

    //this will handle and set the values in state block
    //this is advance JS , here the field methord will pass to event methord
    const handleValue=(field)=>(event)=>{
        //...value is used to grab all the old data to this, WE ALWAYS NEED TO GRAB THE WHOLE DATA FIRST BEFORE DOING OR SETING ANYTHING    
        //this error is from the same data block, will use it for showing or not showing error msg
        //this event.target.value(as you know is used for input feild data grab) is the grabing the value form passed input field
        //[field] can be `name`,`email`... we will pass these from input fields manuly as we want ,which input should set which field of state(block), its our choice not forced with any other thing like input block or there name ,nothing like that matters
        setValue({...values,error:false,[field]:event.target.value})
    }

    //for submit button
    const onSubmit=(event)=>{
        //this will prevent the default behavior of sumit form 
        event.preventDefault()
        setValue({...values,error:false})
        //passing data we want to send in distructed manaer so it will be created as json using these vairable names and data
        //this methord will return some data, by using its `then methord`
        //pasing object to user field in signup
        signup({name,email,password})
        .then((data)=>{
            //success we will use for show success msg

            //this data is coming from either .then or .catch of signup methord in auth, so you need to use same varibale to catch the data,like `err` i have defined there
            if(data.err){
                setValue({...values,error:data.err,success:false})
            }else{  
                //seting all values black after submition
                setValue({
                    ...values,
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    success:true
                })
            }
        })
        .catch((err)=>console.log("Failed Send to Signup Request"))
    }

    const successMsg = ()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                    style={{display: success ? "" :"none" }}
                    className="alert alert-success text-center">
                        New account has been created successfully. Please <Link to="/signin">Login Here</Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMsg = ()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                    style={{display: error ? "" :"none" }}
                    className="alert alert-danger text-center">
                        {error}
                    </div>
                </div>
            </div>
        )
    }
    
    //we will just create model of form, but not use any of the sending data feature of typical form
    const signUpForm= ()=>{
        return (
            <div className="row">
                <div className="col-md-6 text-left offset-sm-3">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input value={name} type="text" onChange={handleValue("name")} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input value={email} type="email" onChange={handleValue("email")} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input value={password} type="password"  onChange={handleValue("password")} className="form-control"/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
    //writing methord as onSubmit() and as onSubmit there is a difference, `onSubmit()` will {called on the spot as web loads} and `onSubmit` wait and let all the event done associated with it first   


    return (
        <Base title="Sign Up" description="This page is from user signup">
            {successMsg()}
            {errorMsg()}
            {signUpForm()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup;