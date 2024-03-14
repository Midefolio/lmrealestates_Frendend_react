import {useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {AiFillLike, AiOutlineHeart, AiOutlineLike} from "react-icons/ai";
import useUtils from "../utils/useutils";

const PropContainer = ({i}) => {
   const history = useHistory();
   const path = 'https://rich-cards.000webhostapp.com/images/' 
   const { formatNumber } = useUtils();
   const token = JSON.parse(localStorage.getItem('LR_jwt'));

    return ( <>
     <div className="xs-12 my-col-3"  onClick={()=> { token ? history.push(`/dashboard/property/${i?._id}`) :history.push(`/details/${i?._id}`)}}>
        <div className="xs-12 bg-white my-b-shadow rad-10 my-bottom">
            <div className="xs-4"><div className="property-img-con"><img src={path + i?.images[0]} alt="" /></div></div>
            <div className="xs-8 down-">
               <div className="my-container">
                 <div className="faded px10 xs-down-3 xs-12">{i?.name}
                 <i className="fas fa-circle px1 mg-5"></i>
                 <span className="green mg-5">{i?.isvailable}</span>
                 </div>
                    <div className="my-mother xs-down-"><span className="bold xs-px13" >{i?.title}</span></div>
                    <div className="my-mother"><span className="color-code-1 xs-px13 bold">₦{formatNumber(i?.price.first_year)}</span></div>
                    <div className="my-mother down-3 xs-down-"><span className="px9 rad-10 fded upper-case pd-5 bg-color-code-2 color-code-1" ><i className="fas fa-map-marker-alt"></i> <span className="mg-5">{i?.location.state}. {i.location.city}. {i.location.area}</span></span></div>
                  <div className="my-mother rigt xs-down-2">
                    <span className="px12 rad-10 pd-5 bg-faded" onClick={(e)=> {e.stopPropagation(); history.push(`/login`)}}>{i.likes.length}  <AiOutlineHeart className="mg- px15"/></span>
                  </div>
               </div>
            </div>
        </div>
     </div>
    </> );
}
 
export default PropContainer;