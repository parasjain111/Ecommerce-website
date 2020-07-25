import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import {getproduct,read,related} from './userapi';
import Card from './card';
import Shop from './shop';
import Search from './Search';


const product=(props)=>{
    const [product,setproduct]=useState({});
    const [error,seterror]=useState(false);
    const [relpro,setrelpro]=useState([]);

    const loadingsingle=productid=>{
        console.log(productid);
        read(productid).then(data=>{
            if(data.error){
                seterror(data.error);
            }
            else{
                setproduct(data);
                related(productid).then(data=>{
                    if(data.error){
                        seterror(data.error);
                    }
                    else{
                        setrelpro(data);
                    }
                })
            }
        })
    }


    useEffect(()=>{
        const productId=props.match.params.productId;
    console.log(productId);
        loadingsingle(productId);
    },[props]);
    return (
        <Layout title={product.name} description={product.description}> <h2 className="mb-4">Single product</h2>
 <div className="row">
     <div className="col-8">
    <Card product={product} showbutton={false}/>
 </div>
 <div className="col-4">
     <h3>People Also Search for</h3>
     <div className="mb-3">
         {relpro.map((p,i)=>(

             <Card key={i} product={p} showbutton={true} />
         ))}
     </div>
 </div>
 </div>
        
            </Layout>
        
    )
}
export default product;