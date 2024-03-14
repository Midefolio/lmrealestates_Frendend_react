import { useState } from "react";
import SingleSelect from "../../components/select_location";
import Layout from "./layout";
import PropertyContainer from "./properties_container";
import { GiEmptyMetalBucketHandle } from "react-icons/gi";
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
const {properties, setProperties, setFilterIsOn, filterParams, setFilterParams, fiterIsOn} = useContext(UserContext)
const { makeRequest } = useApi();
const { setToast,  formatNumber } = useUtils()
const  history = useHistory();
const abortController = useRef(new AbortController)

useEffect(() => {
  document.body.style.backgroundColor = '#F7F9FD';
  return () => {
    document.body.style.backgroundColor = '';
  };
}, []); 

const getAllActiveProp = async () => {
  const result = await makeRequest('get', 'users/get_all_prop', null, null, token?.jwt, abortController)
  if(result?.message === 'done'){
    setProperties(result?.properties)
    setFilterIsOn(false)
    setFilterParams(null)
  }
}

useEffect(() => {
    getAllActiveProp();
    return ()=> {abortController.current.abort()}
}, [])

return ( <>

    <Layout active={'post'} />
    <div className="my-col-10 off-1 xs-container xs-down-20 ">
        <div className="my-col-11 off-1 down-5 xs-12 xs-down-5"> 
          <div className="my-mother bd-bottom-bold"><span className="bold">Available Properties</span></div>
          <div className="my-mother down-3 xs-top-5"><SearchComponent setProperties={setProperties} /></div>
          <div>{fiterIsOn && <div  className="my-bottom-10"><span className="pd-10 px10 rad-10 bg-color-code-1 white my-b-shadow" onClick={getAllActiveProp}>cancel filter <i className="fas fa-times"></i></span></div> }</div>
          <div>{filterParams && <div  className="my-bottom-10 px13">Showing results for <span className="color-code-1">{filterParams}</span><span className="pd-10 mg-5 px10 rad-10 bg-color-code-1 white my-b-shadow" onClick={getAllActiveProp}>Cancel <i className="fas fa-times"></i></span></div> }</div>
       </div>

      <div className="my-mother"> {!properties && <div className="my-mother down-3 xs-down-5"><CatSkeleton slideToShow={3} /></div>}</div>
       <div className="my-mother xs-down-2">
       {properties?.map((i, index) => (
        <div className="my-mother xs-down-1 down-2" key={index + 'propsss'}>
            <PropertyContainer getAllActiveProp={getAllActiveProp} i={i} />
        </div>
    ))}
       </div>

       {properties?.length === 0 && <>
        <div className="my-mother down-15 xs-down-20 centered">
          <div className="page-icon"><GiEmptyMetalBucketHandle className="px100 faded" /></div>
          <div className="my-mother down-1"><span className="faded">No Available Property</span></div>
        </div>
      </>}
       

     <div className="xs-down-20vh my-mother" ></div>
    </div>

    
    </> );
}
 
export default AllProperties;