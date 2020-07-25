import React,{useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {Link,Redirect} from 'react-router-dom';
import {signin,authenticate,isauthenticated} from '../auth/index';
import {Catapi} from './adminapi';
import {getproducts,deleteproduct} from './adminapi';
import product from '../core/product';

const Managepro=()=>{
const [products,setproducts]=useState([])
const {user,token}=isauthenticated();
const loadproducts=()=>{
    getproducts().then(data=>{
        if(data.error){
                console.log(data.error)
        }
        else{
            setproducts(data);
        }
    })
}

const destroy=(productid)=>{
    deleteproduct(productid,user._id,token)
    .then(data=>{
        if(data.error){
            console.log(data.error)
        }
      
            console.log(data);
            loadproducts()
    
    })
}

useEffect(()=>{
loadproducts();
},[])


return (
    <Layout title="Manage products" description="ADD/DELETE/UPDATE/VIEW PRODUCTS">
        <div className="row">
           <div className="col-12">
               <h2 className="text-center">
                   Total products:{products.length}
               </h2>
               <ul className="list-group">
                  {products.map((p,i)=>(
                       <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                           <h3>{p.name}</h3>
                           <Link to={`/admin/product/update/${p._id}`}>
                            <button className="badge badge-warning">
                                   update
                               </button>
                               </Link>
                               <button onClick={()=>destroy(p._id)} className="badge badge-danger">
                                   Delete
                               </button>
                      </li>

))}
               </ul>
           </div>
        </div>
    </Layout>
)

}

export default Managepro;