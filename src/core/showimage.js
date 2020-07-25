import React from 'react';
const showimage=({item,url})=>(
    <div className="product-img">
        <img src={`http://localhost:8000/product/photo/of/${item._id}`} className="mb-3" alt={item.name} style={{maxHeight:'100%',maxWidth:'100%'}} />
    </div>
)

export default showimage;