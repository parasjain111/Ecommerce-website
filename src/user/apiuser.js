export const read=(userid,token)=>{
    return fetch(`http://localhost:8000/api/user/${userid}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-Type":"application/json"
        }
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err))
}

export const update = (userId, token,user) => {
 
    return fetch(`http://localhost:8000/api/user/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateuser=(user,next)=>{
    if(localStorage.getItem('jwt')){
        let auth=JSON.parse(localStorage.getItem('jwt'));
        auth.user=user;
        localStorage.setItem('jwt',JSON.stringify(user));
    }

}

export const getpurchasehistory=(userid,token)=>{
    return fetch(`http://localhost:8000/api/orders/by/user/${userid}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-Type":"application/json"
        }
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err))
}