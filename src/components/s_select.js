import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const SinSelect = ({data, handleSelectChange}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'red' : 'white',
      borderColor: state.isHovered ? 'green' : 'white', // Set the hover color
      backgroundColor: '#f3f3f3;', // set the background color to gray
      borderColor: 'transparent',
      height:'40px'
    }),
  };
  return ( <>
  <Select
    name="LGAS"
    // value={data[0]}
    onChange={(e)=> {handleSelectChange(e)}}
    options={data}
    className="basic-multi-select"
    classNamePrefix="select"
    styles={customStyles}
  />
  </> );
}
export default SinSelect;
