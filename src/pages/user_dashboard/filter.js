import { useContext } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { UserContext } from "../../context/userContext";
import useUtils from "../../utils/useutils";
import MulSelect from "../../components/m_select";
import SinSelect from "../../components/s_select";

const FilterProperties = ({stateToUpdate, setFilter, filterHandler, isfetching}) => {
  const { Category, features } = useContext(UserContext);
  const { LGAS } = useUtils();

  const handleSelectChange = (selectedOption) => {
    let arr = [];
    selectedOption?.map((i) =>{
      arr.push(i.value)
    })
    if(arr.length > 0) {
      stateToUpdate((prev) => ({...prev, category:arr}))
    }else {
      stateToUpdate((prev) => ({...prev, category:null}))
    }
  };


  const updateFeatures = (selectedOption) => {
    let arr = [];
    selectedOption?.map((i) =>{
      arr.push(i.value)
    })

    if(arr.length > 0) {
      stateToUpdate((prev) => ({...prev, features:arr}))
    }else {
      stateToUpdate((prev) => ({...prev, features:null}))
    }
  };


  const updateLocation = (selectedOption) => {
    stateToUpdate((prev) => ({...prev, location:selectedOption?.value}))
  };


  const updatePrice = (selectedOption) => {
    stateToUpdate((prev) => ({...prev, price_range:selectedOption?.value}))
  };



  return ( <>
    <div className="my-modal" onClick={()=>{setFilter(false)}}>
      <div className="my-col-3 xs-12 filter-opt-con" onClick={(e) => {e.stopPropagation()}}>
        <div className="my-col-10 xs-down-10  xs-container off-1 down-10">
          <div className="bd-bottom px13 xs-px15 bold monR"> <i className="fas fa-filter pd-5"></i> Filter Properties </div>
          <div className="my-mother xs-down-5  down-1">
            <div className="my-mother down-10">
              <div><span className="px13 bold">Category</span></div>
              <div className="my-mother down-1"><MulSelect handleSelectChange={handleSelectChange} data={Category}/></div>
            </div>
            <div className="my-mother down-5 xs-down-3">
              <div><span className="px13 bold">Features</span></div>
              <div className="my-mother down-1"><MulSelect handleSelectChange={updateFeatures} data={features}/></div>
            </div>
            <div className="my-mother down-5 xs-down-3">
              <div><span className="px13 bold">Location (Lga's)</span></div>
              <div className="my-mother down-1"><SinSelect handleSelectChange={updateLocation} data={LGAS}/></div>
            </div>
            <div className="my-mother down-5 xs-down-3">
              <div><span className="px13 bold">Price Range</span></div>
              <div className="my-mother down-1"><input type="number" onChange={(e) => {stateToUpdate(prev => ({...prev, price_range:e.target.value}))}} className="input bg-" /></div>
            </div>
            <div className="my-mother down-10 xs-down-5">
              {isfetching ? <span className="my-btn-sm  xs-12 xs-centered bg-color-code-1 px13 white"> <AiOutlineLoading className="fa fa-spin" /></span>: <span onClick={filterHandler} className="my-btn-sm xs-12 xs-centered bg-color-code-1 px13 white">Search <i className="fas fa-arrow-right"></i></span>}
              </div>
          </div>
        </div>
      </div>
    </div>
  </> );
}
 
export default FilterProperties;