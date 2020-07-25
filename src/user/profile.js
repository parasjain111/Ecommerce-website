import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {isauthenticated} from '../auth/index';
import {Link, Redirect} from 'react-router-dom';
import {read,update,user, updateuser} from './apiuser';

const profile=(props)=>{
    const [values,setvalues]=useState({
        name:'',
        email:'',
        password:'',
        error:false,
        success:false
    })

const {name,email,password,error,success}=values
const {token}=isauthenticated();
const init=(userid)=>{
    read(userid,token)
    .then(data=>{
        if(data.error){
            setvalues({...values,error:true})
        }
        else{
            setvalues({...values,name:data.name,email:data.email})
        }
    })

}
const handlechange=name=>(e)=>{
    setvalues({...values,error:false,[name]:e.target.value})
}


const clicksubmit=(e)=>{
    e.preventDefault()
    console.log('cw');
    update(props.match.params.userId,{name,email,password})
    .then(data=>{
        if(data.error){
            console.log(data.error);
        }
        else{
            updateuser(data,()=>{
                setvalues({...values,name:data.name,email:data.email,success:true})
            })
        }
    })
}


const profileupdate=(name,email,password)=>(
    <form className="form" style={{border:'2px solid black',width:'500px',height:'400px',fontSize:'30px',marginLeft:'20px'}}>
        <div className="form-group">
            <label className="text-muted">Name</label>
            <input type="text" onChange={handlechange('name')} className="form-control" value={name} />
        </div>
        <div className="form-group">
            <label className="text-muted">Email</label>
            <input type="email" onChange={handlechange('email')} className="form-control" value={email} />
        </div>
        <div className="form-group">
            <label className="text-muted">password</label>
            <input type="password" onChange={handlechange('password')} className="form-control" value={password} />
        </div>
        <button onClick={clicksubmit} className="btn btn-outline-primary">Submit</button>
    </form>
)

useEffect(()=>{
init(props.match.params.userId)
},[])
    return (
<Layout title="User Profile" description="update your profile">
    <h2 className="mb-4">Update Profile</h2>
    {profileupdate(name,email,password)}
   
    </Layout>
    )
    }

export default profile;