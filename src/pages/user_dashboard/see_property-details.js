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

const PropertyDetails = () => {
const { id } = useParams();
const token = JSON.parse(localStorage.getItem('LR_jwt'));
const [book, setBook] = useState(false)
const [i, setDetails] = useState(null)
const [Pending, setPending] = useState(null)
const { isSending, setToast } = useUtils();
const { makeRequest } = useApi();
const abortController = useRef(new AbortController)
const { path } = useContext(AuthContext); 
const { currentUser } = useContext(UserContext)
const [isLiked, setIsLiked] = useState(null)
const likeRef = useRef();

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

return ( <>
  {book && <Bookings setBook={setBook} />}
    <div className="my-mother" >
    <div className="ppt-nav">
        <div className="xs-6"><span className="pd-5" onClick={()=> {history.push('/dashboard/properties')}}><i className="fas fa-angle-left alice"></i></span></div>
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
             <div className="my-mother xs-down-2"><span className="bold px20 ">3 bedroom flat for rent - Tanke Okeodo</span></div>
             <div className="my-mother xs-down-3"><span className="color-code-1 px20 bold"> <AiOutlineTags/> N100,000.00 / year  <span className="px13 black">( 90,000.00 renewal )</span></span></div>
             <div className="my-mother xs-down-3 faded px18 ">
             <TfiLocationPin />
             <span className="mg-5">Tanke okooba junction ilorin kwara state Nigeria.</span>
             </div>
             <div className="my-mother xs-down-3">
              {/* <div><span className="bold black px18">Property Details</span></div> */}
              <div className="my-mother pd-10 xs-down-3 rad-10 bg-faded">
                <div><span className="faded">Description</span> <span className="fl-right"><i className="fas fa-angle-right faded"></i></span></div>
                {/* <div className="my-mother xs-down-4"><span className="px13 faded">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit rerum quia aspernatur facilis excepturi facere cupiditate nihil distinctio. Nisi unde laboriosam iusto error pariatur et repellat quas rem quasi animi.</span></div> */}
              </div>
              <div className="my-mother pd-10 xs-down-2 rad-10 bg-faded">
                <div><span className="faded">Features</span> <span className="fl-right"><i className="fas fa-angle-right faded"></i></span></div>
                {/* <div className="my-mother xs-down-4"><span className="px13 faded">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit rerum quia aspernatur facilis excepturi facere cupiditate nihil distinctio. Nisi unde laboriosam iusto error pariatur et repellat quas rem quasi animi.</span></div> */}
              </div>
              <div className="my-mother pd-10 xs-down-2 rad-10 bg-faded">
                <div><span className="faded">Prices</span> <span className="fl-right"><i className="fas fa-angle-right faded"></i></span></div>
                {/* <div className="my-mother xs-down-4"><span className="px13 faded">L6B2o2VtfriTS3jk27RJaOm7Hy6Gh Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore alias laboriosam officia voluptatum id est deleniti voluptas vel aut. Eum praesentium amet itaque officia, suscipit adipisci molestiae porro accusamus ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo distinctio harum id quia minima quam voluptatum animi sequi, beatae natus esse ducimus, necessitatibus tenetur neque dicta laborum vero ex suscipit! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut dolores quae consequatur aperiam officiis, reprehenderit voluptatibus dolorem at quo libero perspiciatis. Ipsa dignissimos ea molestiae dolor sequi neque assumenda distinctio! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit rerum quia aspernatur facilis excepturi facere cupiditate nihil distinctio. Nisi unde laboriosam iusto error pariatur et repellat quas rem quasi animi.</span></div> */}
              </div>
              <div className="my-mother pd-10 xs-down-2 rad-10 bg-faded">
                <div><span className="faded">Youtube Video</span> <span className="fl-right"><i className="fas fa-angle-right faded"></i></span></div>
                {/* <div className="my-mother xs-down-4"><span className="px13 faded">L6B2o2VtfriTS3jk27RJaOm7Hy6Gh Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore alias laboriosam officia voluptatum id est deleniti voluptas vel aut. Eum praesentium amet itaque officia, suscipit adipisci molestiae porro accusamus ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo distinctio harum id quia minima quam voluptatum animi sequi, beatae natus esse ducimus, necessitatibus tenetur neque dicta laborum vero ex suscipit! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut dolores quae consequatur aperiam officiis, reprehenderit voluptatibus dolorem at quo libero perspiciatis. Ipsa dignissimos ea molestiae dolor sequi neque assumenda distinctio! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit rerum quia aspernatur facilis excepturi facere cupiditate nihil distinctio. Nisi unde laboriosam iusto error pariatur et repellat quas rem quasi animi.</span></div> */}
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