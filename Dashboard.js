let form=document.querySelector('form');

form.addEventListener('submit',async (e)=>{
    e.preventDefault()

    let title=document.querySelector('#title').value
    let price=document.querySelector('#price').value
    let description=document.querySelector('#description').value    

    const response= await fetch(`https://source.unsplash.com/random/900×700/?${title}`)

    let products={
        title,
        price,
        description,
        image:response.url
    }

    const result=await fetch(`https://loginjs-ec3df-default-rtdb.firebaseio.com/products.json`,{
        method: 'POST',
        body:JSON.stringify(products)
    })
})

onload=getData;
async   function getData(){
    let response= await fetch(`https://loginjs-ec3df-default-rtdb.firebaseio.com/products.json`);

    let data=await response.json()    
    
    let products=[];

    for(let key  in data){
      
        data[key].id=key
       products.push(data[key])
    }
    let tr=''
    products.forEach((item,index)=>{
        tr+=`
        <tr>
            <th scope="row">${index++}</th>
            <td>${item.title}</td>
            <td><img src="${item.image}"></td>
            <td>${item.price}$</td>
            <td><button onclick="Delete('${item.id}')">Delete</button></td>

          </tr>
        `
        document.querySelector('tbody').innerHTML=tr;
    })
}   

async function Delete(id) {
    let response = await fetch(`https://loginjs-ec3df-default-rtdb.firebaseio.com/products/${id}.json`, {
      method: 'DELETE'
    });
   
  }
  