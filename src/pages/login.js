import React, { useContext, useRef, useState } from 'react';
import NavBar from '../components/navbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useUtils from '../utils/useutils';
import useApi from '../hooks/useApi';
import { AuthContext } from '../context/authcontex';
import { UtilsContext } from '../context/utilsContext';
import GoogleSignUp from '../components/google_signUp';
import UserContextProvider from '../context/userContext';

const Login = () => {
  const history = useHistory();
  const {setToast, isSending, preventSpaceInPassword} = useUtils();
  const {makeRequest} = useApi();
  const { getUser} = useContext(AuthContext);
  // const {getCat, Category, selectedOptions, getFeatures, features, selectedFeatures} = useContext(UtilsContext);
  const [params, setParams] = useState({
  email:"",
  password:"",
})
const email = useRef()
const password = useRef()

 const validate = () => {
  if(params.email === ""){
    email.current.focus();
    return setToast('Email is required');
  }
  if(params.password === ""){
    password.current.focus();
    return setToast('Firstname is required');
  }
  return true
 }

const onSubmit = async (e) => {
  e.preventDefault();
 const isValid = validate()
 if(isValid) {
  isSending(true)
  const res = await makeRequest('post', 'user_auth/login', params, cb);
  if(res){
    isSending(false);
    localStorage.setItem('LR_jwt', JSON.stringify(res))
    window.location = '/dashboard'
  }
 }
}

const cb =() => {
  isSending(false)
} 

  return (
    <>
    <NavBar  bg={'bg-white'} color={'black'} />
    <div className='my-mother down-10 xs-down-20'>
      <div className='my-col-4 xs-down-5  xs-container xs-down-10 off-4 rad-10 bg-faded my-bottom-50'>
        <div className='my-col-10 xs-10 xs-off-1 xs-down-5 off-1 down-5'>
          <div className='my-mother'>
            <span className='monR px20 bold'>Login</span> 
            <div className='my-mother down-2'><span className='monR px13'>Buy and rent your dream properties</span></div>
             <div className='my-mother down-3 xs-down-5'>
             <form onSubmit={onSubmit}>
              <div className='my-col-12 xs-12 xs-down-5'>
                 <div className='my-col-12 down-1'>
                 <input ref={email} placeholder='Email Address' className="input bg-white rad-10 px13" value={params?.email} onChange={(e)=> {setParams(prev => ({...prev, email:e.target.value}))}} />     
            </div>
        </div>
      <div className='my-col-12 xs-12 xs-down-5'>
        <div className='my-col-12 down-2'>
        <input id='loginpas' type='password'  ref={password} placeholder='Password' className="input bg-white rad-10 px13" value={params?.password} onChange={(e)=> {setParams(prev => ({...prev, password:e.target.value})); preventSpaceInPassword('loginpas')}} />
        </div>
      </div>
       <div className='my-mother down-2 xs-down-5'><button onClick={onSubmit} type="submit" className='anchors bg-color-code-1 white monR'>Login</button></div>
       <div className='my-mother xs-down-5 down-5'>
        <div className='px13 faded'>------------- Or ----------</div>
        <div className='my-mother xs-down-3 down-1'>
          <UserContextProvider>
           <GoogleSignUp/>
          </UserContextProvider>
        </div>
      </div>
       <div className='my-mother down-5 xs-down-10'><span className='px13 color-code-1 pd-10 c-pointer bg-color-ode-2' onClick={() => {history.push('/signup')}}>I haven't signed up.</span></div>
           </form>
            </div>
          </div>
        </div>
      </div>
      <div className='my-col-4 off-4 xs-container xs-down-2 my-bottom-10 down-3'><span className='pd-10 c-pointer' onClick={()=> {history.push('/')}}><i className='fas fa-angle-left pd-10'></i> Home Page</span></div>
    </div>
    </>
  )
};

export default Login;
