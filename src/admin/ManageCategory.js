import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import { getAllCategoires, deleteCategory } from './helper/adminapicall'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';

export default function ManageCategory() {
    
    const {user,token}=isAuthenticated()

    const [Categoires, setCategoires] = useState([]);

    const preLoad=()=>{
        getAllCategoires()
        .then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                setCategoires(data);
            }
        })
        .catch((err)=>{
            console.error("Failed to send Categoires Request or Server Rejected");
        });
    }

    useEffect(() => {
        preLoad();
    }, [])

    const deleteThisCategory=(categoryId)=>{
        deleteCategory(user.id,token,categoryId)
        .then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                preLoad();
            }
        });
    }
    
    return (
    <Base title="Welcome admin" description="Manage categories here">
      <h2 className="mb-4">All categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {Categoires.length} catergories</h2>

            {Categoires.map((category,index)=>{
                //
                return(<div key={index} className="row text-center mb-2 ">
                    <div className="col-4">
                    <h3 className="text-white text-left">{category.name}</h3>
                    </div>
                    <div className="col-4">
                    <Link
                        className="btn btn-success"
                        to={`/admin/catergory/update/${category._id}`}
                    >
                        <span className="">Update</span>
                    </Link>
                    </div>
                    <div className="col-4">
                    <button onClick={() => {
                        //
                        //
                        //
                        //
                        //
                        deleteThisCategory(category._id);
                    }} className="btn btn-danger">
                        Delete
                    </button>
                    </div>
                </div>)
            })}
        </div>
      </div>
    </Base>
    )
}