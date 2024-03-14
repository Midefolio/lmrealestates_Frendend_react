import { AiOutlineFilter } from "react-icons/ai";
import SingleSelect from "../../components/select_location";
import FilterProperties from "./filter";
import { useContext, useEffect, useRef, useState } from "react";
import useApi from "../../hooks/useApi";
import { UserContext } from "../../context/userContext";

const SearchComponent = ({setProperties}) => {
  const token = JSON.parse(localStorage.getItem('LR_jwt'));
  const {filterParams,fiterIsOn, setFilterIsOn, setFilterParams} = useContext(UserContext)
  const [filter, setFilter] = useState(false)
  const [isfetching, setIsfetching] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const abortController = useRef(new AbortController)
  const [keyword, setKeyword] = useState("");
  const { makeRequest } = useApi()
  const [sortParams, setSortParams] = useState({
      category:Array,
      features:Array,
      price_range:String,
      state:String,
      city:String,
      user_id:String,
  })

  const filterHandler = async() => {
    setIsfetching(true)
    const cb =()=>{setIsfetching(false)}
    const result = await makeRequest('post', `noAuth/filter_prop`, sortParams, cb, null, abortController);
    if(result?.message === 'done') {
    setProperties(result?.properties)
    setFilterIsOn(true)
    setIsfetching(false);
    setFilter(false);
    }
  } 

  const searchHandler = async(e) => {
    e.preventDefault();
    setIsSearching(true)
    const cb =()=>{setIsSearching(false)}
    const result = await makeRequest('post', `noAuth/search_prop`, {keyword}, cb, null, abortController);
    if(result?.message === 'done') {
    setProperties(result?.properties)
    setIsSearching(false);
    setFilterParams(keyword);
    }
  } 


  return ( <>
    {filter && <FilterProperties isfetching={isfetching} sortParams={sortParams} abortController={abortController}  filterHandler={ filterHandler } stateToUpdate={ setSortParams } setFilter={ setFilter } />}
     <div className="my-mother">
       <div className="my-col-8 xs-12 off- xs-down-10 ">
        {/* <form className="xs-12"> */}
          <div className="search-con bg-faded">
           <input type="text" onChange={(e)=> {setKeyword(e.target.value)}}  className='monR bg-faded px13 black' placeholder='Search for Properties'/>
           {isSearching? <span  className="c-pointer bg-faded" ><i className="fas fa-spin fas fa-refresh" ></i></span> : <span  className="c-pointer bg-faded" onClick={searchHandler}><i className="fas fa-search" ></i></span>}
         </div>
        {/* </form> */}
        </div>
             
        <div className="my-col-4 xs-12 ">
          <div className="my-mother down-3 xs-down-5">
            {fiterIsOn?  <span onClick={() => {setFilter(true)}} className="fl-right  pd-10 rad-20 color-code-1 px12 xs-top-25  ed my-b-shado c-pointer"> <i className="fas fa-filter color-coe-1 pd-5"></i></span> :  <span onClick={() => {setFilter(true)}} className="fl-right  pd-10 rad-20 bg-whie px12 xs-top-25  ed my-b-shado c-pointer"> <i className="fas fa-filter color-coe-1 pd-5"></i></span>}
            
          </div>
        </div>
     </div>

 
    
    </> );
}
 
export default SearchComponent;