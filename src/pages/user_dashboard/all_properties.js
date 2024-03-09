import { useState } from "react";
import SingleSelect from "../../components/select_location";
import Layout from "./layout";
import PropertyContainer from "./properties_container";
import SearchComponent from "./search_and_filter";
import useApi from "../../hooks/useApi";
import useUtils from "../../utils/useutils";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useRef } from "react";
import { useEffect } from "react";
import CatSkeleton from "../../components/skeleton/catSeleton";

const AllProperties = () => {
const token = JSON.parse(localStorage.getItem('LR_jwt'));
const {properties, setProperties} = useContext(UserContext)
const { makeRequest } = useApi();
const { setToast,  formatNumber } = useUtils()
const  history = useHistory();
const abortController = useRef(new AbortController)


const getAllActiveProp = async () => {
  const result = await makeRequest('get', 'users/get_all_prop', null, null, token?.jwt, abortController)
  if(result?.message === 'done'){
    setProperties(result?.properties)
  }
}

useEffect(() => {
    getAllActiveProp();
    return ()=> {abortController.current.abort()}
}, [])

return ( <>

    <Layout active={'Allproperties'} />
    <div className="my-col-10 off-1 xs-container xs-down-20 ">
        <div className="my-col-11 off-1 down-5 xs-12 xs-down-5"> 
          <div className="my-mother bd-bottom-bold"><h1 className="bold">Properties</h1></div>
          <div className="my-mother down-3 xs-top-5"><SearchComponent/></div>
           <div className="my-mother down-5 xs-down-8 bold bd-bottom-bold"><h1 className="bold">Popular Properties</h1></div>
       </div>

      <div className="my-mother"> {!properties && <div className="my-mother down-3 xs-down-5"><CatSkeleton slideToShow={3} /></div>}</div>
     {properties?.map((i, index) => (
        <div className="my-mother xs-down-2 down-2" key={index + 'propsss'}>
            <PropertyContainer getAllActiveProp={getAllActiveProp} i={i} />
        </div>
    ))}

     <div className="xs-down-20vh my-mother" ></div>
    </div>

    
    </> );
}
 
export default AllProperties;