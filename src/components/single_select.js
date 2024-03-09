import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { UtilsContext } from '../context/utilsContext';
const SingleSelect = ({setPropData, data, propData}) => {

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'red' : 'white',
      borderColor: state.isHovered ? 'green' : 'white', // Set the hover color
      backgroundColor: 'white', // set the background color to gray
      borderColor: 'transparent',
    }),
  };

return ( <>
  <Select
    name={propData?._id}
    value={{label:propData.location.LGA, value:propData.location.LGA}}
    onChange={(e)=> {setPropData(prev => ({...prev, location:{...prev.location, LGA:e.value}}))}}
    options={data}
    className="basic-multi-select"
    classNamePrefix="select"
    styles={customStyles}
  />
  </> );
}
export default SingleSelect;
