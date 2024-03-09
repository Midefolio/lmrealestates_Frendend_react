import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useUtils from '../utils/useutils';

const useApi = () => {
 const {setToast, errorHandler, isPending} = useUtils();
 const history = useHistory();

const requestMaker = async (api, params, abortController) => {
  const form = new FormData();
  const key = Object.keys(params);
  const value = Object.values(params);

  for (var i = 0; i < key.length; i++) {
    form.append(key[i], value[i]);
  }

  const request = {
    method: 'post',
    url: api,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: form,
    signal: abortController?.current.signal, // Pass the signal from the AbortController
  };  
  try {
   const status = await axios(request);
   const res = status?.data;
   return res;
  }catch (error) {
    if(error.response?.status === 500 ){
     setToast(`<div class='black'>Error 500 - Internal Server Error</div>
     <div class='down-5 mother'>Unable to connect to the server. Please try again later.</div>
     <div class='mother down-2'><a href="">Learn More</a></div>`)
     return;
    }
    if(error.response?.status === 400 ){
     setToast(`<div class='black'>Error 400 - Internet Error</div>
     <div class='down-3 mother'>Unable to connect to the server. Please check your internet and try again.</div>
     <div class='mother down-3'><a href="">Learn More</a></div>`)
     return;
    }
   if(error.message === 'Network Error' ){
    setToast(`<div class='black'>Error 400 - Internal Server Error</div>
     <div class='down-3 mother'>Unable to connect to the server. Please try again later.</div>
     <div class='mother down-3'><a href="">Learn More</a></div>`)
     return;
   }
  }
}

const handleBankVerify = async (params) => {
  const request = {
    method: 'GET',  
    url: `https://api.paystack.co/bank/resolve?account_number=${params?.account_number}&bank_code=${params?.bank_code}`, 
    headers:{'Authorization': 'Bearer sk_test_749876991a0b83eaa23f8a8ce367dfd3fd222ec8'} 
   }  
   try{
    const result = await axios(request);
    return result.data;
  } catch (error) {
   if(error.message === 'Network Error'){
    setToast(`<div class='black'>Error 400 - Internal Server Error</div>
    <div class='down-3 mother'>Unable to connect to the server. Please try again later.</div>
    <div class='mother down-3'><a href="">Learn More</a></div>`)
    // isPending('login_btn', 'Login')
    return;
    }
    }
  }

   const makeRequest = async (method, api, params, cb, token, abortController) => {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    const details = {
      method,
      url:api,
      headers,
      data: params, // Axios will handle the JSON.stringify for you
      signal:abortController?.current.signal, // Pass the signal from the AbortController
    };
  
    try {
      const response = await axios(details);
      return response?.data; // Assuming you want to return the response data
    } catch (error) {
      if (error?.response?.data?.error) {
        setToast(error?.response?.data?.error);
      } else {
        setToast(error?.response?.data);
      }
      if (error?.response?.data?.error === 'No Authorization token, Please login') {
        history.push('/login')
      }
      if (error?.response?.data?.error === 'Session Expired') {
        history.push('/login')
        localStorage.removeItem('LR_jwt')
      }
      if (error?.message === 'Network Error') {
        setToast('Network Error: Please check your internet and try again');
      }
      if (cb) {
        cb();
      }
    }
  }


  const getLocation = async (method, url) => {
    const config = {
      method,
      url,
      headers: {
        'X-CSCAPI-KEY': 'API_KEY'
      }
    };

    try {
      const response = await axios(config)
      return response.data

    } catch (error) {
      console.log(error);
      
    }
  }
 
return {
  requestMaker,
  handleBankVerify,
  makeRequest,
  getLocation
 };
}
 
export default useApi;