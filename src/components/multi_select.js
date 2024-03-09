import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { UtilsContext } from '../context/utilsContext';
const MultiSelect = ({data, value, handleSelectChange}) => {
  const animatedComponents = makeAnimated();
  let selected = [];
  // console.log(value)
  value?.map((i) => {
    selected.push({value:i, label:i})
  })


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'red' : 'white',
      borderColor: state.isHovered ? 'green' : 'white', // Set the hover color
      backgroundColor: 'white', // set the background color to gray
      borderColor: 'transparent',
      heught:'40px'
    }),
  };

  return ( <>
    <Select
      isMulti
      name=""
      value={selected}
      onChange={(e) => {handleSelectChange(e)}}
      components={animatedComponents}
      options={data}
      className="basic-multi-select"
      // classNamePrefix="select"
      styles={customStyles}
    />
  </> );
}
export default MultiSelect;
