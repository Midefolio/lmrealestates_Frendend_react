import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { UtilsContext } from '../context/utilsContext';
import useApi from '../hooks/useApi';
import { Country, State, City }  from 'country-state-city';
import Tippy from '@tippyjs/react';

const LocationSelect = ({setPropData, data, propData}) => {
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


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'red' : 'white',
      borderColor: state.isHovered ? 'green' : 'white', // Set the hover color
      backgroundColor: '#fff', // set the background color to gray
      borderColor: 'transparent',
    }),
  };

return ( <>
    <div className='my-mother'>
    <Select
    name={'yuyu'}
    value={{label:propData.location.state}}
    // onChange={(e)=> {setIsoCode(e.value)}}
    onChange={(e)=> {setPropData(prev => ({...prev, location:{...prev.location, state:e.label}})); setIsoCode(e.value)}}
    options={states}
    className="basic-multi-select"
    classNamePrefix="select"
    styles={customStyles}
  />
 </div>


{propData.location.state !== "" && 
     <div className='my-mother xs-down-3 down-2'>
      <div><span className=" px1 xs-px13 faded">City <span className="red">*</span></span></div>
     <Select
     name={'yuyu'}
     value={{label:propData.location.city}}
     onChange={(e)=> {setPropData(prev => ({...prev, location:{...prev.location, city:e.label}}))}}
     options={cities}
     className="basic-multi-select"
     classNamePrefix="select"
     styles={customStyles}
   />
  </div>
}


{propData.location.city !== "" && 
     <div className='my-mother xs-down-3 down-2'>
      <div><span className=" px1 xs-px13 faded">Name of Area Or Street in {propData.location.city}<span className="red">*</span></span></div>  
      <Tippy content={<div className="px13 my-mother bg-white my-b-shadow pd-10"><div className="my-mother px13">Name of area or Street</div> 
          <div className="my-mother down-1 ">e.g Tanke - Ajanaku"</div></div>}>
          <input 
        type="text" 
        className="px13 input-1 bg-white"
        value={propData?.location.area} onChange={(e)=> {setPropData(prev => ({...prev, location:{...prev.location, area:e.target.value}}))}}
      />
    </Tippy>
  </div>
}


  </> );
}
export default LocationSelect;
