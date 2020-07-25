export const Catapi = (userId,token,category) => {
    return fetch(`http://localhost:8000/cat/${userId}/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const prodapi = (userId,token,product) => {
    return fetch(`http://localhost:8000/product/${userId}/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            
           
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log('wtf');
        });
};

export const getcategories=()=>{
    return fetch(`http://localhost:8000/cat/getall/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const getfilteres = (skip,limit,filters) => {
    const data={
        limit,
        skip,
        filters

    }
    console.log(data);
    return fetch(`http://localhost:8000/product/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type":'application/json'
           
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const listorders = (userId, token) => {
    return fetch(`http://localhost:8000/order/list/${userId}`, {
        method: 'GET',
        
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getstatus = (userId, token) => {
    return fetch(`http://localhost:8000/order/status-values/${userId}`, {
        method: 'GET',
        
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updatestatus = (userId, token,orderid,status) => {
    return fetch(`http://localhost:8000/order/${orderid}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            "Content-Type":'application/json'
           
        },
        body:JSON.stringify({status,orderid})

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getproducts=()=>{
    return fetch(`http://localhost:8000/product/list/all`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}
export const deleteproduct = (productId,userId, token) => {
    return fetch(`http://localhost:8000/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            "Content-Type":'application/json'
           
        },
       

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getsingleproducts=(productId)=>{
    return fetch(`http://localhost:8000/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const updateproduct = (productId,userId, token,product) => {
    return fetch(`http://localhost:8000/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json'
           
        },
       
        body:product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};