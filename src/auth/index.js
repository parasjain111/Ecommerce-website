export const signup = user => {
    return fetch('/api/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

 export const signin=(user)=>{
        
    return fetch(`/api/signin`,{
         method:'POST',
         headers:{
             Accept:'application/json',
             'Content-Type':'application/json'
         },
         body:JSON.stringify(user)
     })
     .then(response=>{
         console.log('success');
         return response.json();
     })
     .catch(err=>{
         console.log(err);
     })
 }

 export const authenticate=(data,next)=>{
     localStorage.setItem('jwt',JSON.stringify(data));
     next();
 }

 export const signout=(next)=>{
     localStorage.removeItem('jwt');
     next();
     return fetch('http://localhost:8000/api/signout',{
         method:'GET',

     })
     .then(response=>{
         return response.json();
     })
     .catch(err=>{
         console.log(err);
     })
 }

 export const isauthenticated=()=>{
     if(localStorage.getItem('jwt')){
         return JSON.parse(localStorage.getItem('jwt'));
     }
     else{
         return false;
     }
 }