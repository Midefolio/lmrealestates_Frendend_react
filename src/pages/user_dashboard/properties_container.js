import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../context/authcontex";
import useUtils from "../../utils/useutils";
import {AiFillLike, AiOutlineLike} from "react-icons/ai";
import { UserContext } from "../../context/userContext";
import useApi from "../../hooks/useApi";
import Pusher from 'pusher-js';

const PropertyContainer = ({i, getAllActiveProp}) => {
   const history = useHistory();
   const {path} = useContext(AuthContext); 
   const {currentUser} = useContext(UserContext)
   const token = JSON.parse(localStorage.getItem('LR_jwt'));
   const { makeRequest } = useApi();
   const { setToast } = useUtils();
   const { formatNumber } = useUtils();
   const [isLiked, setIsLiked] = useState(null)
   const likeRef = useRef();
   const unlikeRef =useRef();



   useEffect(() => {
      const pusher = new Pusher( process.env.REACT_APP_PUSHER_KEY, {
        cluster: process.env.REACT_APP_PUSHER_CLUSTER,
        encrypted: true,
      });
      const channel = pusher.subscribe('likes');
      channel.bind('update', (data) => {
         getAllActiveProp();
      });

      return () => {
        channel.unbind();
        pusher.unsubscribe('likes');
      };
    }, []);

   const getiIsLiked =()=> {
      console.log('likes chamges')
      const email = i.likes?.find(l => l.email == currentUser?.email)
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
     <div className="xs-12 my-col-3"  onClick={()=> {history.push(`/dashboard/property/${i?._id}`)}}>
        <div className="xs-12 my-b-shadow rad-10 my-bottom">
            <div className="xs-4"><div className="property-img-con"><img src={path + i?.images[0]} alt="" /></div></div>
            <div className="xs-8 down-">
               <div className="my-container">
                 <div className="faded px10 xs-down-3 xs-12">{i?.name}
                 <i className="fas fa-circle px1 mg-5"></i>
                 <span className="green mg-5">{i?.isvailable}</span>
                 </div>
                    <div className="my-mother xs-down-2"><span className="bold xs-px13" >{i?.title}</span></div>
                    <div className="my-mother xs-down-1"><span className="color-code-1 xs-px13">NGN {formatNumber(i?.price.first_year)}</span></div>
                    <div className="my-mother down-3 xs-down-"><span className="px9 faded upper-case" ><i className="fas fa-map-marker-alt faded"></i> <span className="mg-5">{i?.location.state}.{i.location.city}.{i.location.area}</span></span></div>
                  <div className="my-mother">
                     <span className={`px20 rad-10 ${isLiked && "color-code-1 "}` } onClick={(e)=> { isLiked ? UnlikePpt() :  likePpt(); e.stopPropagation()}}><AiFillLike/> <span className="px13"> <span ref={likeRef}></span> likes</span> </span> 
                  </div>
               </div>
            </div>
        </div>
     </div>
    </> );
}
 
export default PropertyContainer;