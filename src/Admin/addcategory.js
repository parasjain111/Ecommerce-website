import React,{useState} from 'react';
import Layout from '../core/Layout';
import {Link,Redirect} from 'react-router-dom';
import {signin,authenticate,isauthenticated} from '../auth/index';
import {Catapi} from './adminapi';
const Addcategory=()=>{
    const [name,setname]=useState('');
    const [error,seterror]=useState('');
    const [success,setsuccess]=useState('');
    const {user,token} =isauthenticated();
    const handlechange=(e)=>{
        seterror('');
        setname(e.target.value);
    
    }
    const clickSubmit=(e)=>{
        console.log(e);
        e.preventDefault();
        seterror('');
        setsuccess('false');
        Catapi(user._id,token,{name}).then(data=>{
            if(data.error){
                seterror(true);
            }
            else{
                seterror('');
                setsuccess(true);
            }
        })
    }

    const showsuccess=()=>{
        if(success){
        return <h3 className="alert alert-info">Category {name} has created</h3>
        }
    }

    const showerror=()=>{
        if(error){
        return <h3 className="alert alert-danger">Category is not unique</h3>
        }
    }
    const catform=()=>(
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category Name</label>
                <input type="text" value={name} className="form-control" onChange={handlechange} />
            </div>
            <button className="btn btn-primary">Add Category</button>
        </form>

)
    return (
        <Layout title="Add category" description={name} className="container col-md-8 offset-md-2" >
            {showerror()}
            {showsuccess()}
            {catform()}
           
       
        
        </Layout>
        
    )
}

export default Addcategory;

