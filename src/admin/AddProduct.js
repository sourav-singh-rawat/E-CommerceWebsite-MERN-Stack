import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import {Link, Redirect} from "react-router-dom"
import { getAllCategoires, addProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

export default function AddProduct() {
    
    const {user,token} = isAuthenticated()

    const [values, setValue] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        error:"",
        isLoading:false,
        getRedirect:"",
        categories:[],
        category:"",
        photo:"",
        createdProduct:"", //
        formData:"" //
    })
    const {name,description,price,stock,photo,categories,category,createdProduct,getRedirect,isLoading,formData,error} = values;
    
    //
    //
    //
    const preLoad=()=>{
      getAllCategoires()
      .then((data)=>{
        if(data.error){
          setValue({...values, error:data.error});
        }else{
          //
          setValue({...values,categories:data,formData:new FormData()});
        }
      })
      .catch((err)=>{
        console.error("Cant Send Categories Request")
      })
    }

    //
    //
    useEffect(() => {
      preLoad();
    }, [])

    //
    const handleChange=(field)=>(event)=>{
      //
      const value= field=== "photo" ? event.target.files[0] : event.target.value; 
      //
      formData.set(field,value) 

      //
      //
      setValue({...values,[field]:value})
    }

    const onSubmit=(event)=>{
        event.preventDefault();
        setValue({...values,error:"",isLoading:true});
        addProduct(user.id,token,formData)
        .then((data)=>{
          if(data.error){
            setValue({...values,error:data.error,isLoading:false})
          }else{
            setValue({...values,
              isLoading:false,
              error:"",
              name:"",
              description:"",
              price:"",
              stock:"",
              category:"",
              photo:"",
              createdProduct:data.name})
          }
        })
        .catch((err)=>{
          console.error("Failed to send create product request");
        })
    }
    const onLoading = ()=>{
      return (
        <div 
        style={{display:isLoading?"":"none"}}
        className="alert alert-info mt-3">
          <h4>Loading...</h4>
        </div>
      )
    }
    
    const onSuccessCreate =()=>{
      return (
        <div 
        style={{display:createdProduct?"":"none"}}
        className="alert alert-success mt-3">
          <h4>{createdProduct} created successfully</h4>
        </div>
      )
    }

    const onCreateError =()=>{
      return (
        <div 
        style={{display:error?"":"none"}}
        className="alert alert-danger mt-3">
          <h4>{error}</h4>
        </div>
      )
    }
    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={
                //
                handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {
                //
                categories && categories.map((cate,index)=>{
                  return (
                    //
                    //
                    <option key={index} value={cate._id}>{cate.name}</option>
                  );
                })
              }
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
            Create Product
          </button>
        </form>
    );

    return (
        <Base title="Add Product" 
            description="Welcome to add product section"
            className="container bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-dark mb-3 btn-md">Admin Home</Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2 py-4">
                  {onLoading()}
                  {onSuccessCreate()}
                  {onCreateError()}  
                  {createProductForm()}
                </div>
            </div>
        </Base>
    )
}
