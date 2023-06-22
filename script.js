let form =document.querySelector('form');
form.addEventListener('submit', login)



async function register(e){
    e.preventDefault(e);
    
    let API_KEY='AIzaSyAcCDTT0waBGQyAAyZMcmATGcfce-mgAOU';
    let email=document.querySelector('#mail').value;
    let password=document.querySelector('#pass').value;
    let user={
        email,
        password,
        returnSecureToken : true
    }
    
    try{
        
        let response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,{
            method:'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json'
            }
            
        });
        
        let result=await response.json()
        console.log(result);
        
    }catch(err){
        console.log(err);
    }

    }

async function login(e){

    let API_KEY='AIzaSyAcCDTT0waBGQyAAyZMcmATGcfce-mgAOU';
    let email=document.querySelector('#mail').value;
    let password=document.querySelector('#pass').value;
    let user={
        email,
        password,
        returnSecureToken : true
    }
    

    e.preventDefault(e)     
    try{
        
        let response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,{
            method:'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json'
            }
            
        });
        
        let result=await response.json()
        
        if(result.idToken){
            location.replace(`http://127.0.0.1:5500/Dashboard.html`)
        }
        
    }catch(err){
        console.log(err);
    }
}
