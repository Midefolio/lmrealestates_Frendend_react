import Slider from "react-slick";
import { TfiLocationPin } from "react-icons/tfi";
import {AiFillLike, AiOutlineHeart, AiOutlineShareAlt, AiOutlineTags } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import HtmlParser from "react-html-parser";
import YoutubeEmbed from "./user_dashboard/youtube_video";
import useApi from "../hooks/useApi";
import useUtils from "../utils/useutils";

const SeePropertyDetails = () => {
const { id } = useParams();
const [i, setDetails] = useState(null)
const path = 'https://rich-cards.000webhostapp.com/images/' 
const [Pending, setPending] = useState(null)
const { isSending, setToast, formatNumber } = useUtils();
const abortController = useRef(new AbortController)
const [description, setDescription] = useState(false)
const [features, setFeatures] = useState(false)
const [video, setVideo] = useState(false)
const {makeRequest} = useApi();
const history = useHistory();
 const settings = {
  dots: true,
  arrows:true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 6000,
  slidesToShow: 1,
  slidesToScroll: 1
};

const getDetails = async () => {
  isSending(true);
//   const cb =()=> {isSending(false)}
  const result = await makeRequest('post', 'noAuth/get_single_prop', { id }, null, null, abortController )
  if(result?.message === 'done') {
    setDetails(result?.properties)
    isSending(false)
  }
}

useEffect(() => {
  getDetails()
  return ()=> {abortController.current.abort()}
}, [])


const slidesHandler =(index)=> {
  if(index === 'description') {
    setDescription(true)
    setFeatures(false) 
    setVideo(false) 
    return
  }
  if(index === 'features') {
    setDescription(false)
    setFeatures(true) 
    setVideo(false) 
    return
  }
  if(index === 'video') {
    setDescription(false)
    setFeatures(false) 
    setVideo(true) 
    return
  }
}

return ( <>
 <div className="my-mother" >
    <div className="ppt-nav">
        <div className="xs-6"><span className="pd-5" onClick={()=> {history.push('/')}}><i className="fas fa-angle-left alice"></i></span></div>
         <div className="xs-6 right">
            <span className="px20 pd-10 rad-10 xs-px13 white"  onClick={()=> {history.push('/login')}}>{i?.likes?.length} <AiOutlineHeart/></span>
            <span className="pd-10 mg-10"><AiOutlineShareAlt className="px20 white" /></span>
        </div>
      </div>
      <div className="ppt-image-scarf xs-12"> </div>
    <Slider {...settings}>
       {i?.images?.map((i, index) => (
         <div className="ppt-image-carosel" key={index}><img src={path + i} alt="" /></div>
       ))}
    </Slider>
     <div className="my-mother xs-down-3">
        <div className="my-container ">
            <div><span className="px13 faded">{i?.name} | <span className="green">{i?.isvailable}</span></span></div>
             <div className="my-mother xs-down-1"><span className="bold px20 ">{i?.title}</span></div>
            <div className="my-mother"><span className="color-code-1 px20 bold">₦{formatNumber(i?.price?.first_year)} per  year  <span className="px13 black">( {formatNumber(i?.price?.subsequent)} renewal )</span></span></div>
             <div className="my-mother faded xs-down-3 px15 quest">
             <i className="fas fa-map-marker-alt clor-code-1"></i>
             <span className="mg-5">{i?.location?.detailed_address}</span>
             </div>
             <div className="categories my-mother xs-down-3">
              {i?.category.map((i, index) => (
                <span className="px9 mg-5 upper-case bg-color-code-2 color-code-1 pd-5 rad-10">{i}</span>
              ))}
             </div>


             <div className="my-mother xs-down-3">
              {/* <div><span className="bold black px18">Property Details</span></div> */}
              <div className="my-mother pd-10 xs-down-3 rad-10 bg-faded">
                {description ? <>
                  <div onClick={()=> {setDescription(false)}}><span className="" >Description</span> <span className="fl-right"><i className="fas fa-angle-down faded"></i></span></div>
                 <div  onClick={()=> {setDescription(false)}} className="my-mother my-fade-in xs-down-4" id='slide'><span className="px13 faded">{HtmlParser(i?.description)}</span></div>
                </> :<div  onClick={()=> {slidesHandler('description')}} ><span className="faded">Description</span> <span className="fl-right"><i className="fas fa-angle-right faded"></i></span></div>}
              </div>

              <div className="my-mother pd-10 xs-down-2 rad-10 bg-faded">
              {features ? <>
                  <div onClick={()=> {setFeatures(false)}} ><span className="" >Features</span> <span className="fl-right"><i className="fas fa-angle-down faded"></i></span></div>
                 <div  onClick={()=> {setFeatures(false)}} className="my-mother xs-down-4 my-fade-in" id='slide'>
                  <div className="my-mother xs-top-3">
                    {i?.features.map((i, index) => (
                      <div className="my-mother">
                        <span className="px9 upper-case bg-white faded pd-5 rad-10">{i}</span>
                      </div>
                  ))}
                  </div>
                </div>
                </> :<div onClick={()=> {slidesHandler('features')}}><span className="faded">Features</span> <span className="fl-right"><i className="fas fa-angle-right faded"></i></span></div>}
              </div>
              <div className="my-mother pd-10 xs-down-2 rad-10 bg-faded">
              {video ? <>
                  <div onClick={()=> {setVideo(false)}} ><span className="" >Video</span> <span className="fl-right"><i className="fas fa-angle-down faded"></i></span></div>
                 <div  onClick={()=> {setVideo(false)}} className="my-mother xs-down-4 my-fade-in" id='slide'>
                  <div className="my-mother xs-top-3">
                   <YoutubeEmbed embedId={i?.youtube_link} />
                  </div>
                </div>
                </> :<div onClick={()=> {slidesHandler('video')}}><span className="faded">Watch Video <i className="fas fa-video mg-5"></i></span> <span className="fl-right"><i className="fas fa-angle-right faded"></i></span></div>}
              </div>
             </div>
        </div>
        <div className="my-mother xs-down-10vh my-bottom-50"></div>
        <div className="schedile-appointment-con">
            <div className="xs-container">
              <div className="xs-8">
                <span onClick={()=> {history.push('/login')}} className="white px13 bold my-b-shadow centered bg-color-code-1 my-mother my-btn-sm rad-20 c-pointer">Book For Property Inspection</span>
              </div>
              <div className="xs-4 xs-down-2">
               <span className="pd-10 px20 rad-20 bg-green white mg-10 c-pointer"><i className="fab fa-whatsapp"></i></span>
               <span className="pd-10 px20 rad-20 bg-color-code-2 mg-10 c-pointer"><i className="fa fa-phone-alt color-code-1"></i></span>
              </div>
            </div>
        </div>
     </div>
    </div>
</> );
}
 
export default SeePropertyDetails;