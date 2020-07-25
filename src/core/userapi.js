import querystring from 'query-string';
export const getproduct=(sortBy)=>{
    return fetch(`http://localhost:8000/product/list/all?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const list=(params)=>{
    const query =querystring.stringify(params);
    console.log('query',query);
    return fetch(`http://localhost:8000/product/list/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const read=(productId)=>{
    return fetch(`http://localhost:8000/product/${productId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err))
}

export const related=(productId)=>{
    return fetch(`http://localhost:8000/product/related/${productId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err))
}


export const getclienttoken=(userId,token)=>{
    return fetch(`http://localhost:8000/braintree/gettoken/${userId}`,{
        method:"GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            
        }
    })
    .then(response=>{
        
        return response.json();
    })
    .catch(err=>console.log(err))
}

export const processPayment = (userId, token, paymentData) => {
    return fetch(`http://localhost:8000/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createorder = (userId, token, createrorder) => {
   
    return fetch(`http://localhost:8000/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify({order:createrorder})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

