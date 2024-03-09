import {createContext, useContext, useEffect, useLayoutEffect, useState} from 'react';
import useApi from '../hooks/useApi';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from './userContext';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
 const token = JSON.parse(localStorage.getItem('LR_jwt'));
 const {makeRequest} = useApi();
 const {setCurrentUsers, currentUser} = useContext(UserContext)
 const [isloading, setIsloading] = useState(false);
 const [error, setError] = useState(false);
 const history = useHistory();
 const path = 'https://rich-cards.000webhostapp.com/images/' 
 const [summary, setSummary] = useState(null)

 const logoutOut = () => {
  localStorage.removeItem('LR_jwt');
  setCurrentUsers(null);
  history.push('/login');

 }

 const getUser = async(Token, loader) => {
  const cb = () => {
    setError(true)
  }
  if(loader === true){
    setIsloading(true)
  }
  const params = {email:Token?.email}
  const res = await makeRequest('post', 'users/get_current_user', params, cb, Token?.jwt);
  if(res){
    setCurrentUsers(res?.user);
    setIsloading(false);
  }
 }


 const getSummary = async () => { 
  const param = { user_id: currentUser?._id}
  const res = await makeRequest('post', 'users/get_prop_summary', param, null, token?.jwt);
  if(res?.message === 'done') {
    setSummary(res?.summary);
  }
 }
 

 useEffect(()=> {
  if(token){
    getUser(token, true);
  }
 }, [])

 useEffect(() => {
  if(currentUser){
   getSummary()
  }
 }, [currentUser])


   
 return ( 
  <AuthContext.Provider value={{
   getUser,
   logoutOut,
   isloading,
   error,
   token,
   path,
   summary
  }}>
   {props.children}
  </AuthContext.Provider>
 );
}
 
export default AuthContextProvider;
