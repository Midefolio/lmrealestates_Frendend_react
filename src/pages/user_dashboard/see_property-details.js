import Slider from "react-slick";
import img1 from '../../images/aerial-view-sea-with-park-garden-thailand_1339-82701.jpg'
import { TfiLocationPin } from "react-icons/tfi";
import {AiFillLike, AiOutlineShareAlt, AiOutlineTags } from "react-icons/ai";
import Bookings from "./bookings";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useUtils from "../../utils/useutils";
import useApi from "../../hooks/useApi";
import { AuthContext } from "../../context/authcontex";
import Pusher from 'pusher-js';
import { UserContext } from "../../context/userContext";
import HtmlParser from "react-html-parser";
import YoutubeEmbed from "./youtube_video";

const PropertyDetails = () => {
const { id } = useParams();
const token = JSON.parse(localStorage.getItem('LR_jwt'));
const [book, setBook] = useState(false)
const [i, setDetails] = useState(null)
const [Pending, setPending] = useState(null)
const { isSending, setToast, formatNumber } = useUtils();
const { makeRequest } = useApi();
const abortController = useRef(new AbortController)
const { path } = useContext(AuthContext); 
const { currentUser } = useContext(UserContext)
const [isLiked, setIsLiked] = useState(null)
const likeRef = useRef();
const [description, setDescription] = useState(false)
const [features, setFeatures] = useState(false)
const [video, setVideo] = useState(false)
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
  const cb =()=> {isSending(false)}
  const result = await makeRequest('post', 'users/get_single_prop', {id}, cb, token?.jwt, abortController )
  if(result?.message === 'done') {
    setDetails(result?.properties)
    isSending(false)
  }
}

useEffect(() => {
  getDetails()
  return ()=> {abortController.current.abort()}
}, [])



useEffect(() => {
   const pusher = new Pusher( process.env.REACT_APP_PUSHER_KEY, {
     cluster: process.env.REACT_APP_PUSHER_CLUSTER,
     encrypted: true,
   });
   const channel = pusher.subscribe('likes');
   channel.bind('update', (data) => {
      // getAllActiveProp();
   });

   return () => {
     channel.unbind();
     pusher.unsubscribe('likes');
   };
 }, []);

const getiIsLiked =()=> {
   console.log('likes chamges')
   const email = i?.likes?.find(l => l.email == currentUser?.email)
   if(email?.email === currentUser?.email){
      setIsLiked(true)
   }
}

useEffect(() => {
   getiIsLiked();
   likeRef.current.innerText = i?.likes.length
})


const likePpt = async () => {
   const check = i.likes.find(i => i.email === currentUser?.email);
   if(!check){
      setIsLiked(true)
     const updateLikeArr = [...i.likes, {email:currentUser?.email}] 
     i.likes = updateLikeArr
     if(updateLikeArr) {
        const result = await makeRequest('post', 'users/like_prop', {_id:i?._id, email:currentUser?.email, action:"liked", likesArr:i.likes}, null, token?.jwt)
        if(result?.message === 'done'){
           setToast('Liked !')
        }
      }
    }
}

const UnlikePpt = async () => {
   const check = i.likes.find(i => i.email === currentUser?.email);
   if(check){
      setIsLiked(null)
      const ar = i.likes.filter(i => i.email !== currentUser?.email);
      i.likes = ar
      const result = await makeRequest('post', 'users/like_prop', {_id:i?._id, email:currentUser?.email, likesArr:i.likes, action:'unliked'}, null, token?.jwt)
      if(result?.message === 'done'){
         setToast('UnLiked !')
      }
   }
}

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
  {book && <Bookings  i={i} setBook={setBook} />}
    <div className="my-mother" >
    <div className="ppt-nav">
        <div className="xs-6"><span className="pd-5" onClick={()=> {history.push('/dashboard/all_properties')}}><i className="fas fa-angle-left alice"></i></span></div>
         <div className="xs-6 right">
         <span className={`px20  pd-10 rad-10 ${isLiked && "color-code-1 "}` } onClick={(e)=> { isLiked ? UnlikePpt() :  likePpt()}}><AiFillLike/> <span className="px13"> <span ref={likeRef}></span></span> </span> 
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
                <span onClick={()=> {setBook(true)}} className="white px13 bold my-b-shadow centered bg-color-code-1 my-mother my-btn-sm rad-20 c-pointer">Book For Property Inspection</span>
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
 
export default PropertyDetails;