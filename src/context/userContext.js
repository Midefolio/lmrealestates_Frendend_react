import {createContext, useEffect, useLayoutEffect, useState} from 'react';
import useApi from '../hooks/useApi';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const UserContext = createContext();

const UserContextProvider = (props) => {
 const [currentUser, setCurrentUsers] = useState(null);
 const [Category, setCategory] = useState([]);
 const [features, setFeatures] = useState([]);
 const [properties, setProperties] = useState(null);

   
 return ( 
  <UserContext.Provider value={{
    setCurrentUsers,
    currentUser,
    features, 
    setFeatures,
    Category, 
    setCategory,
    properties,
    setProperties

  }}>

   {props.children}
  </UserContext.Provider>
 );
}
 
export default UserContextProvider;
