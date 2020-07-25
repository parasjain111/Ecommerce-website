import React,{useState,Fragment,useEffect} from 'react';

const Radiobox =({prices,Handlefilters})=>{
    const [value,setvalue]=useState(0)

   const handletoggle=(e)=>{
    Handlefilters(e.target.value);
    setvalue(e.target.value);
   }
        return prices.map((p, i) => (
            <div key={i}>
                <input type="radio" onChange={handletoggle} name={p} value={p._id} className="form-check-input"/>
                <label className="form-check-label container">{p.name}</label>
            </div>
        ));
    
}

export default Radiobox;