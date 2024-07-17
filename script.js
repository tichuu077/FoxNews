/*document.addEventListener('DOMContentLoaded', function () {
  const toastElement = document.getElementById('myToast');
  const toast = new bootstrap.Toast(toastElement);

  // Optionally, show the toast on page load
  toast.show();
});*/
let login = document.getElementById('btnLogin');
const signUp = document.getElementById('btnSignUp');
let userName = document.getElementById('userName');
 let password = document.getElementById('password');
const loginBox = document.getElementById('loginBox')
let error = document.querySelector('.error');
let user={};
const infoBox = document.getElementById('infoBox')
const infoBoxTitle = infoBox.querySelector('.modal-title')
const infoBoxBody = infoBox.querySelector('.modal-body')
const infoBoxBtn = document.getElementById('btn-modal')
console.log(infoBoxBtn)
signUp.addEventListener('click',()=>{
  loginBox.innerHTML=`
        <h2 class="text-center text-white my-4">Sign UP</h2>
        <form id="loginForm" class="d-flex flex-column justify-content-between">
          <div class="form-floating my-2">
            <input class="form-control" type="text" id="name" placeholder="name" required>
            <label for="name">Name</label>
          </div>
          <div class="form-floating my-2">
            <input class="form-control" type="text" id="userName" placeholder="Username" required>
            <label for="username">Username</label>
          </div>
          <div class="form-floating my-2">
            <input class="form-control" type="password" id="password" placeholder="Password" required>
            <label for="password">password</label>
          </div>
          <div class="form-floating my-2">
            <input class="form-control" type="text" id="age" placeholder="Age" required>
            <label for="password">Age</label>
          </div>
          <button id="create" class="btn btn-outline-light my-2" 
data-bs-toggle="toast" data-bs-target='#myToast' type="button">Create</button>
        </form>
        `
  let userName = document.getElementById('userName');
   let password = document.getElementById('password');
   let fullname = document.getElementById('name');
  let age = document.getElementById('age');
  const create = document.getElementById('create')
  const toastElement = document.getElementById('myToast');
  const toast = new bootstrap.Toast(toastElement);
  const toastTitle = toastElement.querySelector('.me-auto');
  const toastBody = toastElement.querySelector('.toast-body')
    create.addEventListener('click',()=>{
    let checkValue=check([fullname,userName,password,age,create]);
     
    if(!checkValue){
     
       toast.show();
    }
    else{
    let user={
      fullname:fullname.value,
      userName:userName.value,
      password:password.value,
      age:age.value
    }
    let userList = localStorage.getItem('userList')
    userList=JSON.parse(userList)
    if(userList){
      userList.push(user)
      localStorage.setItem("userList",JSON.stringify(userList))
    }
    else{
      let userList=[];
      userList.push(user)
      localStorage.setItem("userList",JSON.stringify(userList))
    }
      
    toastTitle.innerHTML=`User Created`;
    toastBody.innerHTML=`new user created successfull`
    toast.show();
    loginBox.innerHTML=`
     <h2 class="text-center text-white my-4">Login</h2>
     <div class="form-floating my-2">
            <input class="form-control" type="text" id="username" placeholder="Username" required>
            <label for="username">Username</label>
          </div>
          <div class="form-floating my-2">
            <input class="form-control" type="password" id="password" placeholder="Password" required>
            <label for="password">password</label>
          </div>
          <button id="btnLogin" class="btn btn-outline-light my-3" 
data-bs-toggle="modal" data-bs-target="#infoBox" type="button">Login</button>
        </form>
        <p class="error text-danger mt-2" id="errorMessage" style="display:block;"></p>`
      password=document.getElementById('password');
      userName=document.getElementById('username')
    let login = document.getElementById('btnLogin');
     login.addEventListener('click',()=>{
       let userList=localStorage.getItem('userList');
       let userCheck=false;
       userList=JSON.parse(userList)
        
       
       if(userList){
         let user= userList.find((e)=>e.userName===userName.value)
          if(user){
            if(user.password===password.value){
              infoBoxTitle.innerHTML=`<h4>Login Success</h4>`
               infoBoxBody.innerHTML=`Login success keep it on`
              infoBoxBtn.classList.remove('btn-danger');
              infoBoxBtn.classList.add('btn-success');
              infoBoxBtn.innerHTML=`OK`;
              infoBoxBtn.addEventListener('click',()=>{
                localStorage.setItem('user',JSON.stringify(user))
                window.location.href='newspage.html';
              })
              error.innerHTML=`Login Success`
              error.classList.remove('text-danger')
              error.classList.add('text-success')
            }
            else{
              infoBoxTitle.innerHTML=`<h4>Incorrect Password</h4>`
              infoBoxBody.innerHTML=`Please check password and fill again`
              error.innerHTML=`Incorrect Password`
            }
          }
          else{
            infoBoxTitle.innerHTML=`<h4>Invalid Username</h4>`
            infoBoxBody.innerHTML=`please check username`
            error.innerHTML=`Please Fill Password`
          }
           
        }
     })
    }
  })


})

 
 login.addEventListener('click',()=>{
   let userList=localStorage.getItem('userList');
   userList=JSON.parse(userList)
   if(userList){
    let user= userList.find((e)=>e.userName===userName.value)
     if(password.value&&userName.value){
       if(user.password===password.value){
         infoBoxTitle.innerHTML=`<h4>Login Success</h4>`
          infoBoxBody.innerHTML=`Login success keep it on`
         infoBoxBtn.classList.remove('btn-danger');
         infoBoxBtn.classList.add('btn-success');
          infoBoxBtn.innerHTML=`OK`;
        infoBoxBtn.addEventListener('click',()=>{
           localStorage.setItem('user',JSON.stringify(user))
          window.location.href='newspage.html';
        })
         error.innerHTML=`Login Success`
          error.classList.remove('text-danger')
          error.classList.add('text-success')
       }
       else{
         infoBoxTitle.innerHTML=`<h4>Incorrect Password</h4>`
         infoBoxBody.innerHTML=`Please check password and fill again`
         error.innerHTML=`Incorrect Password`
       }
     }
     else{
       infoBoxTitle.innerHTML=`<h4>Invalid Username</h4>`
       infoBoxBody.innerHTML=`please check username`
       error.innerHTML=`Please Fill Password`
     }
   }
 })

function check(arr){
 let value=true;
  arr.forEach((e)=>{
    if(e.value===null){
      value= false;
    }
  })
  
  return value;
}