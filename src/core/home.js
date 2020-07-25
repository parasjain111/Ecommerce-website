import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import {getproduct} from './userapi';
import Card from './card';
import Shop from './shop';
import Search from './Search';

const Home =()=>{
    const [bysell,setbysell]=useState([])
    const [byarrival,setbyarrival]=useState([]);
    const [error,seterror]=useState(false);
    const loadbysell=()=>{
        getproduct('sold').then(data=>{
            if(data.error){
                seterror(data.error)

            }
            else{
                setbysell(data);
            }
        })
    }
    const loadbyarrival=()=>{
        getproduct('createdAt').then(data=>{
            if(data.error){
                seterror(data.error)

            }
            else{
                setbyarrival(data);
            }
        })
    }
    useEffect(()=>{
        loadbysell();
        loadbyarrival();
    },[]);
    
    return (
  <div>
<Layout title="Home Page" description="Welcome to Home page">
 <Search />
  <h2 className="mb-4">Best sellers</h2>
  <div className="row">
  {bysell.map((product,i)=>(
         <div key={i} className="col-4 mb-3">
         <Card product={product} showbutton={true}/>
         </div>
  ))}
  </div>

<h2 className="mb-4">Best Arrival</h2>
  <div className="row">
  {byarrival.map((product,i)=>(
      <div key={i} className="col-4 mb-3">
        <Card product={product} showbutton={true}/>
        </div>
  ))}
  </div>

</Layout>
    </div>
    )
}

export default Home;