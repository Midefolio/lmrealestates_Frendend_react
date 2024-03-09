import {createContext, useContext, useEffect, useLayoutEffect, useState} from 'react';
import useApi from '../hooks/useApi';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from './userContext';

export const UtilsContext = createContext();

const UtilsContextProvider = (props) => {
 const token = JSON.parse(localStorage?.getItem('LR_jwt'));
 const path = 'https://rich-cards.000webhostapp.com/images/'; 
 const {makeRequest} = useApi();
 const [selectedOptions, setSelectedOptions] = useState([]);
 const [selectedFeatures, setSelectedFeatures] = useState([]);
 const {setCategory, setFeatures} = useContext(UserContext)
 const [isloading, setIsloading] = useState(false);
 const [error, setError] = useState(false);
 const [cat, setCat] = useState([])
 const [fea, setFea] = useState([])

 const getCat = async() => {
  const res = await makeRequest('get', 'utils/cat', null, null, null);
  if(res){
    setCategory(res?.category);
    setIsloading(false);
  }
 }
   
 const getFeatures = async() => {
  const res = await makeRequest('get', 'utils/features', null, null, null);
  if(res){
    setFeatures(res?.features);
    setIsloading(false);
  }
 }

 useEffect(() => {
  if(token){
    getCat();
    getFeatures();
  }
 }, [])


 return ( 
  <UtilsContext.Provider value={{
    getCat,
    setSelectedOptions,
    selectedOptions,
    getFeatures,
    selectedFeatures,
    setSelectedFeatures,
    cat, 
    setCat,
    fea, 
    setFea,
    path
  }}>
   {props.children}
  </UtilsContext.Provider>
 );
}
 
export default UtilsContextProvider;
