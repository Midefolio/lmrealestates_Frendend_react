import { useEffect, useRef, useContext, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import MultiSelect from "../../components/multi_select";
import Layout from "./layout";
import { UtilsContext } from "../../context/utilsContext";
import useUtils from "../../utils/useutils";
import Tippy from '@tippyjs/react';
import { AuthContext } from "../../context/authcontex";
import useApi from "../../hooks/useApi";
// import SingleSelect from "../../components/single_select";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AiOutlineLoading } from "react-icons/ai";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const ViewProperties = ({setViewPpt, i, getProperties}) => {
 const {currentUser, token} = useContext(AuthContext)
 const {Category, features, path} = useContext(UtilsContext);
 const {makeRequest, requestMaker} = useApi();
 const {clickHandler, setToast, LGAS} = useUtils();
 const [section, setSection] = useState('basic');
 const [imagesArr, setImagesArr] = useState([]);
 const [images, setImages] = useState({});
 const history = useHistory();
 const [isSubmitting, setIsSubmitting] = useState(false);
 const editorRef = useRef(null);
 const abortController = useRef(new AbortController)

 const [propData, setPropData] = useState({
  user_id:currentUser?._id,
  name:"",
  title:"",
  category:[],
  location:{
    LGA:"",
    detailed_address:""
  },
  description:i?.description,
  features:[],
  youtube_link:"",
  images:[],
  price:{
    first_year:"",
    subsequent:"",
    isNegotiable:false
  },
  rank:1,
  isvailable:true,
  status:"pending",  //pending, active, declined
  contact_details:{
    in_charge:"",
    name:"",
    whatsapp:""
  }
})

const handleImageChange = async(event) => {
  const file = event.target.files[0];
  let url;
  if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') && file.size < 4 * 1024 * 1024) {
   const reader = new FileReader();
   reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataURL = canvas.toDataURL(file.type);
        url = dataURL;
        const image = {preview:url, id:'file'+ (parseInt(imagesArr?.length) + 1)}
        if(imagesArr?.length <= 3){
          setImagesArr(prev => [...prev, image])
          setImages(prev => ({...prev, [`file${Object.keys(prev).length + 1}`]: file}));
        }else{
          setToast("you can only add 4 pictures")
        }
      };
    };    
    } else {
     setToast('Please select a JPG, JPEG, or PNG image and must be less than 4mb in size');
    };
 }

const removePic = (id) => {
  let updatedImages = [];
  const newArr = imagesArr?.filter((i) => i.id !== id);
  let newObj = Object.keys(images).reduce((acc, key) => {
    if (key !== `${id}`) {
      acc[key] = images[key];
    }
    return acc;
  }, {});
 newArr?.map((i, index) => {
  updatedImages.push(i.image)
 })
  setPropData(prev => ({...prev, images:updatedImages}))
  setImages(newObj)
  setImagesArr(newArr);
}


const sectionhadler = async () => {
  if(section === 'basic') {
    if(propData.name === '' || 
      propData.category.length === 0 ||
      propData.title === '' ||
      propData.location.LGA === '' ||
      propData.location.detailed_address === ''
    ) {
       setToast('Please fill all required filled in this section')
    }else{
      setSection('pictures');
    }
  }
  else if(section === 'pictures') {
    if(propData?.description === '' || 
      propData?.features?.length === 0 ||
      imagesArr?.length === 0
    ) {
       setToast('Please fill all required filled in this section')
    }else{
      setSection('price');
    }
    if(images?.length === 0){
      setToast('Please upload at least one image');
      return
    }
  }
   else if(section === 'price'){
    if(propData.price.first_year === '' || 
      propData.price.subsequent === ''
    ) {
       setToast('Please fill all required filled in this section')
    }else{
      setSection('owner_info');
    }
  }
  else if(section === 'owner_info'){
    if(propData.contact_details.in_charge === '' || 
      propData.contact_details.whatsapp === '' ||
      propData.contact_details.name === '' 
    ) {
       setToast('Please fill all required filled in this section')
    }else{
      await submit(true);
    }
  }
 }

 useEffect(() => {
  setPropData(i);
 }, [i])

 useEffect(() => {
   let arr = propData?.images;
   let images = [];
   arr?.map((url, index) => {
    images.push({preview:path + url, image:url, id:'file' + (parseInt(index) + 1)})
   })
   setImagesArr(images)   
 }, [propData?.images])


 const handleSelectChangecat = (selectedOption) => {
  let arr = [];
  selectedOption?.map((i) =>{
    arr.push(i.value)
  })
  setPropData((prev) => ({...prev, category:arr}))
};

const handleSelectChangeFea = (selectedOption) => {
  let arr = [];
  selectedOption?.map((i) =>{
    arr.push(i.value)
  })
  if(arr.length > 0) {
    setPropData((prev) => ({...prev, features:arr}))
  }else {
    setPropData((prev) => ({...prev, features:[]}))
  }
};

const submit = async (uploadImages) => {
    setIsSubmitting(true)
    if(Object.keys(images).length  < 1 ){
      const cb = () => {setIsSubmitting(false)}  // callback function incase request finishes or there was an error;
      const result = await makeRequest('patch', 'properties/update', propData, cb, token?.jwt, abortController);
      if(result?.message === 'done'){
        setIsSubmitting(false); 
        setToast('Property Updated Successfully')
        await getProperties()
        setViewPpt(null)
      }
      return;
    }

    // if images exists to be saved to database;

    let url = 'https://rich-cards.000webhostapp.com/save_image.php';
    const res =  await requestMaker(url, images, abortController);
    if(res?.imageUrls){
      propData['images'] = [...propData?.images, ...res?.imageUrls];
      const cb = () => {setIsSubmitting(false)}  // callback function incase request finishes or there was an error;
      const result = await makeRequest('patch', 'properties/update', propData, cb, token?.jwt, abortController);
      if(result?.message === 'done'){
        setIsSubmitting(false); 
        setToast('Property updated Successfully')
         await getProperties()
        setViewPpt(null)
      }
    }else{
      setToast('Error Uploading Images');
      setIsSubmitting(false); 
      return
    }
}

const customStyles = {
  backgroundColor: '#fff', // set the background color to gray
  borderColor: 'transperent'
};



return ( <>
   <div className="my-col-10 my-fixed-container  xs-12 xs-down-5 off-2 my-bottom-50">
    <div className="my-col-10 xs-container xs-down-20 down-3">
      <div><h1 className=" bold"> <span className="pd-10 c-pointer bold" onClick={()=> {setViewPpt(null); abortController.current.abort()}}><i className="fas fa-arrow-left"></i></span>  Property settings</h1></div>
       {section === 'basic' && <><div className="my-col-10 xs-12 xs-down-5 xs-px13  down-4 bd-bottom-bold"><span className="">1. Basic property details</span></div>
      <div className="my-mother xs-down-5 down-3">
        <div><span className=" px1 xs-px13">Property Name <span className="red">*</span></span></div>
        <div className="my-col-10">
          <Tippy content={<div className="px13 my-mother bg-white my-b-shadow pd-10"><div className="my-mother px13">Name should be very simple</div> <div className="my-mother down-1 ">e.g "L-mobile Homes - Tanke, Okeodo"</div></div>}>
            <input value={propData?.name} onChange={(e)=> {setPropData(prev => ({...prev, name:e.target.value}))}} type="text" className="px13 input-1" />
          </Tippy>
        </div>
      </div>
      <div className="my-mother down-3 xs-down-2">
        <div><span className=" xs-px13">Title <span className="red">*</span></span></div>
        <div className="my-col-10">
          <Tippy content={<div className="px13 my-mother bg-white my-b-shadow pd-10"><div className="my-mother px13">Title should be very simple and brief</div> <div className="my-mother down-1 ">e.g "3 bedroom flat - Tanke, Okeodo"</div></div>}>
            <input value={propData?.title} onChange={(e)=> {setPropData(prev => ({...prev, title:e.target.value}))}} type="text" className="px13 input-1" />
          </Tippy>
        </div>
      </div>
      <div className="my-mother xs-down-2 down-3">
        <div><span className=" xs-px13">Select Categories <span className="red">*</span></span></div>
        <div className="my-col-10"><MultiSelect value={propData?.category} handleSelectChange={handleSelectChangecat} className="px13" data={Category} /></div>
      </div>
      <div className="my-mother xs-down-3  down-3">
        <div><span className=" px1 xs-px13">Select LGA <span className="red">*</span></span></div>
        <div className="my-col-10">
          {/* <SingleSelect data={LGAS} propData={propData} setPropData={setPropData} /> */}
        </div>
      </div>
      <div className="my-mother xs-down-3 down-3">
        <div><span className=" px1 xs-px13">Detailed Address <span className="red">*</span></span></div>
        <div className="my-col-10">
          <Tippy content={<div className="px13 my-mother bg-white my-b-shadow pd-10"><div className="my-mother px13">Where is this property located</div> 
          <div className="my-mother down-1 ">e.g "4 ajanaku north, tanke, Ilorin, Kwara State."</div></div>}>
            <input 
            type="text" 
            className="px13 input-1"
            value={propData?.location.detailed_address} onChange={(e)=> {setPropData(prev => ({...prev, location:{...prev.location, detailed_address:e.target.value}}))}}
            />
          </Tippy>  
        </div>
      </div>
      <div className="my-mother down-2 xs-centered xs-down-8"><span className="prev-btn bg-white faded my-b-shado px13 monR" onClick={sectionhadler}> <i className="fas fa-angle-right"></i> </span></div>
      <div className="xs-down-20vh xs-12"></div>
    </>}  
    
   
    {section === 'pictures' && <><div className="my-col-10 down-4 xs-down-5 bd-bottom-bold"><span className="xs-px13 ">2. Describe your property</span></div>
      <div className="my-mother down-1 xs-down-3">
        <div className="my-col-12">
          <div className='xs-12 xs-down-3 my-col-10 down-2'><span className=" px1 xs-px13">Description <span className="red">*</span></span></div>  
          <div className='my-col-10 xs-12'>
          <ReactQuill 
             theme="snow" 
             style={customStyles}
             value={propData?.description} 
             onChange={(e)=> {setPropData(prev => ({...prev, description:e}))}}
             placeholder="Write something..."
           />
          </div> 
        <div className="my-mother down-2 xs-down-3">
          <div><span className=" px1 xs-px13">Select features<span className="red">*</span></span></div>
          <div className="my-col-10"><MultiSelect value={propData?.features} handleSelectChange={handleSelectChangeFea} className="px13" data={features} /></div>
        </div>
        <div className="my-mother down-2 xs-down-3">
          <div><span className=" px1 xs-px13">Youtube Link <span className="red"></span></span></div>
          <div className="my-col-10"><input value={propData?.youtube_link} onChange={(e)=> {setPropData(prev => ({...prev, youtube_link:e.target.value}))}} type="text" className="px13 input-1" /></div>
        </div>   
        </div>
      </div>
      <div className="my-mother down-2 xs-down-5">
        <div><span className=" px1 xs-px13">Pictures <span className="red">*</span></span></div>
        <div className="my-col-10 xs-12 xs-down-1 down-1">
          {imagesArr?.map((i, index)=>(
            <span className="add-pic xs-down-1" key={index}>
              <div className="scarf"><i className="fas c-pointe fa-trash-alt pd-10 white" onClick={()=>{removePic(i.id)}}></i></div>
              <img src={i.preview} />
          </span>  
          ))}
          <input type="file" onChange={(e)=>{handleImageChange(e)}} hidden id="select-image-input"/>
          {imagesArr?.length < 4 && <span className="add-pic xs-down-1" onClick={()=>{clickHandler('select-image-input')}}><i className="fas fa-plus"></i></span>}
        </div>
      </div>
      <div className="my-mother xs-centered down-2 xs-down-10">
        <span className="prev-btn bg-white faded my-b-shado px13 monR" onClick={()=>{setSection('basic')}}> <i className="fas fa-angle-left"></i> </span>
        <span className="prev-btn bg-white faded my-b-shado xs-off-1 mg-10 px13 monR" onClick={sectionhadler}> <i className="fas fa-angle-right"></i> </span>
      </div>
      <div className="xs-down-20vh xs-12"></div>
  
    </>}


    {section === 'price' && <><div className="my-col-10 down-4 bd-bottom-bold xs-12 xs-down-3"><span className="xs-px13 ">3. Set Price</span></div>
      <div className="my-mother down-3 xs-down-8">
        <div><span className=" px1 xs-px13">Payment on first year <span className="red">*</span></span></div>
        <div className="my-col-10 xs-down-1 xs-12">
          <input 
           type="number"  
           className="px13 input-1" 
           value={propData?.price.first_year} onChange={(e)=> {setPropData(prev => ({...prev, price:{...prev.price, first_year:e.target.value}}))}}
          />
        </div>
      </div>

      <div className="my-mother down-3 xs-down-5">
        <div><span className=" px1 xs-px13">Subsequent Payment <span className="red">*</span></span></div>
        <div className="my-col-10 xs-12 xs-down-1">
        <input 
           type="number"  
           className="px13 input-1" 
           value={propData?.price.subsequent} onChange={(e)=> {setPropData(prev => ({...prev, price:{...prev.price, subsequent:e.target.value}}))}}
          />
        </div>
      </div>
      <div className="my-mother down-4 xs-down-10 xs-centered ">
        <span className="prev-btn bg-white faded my-b-shado px13 monR" onClick={()=>{setSection('pictures')}}> <i className="fas fa-angle-left"></i> </span>
        <span className="prev-btn bg-white faded xs-off-1 white mg-10 px13 monR" onClick={sectionhadler}> <i className="fas fa-angle-right"></i> </span>
      </div>
    </>}


    {section === 'owner_info' && <><div className="my-col-10 down-4 bd-bottom-bold xs-down-5"><span className=" xs-px13">3. Contact details</span></div>
      <div className="my-mother down-3 xs-down-5">
        <div><span className=" px1 xs-px13">Who's In-charge <span className="red">*</span></span></div>
        <div className="my-col-10 xs-12 xs-down-1">
          <select type="text" className="px13 input-1"  value={propData?.contact_details.in_charge} onChange={(e)=> {setPropData(prev => ({...prev, contact_details:{...prev.contact_details, in_charge:e.target.value}}))}}>
            <option value="">Select...</option>
            <option value="Agent">Agent</option>
            <option value="Owner">Owner</option>
          </select>
        </div>
      </div>

      <div className="my-mother down-3 xs-down-5">
        <div><span className=" px1 xs-px13">Owner/Agent's Name <span className="red">*</span></span></div>
        <div className="my-col-10 xs-12 xs-down-1">
        <input 
           type="text"  
           className="px13 input-1" 
           value={propData?.contact_details.name} onChange={(e)=> {setPropData(prev => ({...prev, contact_details:{...prev.contact_details, name:e.target.value}}))}}
          />
        </div>
      </div>

      <div className="my-mother down-3 xs-down-5">
        <div><span className=" px1 xs-px13">Owner/Agent's Whatsapp Number <span className="red">*</span></span></div>
        <div className="my-col-10 xs-12 xs-down-1">
        <input 
           type="tel" 
           placeholder="e.g 070********" 
           className="px13 input-1" 
           value={propData?.contact_details.whatsapp} onChange={(e)=> {setPropData(prev => ({...prev, contact_details:{...prev.contact_details, whatsapp:e.target.value}}))}}
          />
        </div>
      </div>
    
    {!isSubmitting?
      <div className="my-mother down-4 xs-centered  xs-down-10">
         <span className="prev-btn bg-white faded my-b-shado px13 monR" onClick={()=>{setSection('price')}}> <i className="fas fa-angle-left"></i> </span>
        <span className="my-btn-sm xs-10 xs-off-1 xs-centered xs-down-8  bg-color-code-1 white px13 monR" onClick={sectionhadler}>Submit </span>
    </div>
    :  <div className="my-mother down-4 xs-down-12">
      <span className="my-btn-sm xs-10 xs-off-1 xs-centered xs-down-12  bg-color-code-1 white px13 monR"> <AiOutlineLoading className="fas fa-spin"/> </span>
    </div> }
    </>}
    </div>
  </div> 
  </> );
}
 
export default ViewProperties;