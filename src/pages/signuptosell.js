import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../components/navbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useUtils from '../utils/useutils';
import useApi from '../hooks/useApi';
import GoogleSignUp from '../components/google_signUp';
import UserContextProvider from '../context/userContext';

const SignUp = () => {
  const history = useHistory();
  const {setToast, isSending, isStrongPassword, preventSpaceInPassword} = useUtils();
  const {makeRequest} = useApi();
  const [google, setGoogle] = useState(true)
  const [params, setParams] = useState({
  firstname:"",
  lastname:"",
  email:"",
  phone:"",
  password:"",
  confirm:""
})

 const first = useRef()
 const last = useRef()
 const email = useRef()
 const phone = useRef()
 const password = useRef()
 const confirm = useRef()

 const [verfyEmail, setverfyEmail] = useState(false);

 const validate = () => {
  if(params.firstname === "" || params.firstname === null){
    setToast('Firstname is required');
    first.current.focus();
    return 
  }
  if(params.lastname === ""){
    last.current.focus();
    return setToast('Lastname is required');
  }
  if(params.email === ""){
    email.current.focus();
    return setToast('Email is required');
  }
  if(params.phone === ""){
    phone.current.focus();
    return setToast('Firstname is required');
  }
  if(params.password === ""){
    password.current.focus();
    return setToast('Password is required');
  } 

  if(!isStrongPassword(params.password)){
   return setToast("Password must be at least 8 characters with at least a number, an alphabet and a symbol")
  }


  if(params.confirm === ""){
    confirm.current.focus();
    return setToast('Please confirm password');
  }

  if(params.password !== params.confirm ){
    return setToast('Password does not match')
  }

  return true
 }

const onSubmit = async (e) => {
 e.preventDefault();
 const isValid = validate()
 if(isValid) {
  isSending(true)
  const res = await makeRequest('post', 'user_auth/signup', params, cb);
  if(res){
    isSending(false);
    setverfyEmail(true)
  }
 }
}

const cb =() => {
  isSending(false)
} 

  return (
    <>
    <NavBar  bg={'bg-white'} color={'black'} />
    <div className='my-mother down-8 xs-down-20'>
      <div className='my-col-6 xs-down-5  xs-container xs-down-5 off-3 rad-10 bg-faded my-bottom-50'>
        <div className='my-col-10 xs-container xs-down-5 off-1 down-5'>
          <div className='my-mother'>
            <span className='monR px20 bold'>Sign Up</span> 
            <div className='my-mother down-2'><span className='monR px13'>Buy and rent your dream properties</span></div>
            {verfyEmail && <div className='my-mother down-1 xs-down-5  pd-10 color-code-1 bg-color-code-2'>  <span className='xs-px13 monR  px13 '>Please verify your email address by clicking on the link that has been sent to your mailbox</span></div>}
             <div className='my-mother down-3 xs-down-2'>
             <form onSubmit={onSubmit}>
              <div className='my-col-6 xs-12 xs-down-2'>
                 <div className='my-col-11'>
                 <input ref={first} placeholder='First Name' className="input bg-white rad-10 px13" value={params?.firstname} onChange={(e)=> {setParams(prev => ({...prev, firstname:e.target.value}))}} />       
                 </div>
               </div>
              <div className='my-col-6 xs-12 xs-down-2'>
                 <div className='my-col-12'>
                 <input ref={last} placeholder='Last Name' className="input bg-white rad-10 px13" value={params?.lastname} onChange={(e)=> {setParams(prev => ({...prev, lastname:e.target.value}))}} />           
                 </div>
               </div>
              <div className='my-col-12 xs-12 xs-down-2'>
                 <div className='my-col-12 down-1'>
                 <input ref={email} placeholder='Email Address' className="input bg-white rad-10 px13" value={params?.email} onChange={(e)=> {setParams(prev => ({...prev, email:e.target.value}))}} />     
            </div>
        </div>

      <div className='my-col-12 xs-12 xs-down-2'>
        <div className='my-mother down-1'></div>
        <input ref={phone} placeholder='Phone Number' className="input bg-white rad-10 px13" value={params?.phone} onChange={(e)=> {setParams(prev => ({...prev, phone:e.target.value}))}} />
      </div>

      <div className='my-col-6 xs-12 xs-down-2'>
        <div className='my-col-11 down-2'>
        <input id='pass' ref={password} placeholder='Password' className="input bg-white rad-10 px13" value={params?.password} onChange={(e)=> {setParams(prev => ({...prev, password:e.target.value})); preventSpaceInPassword('pass')}} />
        </div>
      </div>

      <div className='my-col-6 xs-12 xs-down-2'>
        <div className='my-mother down-2'> <input ref={confirm} id='compass' value={params?.confirm} placeholder='Confirm Password' className="input bg-white rad-10 px13" onChange={(e)=> {setParams(prev => ({...prev, confirm:e.target.value})); preventSpaceInPassword('compass')}} /></div>
      </div>
      <div className='my-mother down-1 xs-down-2'><span className='px13 color-code-1'>Signing Up means you have agreed with our terms.</span></div>
      <div className='my-mother down-1 xs-down-2'><button onClick={onSubmit} type="submit" className='anchors bg-color-code-1 white monR'>Submit</button></div>
      <div className='my-mother xs-down-5 down-2'>
        <div className='px13 faded'>------------- Or ----------</div>
        <div className='my-mother xs-down-3'>
          <UserContextProvider>
            <GoogleSignUp/>
          </UserContextProvider>
        </div>
      </div>


      <div className='my-mother down-5 xs-down-10'><span className='px13 color-code-1 pd-10 c-pointer bg-color-code-2' onClick={() => {history.push('/login')}}>I already signed up.</span></div>  
               
              
              
           </form>
            </div>
          </div>
        </div>
      </div>
      <div className='my-col-6 off-3 xs-container  my-bottom-50  xs-down-2 down-2'><span className='pd-10 c-pointer' onClick={()=> {history.push('/')}}><i className='fas fa-angle-left pd-10'></i> Home Page</span></div>
    </div>
    </>
  )
};

export default SignUp;
