import React, { useState, useEffect } from 'react';
import {getcategories} from '../Admin/adminapi';
import Shop from './shop';
import {list} from './userapi';
import Card from './card';
const Search=()=>{

    const [data,setdata]=useState({
        categories:[],
        category:'',
        search:'',
        results:[],
        searched:false
    });
    const {categories,category,search,results,searched}=data;


 const loadcategories=()=>(
        getcategories().then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                setdata({...data,categories:data});
            }
       })
    );
const searchChange=name=>event=>{
    setdata({...data,[name]:event.target.value,searched:false})
}



const searchsubmit=(e)=>{
e.preventDefault();
searchData();
}

const searchData=()=>{
console.log(search,category);
if(search){
    list({search:search|| undefined,category:category})
    .then(response=>{
        if(response.error){
            console.log(response.error)
        }
        else{
            setdata({...data,results:response,searched:true});
        }
    })
}

}
const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
        return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
        return `No products found`;
    }
};

const searchform=()=>(
    <form onSubmit={searchsubmit} >
        <span className="input-group-text">
            <div className="input-group input-group-lg">
                <div className="input-group-prepend">
                    <select className="btn mr-2" onChange={searchChange('category')}>
                        <option value="All">Pick category</option>
                        {categories.map((c,i)=>( <option key={i} value={c._id}>{c.name}</option>))}
                    </select>
                </div>
                <input type="search" className="form-control" onChange={searchChange('search')} placeholder="search by name" />
            </div>
            <div className="btn input-group-append" >
                <button className="inpur-group-text">Search</button>
            </div>
        </span>
        
    </form>
)

const searchedproduct=(results=[])=>{
    return (
        <div>
        <h2 className="mt-4 mb-4">
        {searchMessage(searched, results)}
    </h2>
        <div className="row">
            {results.map((p,i)=>(
                 <div key={i} className="col-4 mb-3">
                 <Card product={p} showbutton={true}/>
                 </div>
            ))}
        </div>
        </div>
    )
}

useEffect(()=>{
    loadcategories();
},[]);

return(
    <div className="row">
        <div className="container">{searchform()}</div>
        <div className="container">{searchedproduct(results)}
        </div>
        </div>
)


};

export default Search;


