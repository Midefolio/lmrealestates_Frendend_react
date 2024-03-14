import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const MulSelect = ({data, handleSelectChange}) => {
  const animatedComponents = makeAnimated();
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'red' : 'white',
      borderColor: state.isHovered ? 'green' : 'white', // Set the hover color
      backgroundColor: '#f3f3f3;', // set the background color to gray
      borderColor: 'transparent',
      // height:'40px'
    }),
  };
  
  return ( <>
  <Select
    isMulti
    name="colors"
    onChange={(e) => {handleSelectChange(e)}}
    components={animatedComponents}
    options={data}
    className="basic-multi-select"
    classNamePrefix=""
    styles={customStyles}
  />
  </> );
}
export default MulSelect;
