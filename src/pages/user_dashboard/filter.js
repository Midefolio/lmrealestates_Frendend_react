import { useContext, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { UserContext } from "../../context/userContext";
import useUtils from "../../utils/useutils";
import MulSelect from "../../components/m_select";
import SinSelect from "../../components/s_select";
import { Country, State, City }  from 'country-state-city';
import useApi from "../../hooks/useApi";

const FilterProperties = ({stateToUpdate, abortController, setFilter, filterHandler, isfetching}) => {
  const { Category, features, fiterIsOn, setFilterIsOn, filterParams } = useContext(UserContext);
  const { LGAS } = useUtils();
  const [isoCode, setIsoCode] = useState(null)
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  
  const getStates = async () => {
    let stateArr = [];
    const states =  State.getStatesOfCountry('NG');
    states.map((i) => {
      stateArr.push({label:i.name, value:i.isoCode})
    })
    setStates(stateArr);
  }

  const getCities = async () => {
    let cityArr = []
    const cities =  City.getCitiesOfState('NG', `${isoCode}`)
    cities.map((i) => {
      cityArr.push({label:i.name, value:i.name})
    })
    setCities(cityArr)
    console.log(cities)
  }
  
  useEffect(()=> {
    getStates();
  }, [])

  useEffect(()=> {
    getCities();
  }, [isoCode])


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


  const updateState = (selectedOption) => {
    stateToUpdate((prev) => ({...prev, state:selectedOption?.label}));
    setIsoCode(selectedOption.value)
  };

  const updateCity = (selectedOption) => {
    stateToUpdate((prev) => ({...prev, city:selectedOption?.label}));
  };


  const updatePrice = (selectedOption) => {
    stateToUpdate((prev) => ({...prev, price_range:selectedOption?.value}))
  };



  useEffect(()=> {
    return()=> {abortController.current.abort()}
  }, [])


  return ( <>
    <div className="my-modal" onClick={()=>{setFilter(false)}}>
      <div className="my-col-3 xs-12 filter-opt-con" onClick={(e) => {e.stopPropagation()}}>
        <div className="my-col-10 xs-down-10  xs-container off-1 down-10">
          <div className="bd-bottom px13 xs-px15 bold monR"> <i className="fas fa-filter pd-5"></i> Filter Properties </div>
          <div className="my-mother xs-down-5  down-1">
            <div className="my-mother down-10">
              <div><span className="px13 bold">Category</span></div>
              <div className="my-mother down-1"><MulSelect value={filterParams?.category} handleSelectChange={handleSelectChange} data={Category}/></div>
            </div>
            <div className="my-mother down-5 xs-down-3">
              <div><span className="px13 bold">Features</span></div>
              <div className="my-mother down-1"><MulSelect value={filterParams?.features} handleSelectChange={updateFeatures} data={features}/></div>
            </div>
            <div className="my-mother down-5 xs-down-3">
              <div><span className="px13 bold">State</span></div>
              <div className="my-mother down-1"><SinSelect value={filterParams?.state} handleSelectChange={updateState} data={states}/></div>
            </div>
           {cities?.length > 0 &&  <div className="my-mother down-5 xs-down-3">
              <div><span className="px13 bold">City</span></div>
              <div className="my-mother down-1"><SinSelect value={filterParams?.city} handleSelectChange={updateCity} data={cities}/></div>
            </div>}
            <div className="my-mother down-5 xs-down-3">
              <div><span className="px13 bold">Price Range</span></div>
              <div className="my-mother down-1"><input type="number" onChange={(e) => {stateToUpdate(prev => ({...prev, price_range:e.target.value}))}} className="input bg-" /></div>
            </div>
            <div className="my-mother down-10 xs-down-5">
              {isfetching ? <span className="my-btn-sm  xs-12 xs-centered bg-color-code-1 px13 white"> <AiOutlineLoading className="fa fa-spin" /></span>: <span onClick={filterHandler} className="my-btn-sm xs-12 xs-centered bg-color-code-1 px13 white">Search <i className="fas fa-arrow-right"></i></span>}
              </div>
               <div className="my-mother my-bottom-50 xs-down-10"></div>
          </div>
        </div>
      </div>
    </div>
  </> );
}
 
export default FilterProperties;