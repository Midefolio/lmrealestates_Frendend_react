import { useContext, useEffect, useRef } from "react";
import Layout from "./layout";
import { UserContext } from "../../context/userContext";
import { useState } from "react";
import useApi from "../../hooks/useApi";
import useUtils from "../../utils/useutils";
import { AiOutlineLoading } from "react-icons/ai";
import CatSkeleton from "../../components/skeleton/catSeleton";
import { GiEmptyMetalBucketHandle } from "react-icons/gi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const UserBookings = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#F7F9FD';
    return () => {
    document.body.style.backgroundColor = '';
    };
}, []); 
    const { currentUser } = useContext(UserContext)
    const [bookings, setBookings] = useState(null);
    const token = JSON.parse(localStorage.getItem('LR_jwt'));
    const abortController = useRef(new AbortController)
    const {makeRequest} = useApi();
    const { formatDateInWords, formatTransactionTime, hasDatePassed} = useUtils();
    const [cancelTicket, setCancelTicket] = useState(false)
    const [viewMore, setViewMore] = useState(null)
    const history = useHistory();
    
    const getBookings = async () => {
      setBookings(null)
      const result = await makeRequest('post', 'users/get_bookings', {userId:currentUser?._id}, null, token?.jwt, abortController);
      if(result?.message === 'done'){
        setBookings(result?.bookings)
      }
    }

    useEffect(() => {
     if(currentUser?._id){
      getBookings();
     }
      // return (()=> {abortController.current.abort()})
    }, [currentUser?._id])
  
    return ( <>
     <Layout active='bookings' />
     <div className="my-col-10 off-2 xs-container xs-down-20">
       <div className="my-col-10 down-5 xs-12 xs-down-7">
        <div className="my-mother bd-bottom-bold"><h1 className="bold"> <i onClick={()=> {history.push('/dashboard')}} className="fas fa-arrow-left pd-5"></i> My Bookings</h1></div>
        <div className="my-mother xs-down-5">
          <div className="my-mother my-bottom-10"><span className="px13 faded">Ticket automatically disappears after date has elapsed</span></div>
        {!bookings && <div className="my-mother down-3 xs-down-5"><CatSkeleton slideToShow={3} /></div>}
         {bookings?.map((i, index) => (
              <div key={index}>  
              {!hasDatePassed(i?.date) && <>
                {cancelTicket === index && <CancleTicket setCancelTicket={setCancelTicket} />} 
                <div className="xs-12 xs-down-1 my-bottom-10 my-b-shadow bg-white rad-10"  onClick={()=> {setViewMore('tiekct'+index)}}>
                <div className="xs-container xs-down-2">
                  <div  className="my-mother">
                    <div className="xs-2"> <span className="rad-50 pd-10 bg-faded hidden-ls xs-"> <i className="fa fa-clock color-code-1"></i></span></div>
                    <div className="xs-10 xs-down-1">
                     <span className="xs-12 px13"><span className="bold">New Inspection Ticket</span> 
                     <div><span className="px12 faded">{formatDateInWords(i?.date)} by {i.time}</span></div>
                      <div className="my-mother xs-down-1">
                        <span className="px10 color-code-1 pd-">View More <i className="fas fa-angle-down"></i></span>
                        <span className=" fl-right faded px10">{formatTransactionTime(i.createdAt, new Date)}</span>
                      </div>
                     </span>
                     
                    </div>
                    {viewMore === 'tiekct'+ `${index}` && <div className="xs-10 xs-off-1 xs-down-5 my-fade-in" onClick={(e)=> {e.stopPropagation(); setViewMore(null)}}>
                     <div className="my-mother bd-bottom xs-top-3"></div>
                      <div className="my-mother xs-down-4 xs-px13">Ticket Id: <div className="faded px12 my-mother">{i?._id}</div></div>
                      <div className="my-mother xs-down-1 xs-px13">Property: <div className="faded px12 my-mother">{i?.property_name} ({i?.property_title})</div></div>
                      <div className="my-mother xs-down-1 xs-px13">Inspection Date: <div className="faded px12 my-mother">{formatDateInWords(i?.date)} by {i.time}</div></div>
                      <div className="my-mother xs-down-1 xs-px13">Inspection Fee: <div className="faded px12 my-mother">{i.inspection_fee}</div></div>
                      <div className="my-mother  my-bottom-10 xs-down-5">
                        <span className="pd-10 fl-right bg-faded-2 xs-top-3 faded-2" onClick={(e) => {e.stopPropagation(); setCancelTicket(index)}}>Cancel Ticket</span>
                      </div>
                     </div>}
                    </div>
                </div>
            </div>
              </>}
            
            </div>
         ))}

      {bookings?.length === 0 && <>
        <div className="my-mother down-15 xs-down-20 centered">
          <div className="page-icon"><GiEmptyMetalBucketHandle className="px100 faded" /></div>
          <div className="my-mother down-1"><span className="faded">You have no Inspection tickets</span></div>
        </div>
      </>}
       
        </div>
      </div>
     </div>

    
    </> );
}



const CancleTicket =({setCancelTicket})=> {
  const [iscancelling, setCancelling] = useState(false);
  const {makeRequest} = useApi();

  const cancelRequest =()=> {

  }


  return(<>
    <div className="my-modal bg-blur my-fade-in" onClick={()=> {setCancelTicket(false)}}>
      <div className="my-col-10 off-1 xs-container xs-down-20vh bg-white my-bottom-50 rad-10" onClick={(e) => {e.stopPropagation()}}>
        <div className="xs-10 xs-off-1 xs-down-15">
         <div><span className="bold"> Why Cancel Ticket 😢?</span></div>
         <div className="my-mother xs-down-5">
           <p>
            <select name="" className="input px13" id="">
              <option value="">I have inspected the property</option>
              <option value="">I changed My Mind</option>
              <option value="">I got the property already</option>
              <option value="">Can't afford the inspection fee</option>
              <option value="">No reasons</option>
            </select>
          </p>
          <p className="my-mother xs-down-5">
            {!iscancelling?<span onClick={cancelRequest} className="my-btn-sm bg-color-code-1 white px13">Proceed</span>:
            <span className="my-btn-sm bg-color-code-1 white px13"><AiOutlineLoading className="fa fa-spin"/></span>}
          </p>
         </div>
        </div>
      </div>
    </div>
  </>)
}


 
export default UserBookings;