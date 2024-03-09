import { AiOutlineFilter } from "react-icons/ai";
import SingleSelect from "../../components/select_location";
import FilterProperties from "./filter";
import { useRef, useState } from "react";
import useApi from "../../hooks/useApi";

const SearchComponent = ({setProperties}) => {
  const [filter, setFilter] = useState(false)
  const [isfetching, setIsfetching] = useState(false)
  const { makeRequest } = useApi()
  const abortController = useRef(new AbortController)
  const token = JSON.parse(localStorage.getItem('LR_jwt'));
  const [sortParams, setSortParams] = useState({
      category:Array,
      features:Array,
      price_range:String,
      location:String,
      user_id:String,
  })

  const filterHandler = async() => {
    setIsfetching(true)
    const cb =()=>{setIsfetching(false)}
    const result = await makeRequest('post', `users/filter_prop`, sortParams, cb, token, abortController);
    if(result?.message === 'done') {
    setProperties(result?.properties)
    setIsfetching(false);
    }
  } 
  
  return ( <>
    {filter && <FilterProperties isfetching={isfetching}  filterHandler={ filterHandler } stateToUpdate={ setSortParams } setFilter={ setFilter } />}
     <div className="my-mother">
       <div className="my-col-8 xs-12 off- xs-down-10 ">
        <form className="xs-12" >
          <div className="search-con bg-faded">
           <input type="text"  className='monR bg-faded px13 black' placeholder='Search for Properties'/>
           <span  className="c-pointer bg-faded"><i className="fas fa-search" ></i></span>
         </div>
        </form>
        </div>
             
        <div className="my-col-4 xs-12 ">
          <div className="my-mother down-3 xs-down-5"> <span onClick={() => {setFilter(true)}} className="pd-10 rad-20 bg-color-code-1 white ed my-b-shadow c-pointer"> <i className="fas fa-filter color-coe-1 pd-5"></i> Filter Properties</span></div>
        </div>
     </div>

 
    
    </> );
}
 
export default SearchComponent;