import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import {Link,Redirect} from 'react-router-dom';
import {signin,authenticate,isauthenticated} from '../auth/index';
import {Catapi,prodapi,getcategories} from './adminapi';

const Addproduct=()=>{
const {user,token}=isauthenticated();
const [values,setvalues]=useState({
    name:'',
    description:'',
    price:'',
    categories:[],
    category:'',
    shipping:'',
    quantity:'',
    photo:'',
    loading:false,
    error:'',
    createdproduct:'',
    redirectto:false,
    formData:''
});

const {name,
description,
price,
categories,
category,
shipping,
quantity,
loading,
error,
createdproduct,
redirectto,
formData
}=values;

const first=()=>{
    getcategories().then(data=>{
        if(data.error){
            setvalues({...values,error:data.error})
        }
        else{
            setvalues({...values,categories:data,formData:new FormData()})
        }
    })
}
const showloading=()=>(
    loading &&(
        <div className="alert alert-info"><h2>Loading...</h2></div>
    )
)
const handleChange = name => event => {
    console.log(event.target)
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    console.log(value)
    formData.set(name, value);
    setvalues({ ...values, [name]: value });
};

const clickSubmit = event => {

    event.preventDefault();
    console.log(formData);
    setvalues({ ...values, error: '', loading: true });

    prodapi(user._id, token, formData).then(data => {
        if (data.error) {
            setvalues({ ...values, error: data.error });
        } else {
            setvalues({
                ...values,
                name: '',
                description: '',
                photo: '',
                price: '',
                description:'',
                shipping:'',
                quantity: '',
                loading: false,
                error:'',
                createdProduct: data.name
            });
        }
    });
}

useEffect(()=>{
    
    first();
},[])

const showerror=()=>(
    <div className="alert alert-danger" style={{display:error ? '':'none'}}>
        {error}
    </div>
)
const showsuccess=()=>(
    <div className="alert alert-success" style={{display:createdproduct?'':'none'}} >
        {createdproduct}
    </div>
)
const postform=()=>(
    <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    { categories && categories.map((c,i)=>(
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                        
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
)




    return (
    <Layout title="Add Product" description="add product here" className="container col-md-8 offset-md-2" >
    {showloading()}
    {showsuccess()}
    {showerror()}
    
    {postform()}
    
    </Layout>
    
)
}

export default Addproduct;