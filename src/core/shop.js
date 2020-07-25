
import React, { useState,useEffect} from 'react';
import Layout from './Layout'; 
import {getcategories,getfilteres} from '../Admin/adminapi';
import Checkbox from './checkbox';
import {prices} from './Prices';
import Radiobox from './Radiobutton';
import Card from './card';
const Shop=()=>{
    const [myfilters,setmyfilters]=useState({
        filters:{
        categories:[],
        price:[]}
    })
    const [categories,setcategories]=useState([]);
    const [error,seterror]=useState(false);
    const [limit,setlimit]=useState(6);
    const [skip,setskip]=useState(0);
    const [filteresult,setfilteresult]=useState([]);
    const [size,setsize]=useState(0);
    const first=()=>(
        getcategories().then(data=>{
            if(data.error){
                seterror(data.error);
            }
            else{
                setcategories(data);
            }
       })
    )

    const handlefilters=(filters,filterby)=>{
       // console.log(filters,filterby);
       const newfil={...myfilters};
       newfil.filters[filterby]=filters;
       if(filterby=="price"){
           const pricevalues=handleprice(filters);
           newfil.filters[filterby]=pricevalues;
       }
       setmyfilters(newfil);
       loadfilter(myfilters.filters);
       
     

    }

    const loadfilter=(newfil)=>{
        getfilteres(skip,limit,newfil)
        .then(data=>{
            if(data.error){
                seterror(data.error)
            }
            else{
                setsize(data.size);
                setfilteresult(data.data);
                setskip(0);
            }
        })
    }

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getfilteres(toSkip, limit, myfilters.filters).then(data => {
            if (data.error) {
                seterror(data.error);
            } else {
                setfilteresult([...filteresult, ...data.data]);
                setsize(data.size);
                setskip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-success">
                    Load more
                    cs
                </button>
            )
        );
    };


    const handleprice=(p)=>{
        const data=prices;
        let array=[];
        for(let key in data){
            if(data[key]._id===parseInt(p)){
                array=data[key].array;
            }
        }
        return array;
    
    }

    useEffect(()=>{
    
        first();
     loadfilter(skip,limit,myfilters.filters)
    },[])

    return (
        <Layout title="Shopping Page" desccription="get varieties at our store">
<div className="row">
                <div className="col-4">
                    <h2>Filter by category</h2>
                    <ul>
                    <Checkbox categories={categories} prices={prices} Handlefilters={filters=>{

                handlefilters(filters,'categories')}}/>
              </ul>
              <h4>Filter by Price</h4>
                        <div>
                            <Radiobox prices={prices} Handlefilters={filters=>{ handlefilters(filters,'price')}}/>
                        </div>

                </div>
                <div className="col-8">
               <h2 className="mb-4">Products</h2>
               <div className="row">
                   {filteresult.map((product,i)=>(
                        <div key={i} className="col-4 mb-3">
                        <Card product={product} showbutton={true}/>
                        </div>
                   ))}
                   </div>   
                   <br>
                   </br>
                   {loadMoreButton()}             
                </div>
                </div>
        </Layout>
    )
}
export default Shop;