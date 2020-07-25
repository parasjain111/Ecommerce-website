import React,{useState} from 'react';
import Layout from '../core/Layout';
import {Link,Redirect} from 'react-router-dom';
import {signin,authenticate,isauthenticated} from '../auth/index';
const Signin =()=>{
    const {user}=isauthenticated();
    const [values,setvalues]=useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        redirectto:false
    })
    const {email,password,error,loading,redirectto}=values;
    const onchangehandler=name=>event=>{
        setvalues({...values,error:false,[name]:event.target.value});
    }

    const submitval=(event)=>{
        event.preventDefault();
        setvalues({...values,error:false,loading:true});
        signin({email,password}).then(data=>{
            if(data.error){
                console.log('fail');
                setvalues({...values,error:data.error,loading:false})
            }

            else{
                authenticate(data,()=>{
                    setvalues({...values,redirectto:true});
                })
            }
            console.log('dpass');
        })
    }
    const showerror=()=>{
        return (
        <div className="alert alert-danger" style={{display:error?'':'none'}} >
            {error}<Link to="/signup">Signup</Link>
        </div>
        )}
        const showloading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

       const redirect=()=>{
        
           if(redirectto){
             
               if(user && user.role===1)
               {
               return <Redirect to ="/admin/dashboard" />
           }
           else{
               return <Redirect to ="/user/dashboard" />
           }   
             
        }
        if(isauthenticated()){
            return <Redirect to="/" />
        }
    }
    const signupform=()=>{
        return(
            <div className="container">
        <form>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input type="email" name="email" value={email} onChange={onchangehandler('email')} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input type="password" name="password" value={password} onChange={onchangehandler('password')} className="form-control" />
            </div>
            <button onClick={submitval} className="btn btn-primary btn-md">submit</button>
        </form>
        </div>
        )
    }
    return (
        <Layout
            title="Signin"
            description="Signin to Node React E-commerce App"
            className="container col-md-8 offset-md-2" >
            {showloading()}
            {showerror()}
        
        {signupform()}
        {redirect()}
       
        
        </Layout>
    )
       }

export default Signin;
