import { useRef, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useUtils from "../utils/useutils";
import useApi from "../hooks/useApi";
import { GiEmptyMetalBucketHandle } from "react-icons/gi";
import CatSkeleton from "../components/skeleton/catSeleton";
import SearchComponent from "./user_dashboard/search_and_filter";
import NavBar from "../components/navbar";
import PropContainer from "../components/prop_con";
import { UtilsContext } from "../context/utilsContext";
import { UserContext } from "../context/userContext";

const Properties = () => {
  const { makeRequest } = useApi();
  const { setToast,  formatNumber } = useUtils()
  const  history = useHistory();
  const abortController = useRef(new AbortController)
  const [properties, setProperties] = useState(null);
  const { getCat, getFeatures} = useContext(UtilsContext)
  const {setFilterIsOn, setFilterParams, filterParams, fiterIsOn} = useContext(UserContext)
 
  useEffect(() => {
    document.body.style.backgroundColor = '#F7F9FD';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []); 

const getAllActiveProp = async () => {
   setProperties(null)
  const result = await makeRequest('get', 'noAuth/get_all_prop', null, null, null, abortController)
  if(result?.message === 'done'){
    setProperties(result?.properties)
    setFilterIsOn(false)
    setFilterParams(null);
  }
}

useEffect(() => {
    getAllActiveProp();
    getFeatures()
    getCat()
    return ()=> {abortController.current.abort()}
}, [])

return ( <>
  <div className="my-mother">
    <NavBar  bg={'bg-white'} color={'black'}/>
    <div className="my-col-10 off-1 xs-container xs-down-20 ">
        <div className="my-col-11 off-1 down-5 xs-12 xs-down-5"> 
          <div className="my-mother bd-bottom-bold"><span className="bold">Available Properties</span></div>
          <div className="my-mother down-3 xs-top-5"><SearchComponent setProperties={setProperties}/></div>
       </div>
       <div>{fiterIsOn && <div  className="my-bottom-10"><span className="pd-10 px10 rad-10 bg-color-code-1 white my-b-shadow" onClick={getAllActiveProp}>cancel filter <i className="fas fa-times"></i></span></div> }</div>
       <div>{filterParams && <div  className="my-bottom-10 px13">Showing results for <span className="color-code-1">{filterParams}</span><span className="pd-10 mg-5 px10 rad-10 bg-color-code-1 white my-b-shadow" onClick={getAllActiveProp}>Cancel <i className="fas fa-times"></i></span></div> }</div>
    
    
      <div className="my-mother"> {!properties && <div className="my-mother down-3 xs-down-5"><CatSkeleton slideToShow={3} /></div>}</div>
       <div className="my-mother xs-down-2">
       {properties?.map((i, index) => (
        <div className="my-mother xs-down-1 down-2" key={index + 'propsss'}>
            <PropContainer getAllActiveProp={getAllActiveProp} i={i} />
        </div>
    ))}

       </div>
     <div className="xs-down-20vh my-mother" ></div>
    </div>
    {properties?.length === 0 && <>
        <div className="my-mother down-15 centered">
          <div className="page-icon"><GiEmptyMetalBucketHandle className="px100 faded" /></div>
          <div className="my-mother down-1"><span className="faded">No Available property</span></div>
        </div>
      </>}
       
  </div>
    
    </> );
}
 
export default Properties;