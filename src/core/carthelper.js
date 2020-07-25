export const addItem=(item,next)=>{
    console.log('nerj');
    let cart=[]
    if(localStorage.getItem('cart')){
        cart=JSON.parse(localStorage.getItem('cart'))
    }
    cart.push({
        ...item,
        count:1
    })

    cart=Array.from(new Set(cart.map((p)=>(p._id)))).map(id=>{
        return cart.find(p=>
            p._id===id)
    })
    localStorage.setItem('cart',JSON.stringify(cart));
next();
}


export const itemtotal=()=>{
    if(localStorage.getItem('cart')){
        return JSON.parse(localStorage.getItem('cart')).length;
    }

return 0;
}

export const getcarts=()=>{
    if(localStorage.getItem('cart')){
        return JSON.parse(localStorage.getItem('cart'))
    }
    return [];
}

export const updateitem=(productid,count)=>{
    let cart=[];
    if(localStorage.getItem('cart')){
        cart=JSON.parse(localStorage.getItem('cart'))
         
    }

    cart.map((p,i)=>{
        if(p._id===productid){
        cart[i].count=count;
    }

})
localStorage.setItem('cart',JSON.stringify(cart));

}

export const removeitem=(productid)=>{
    let cart=[];
    if(localStorage.getItem('cart')){
        cart=JSON.parse(localStorage.getItem('cart'))
         
    }

    cart.map((p,i)=>{
        if(p._id===productid){
        cart.splice(i,1);
    }

})
localStorage.setItem('cart',JSON.stringify(cart));
return cart;
}

export const removecart=next=>{
    localStorage.removeItem('cart');
    next();
}