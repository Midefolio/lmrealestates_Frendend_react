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
  const { getLocation } = useApi();
  
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


  </> );
}
export default LocationSelect;
