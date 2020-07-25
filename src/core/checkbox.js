import React,{useState} from 'react';

const Checkbox=({categories,Handlefilters})=>{
    const [checked,setchecked]=useState([])
    const handletoggle=c=>()=>{
        console.log('dc')
        const cid=checked.indexOf(c);
        const newchecked=[...checked];
        if(cid===-1){
            newchecked.push(c);
        }
        else{
            newchecked.splice(cid,1);
        }
        
        setchecked(newchecked);
        Handlefilters(newchecked);
    }
    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input type="checkbox" onChange={handletoggle(c._id)} value={checked.indexOf(c._id===-1)} className="form-check-input"/>
            <label className="form-check-label container">{c.name}</label>
        </li>
    ));
};


export default Checkbox;