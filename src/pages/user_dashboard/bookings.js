import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../context/userContext";
import useUtils from "../../utils/useutils";
import { useRef } from "react";
import useApi from "../../hooks/useApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Tippy from '@tippyjs/react';
import { AiOutlineLoading } from "react-icons/ai";

const Bookings = ({setBook, i}) => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('LR_jwt'));
  const {currentUser} = useContext(UserContext)
    const [proceed, setProceed] = useState(false);
    const {calculateInspectionFee, setToast, formatNumber} = useUtils();
    const {makeRequest} = useApi();
    const dayRef = useRef();
    const timeRef = useRef();
    const phoneRef = useRef()
    const[isbooking, setIsBooking] = useState(false)
    const [booking, setBooking] = useState({
      date:"",
      time:"",
      phone:"",
      property_id:i?._id,
      property_name:i?.name,
      property_title:i?.title,
      property_address:i?.location?.detailed_address,
      property_price:i?.price?.first_year,
      property_subsequent_price:i?.price?.subsequent,
      property_owner_contact:i?.contact_details.whatsapp,
      property_owner_aza:i?.account_number,
      property_owner_bank:i?.bank_name,
      property_owner_name:i?.contact_details.name,
      inspection_fee:calculateInspectionFee(i?.price?.first_year),
      bookerName:currentUser?.firstname + " " + currentUser?.lastname,
      bookerId:currentUser?._id
    })

    const submitBooking = async () => {
      setIsBooking(true)
      const cb =()=> {setIsBooking(false)}
      const result = await makeRequest('post', 'users/add_bookings', booking, cb, token?.jwt, null);
      if(result?.message === 'done'){
        setIsBooking(true)
        history.push('/dashboard/bookings')
      }
    }
    
    const ProceedToPay = async ()  => {
      if(booking?.date === ""){
        setToast('Please choose a day')
        dayRef.current.focus();
        return
      }
      if(booking?.time === ""){
        setToast('Please choose a time')
        timeRef.current.focus();
        return
      }
      if(booking?.phone === ""){
        setToast('Please enter your phone number')
        phoneRef.current.focus();
        return
      }
      submitBooking();
    }
  

    return ( <>
      <div className="my-modal" onClick={()=> {setBook(false)}}>
        <div className="xs-container  my-bottom-50 bg-white rad-10 xs-down-10vh" onClick={(e)=> {e.stopPropagation()}}>
            <div className="xs-10 xs-off-1 xs-down-10">
               {!proceed ? <> <div className="cat-img"></div>
                <div><span className="bold">L-Mobile Property Inspection Services</span></div>
                <div className="my-mother xs-down-3 ln-1"><span className="px12 faded">To avoid problems <span className="color-code-1">do not</span> buy or rent any property until you have properly inspected them yourself.</span></div>
                 <div className="my-mother xs-down-5"><span className="bold">How It Works</span></div>
                <div className="my-mother xs-down-3 ln-1 justify">
                  <div className=""> <span className="px12 faded">Use the scheduler below to fix a confortable time for inspection and our Location Personnel Manager(LPM) will bet back to you in a flash.</span></div>
                 <div className="my-mother xs-down-8 bold px12 my-bottom-10"><span className="px10">Please Note:</span></div>
                 <li className="px12 color-code-1 xs-down-3">You will be required to pay a non-refundable inspection fee during inspection.</li>
                 <li className="px12 faded xs-down-3">At no point should customers pay or do transactions with any of our location personnel Managers(LPM). <span className="color-code-1">All transcation are to be made directly to the official L-mobile account below.</span></li>
                 <div className="my-mother xs-down-5 px12 my-bottom-10">
                  <span className="">7082470461 (Access bank)</span>
                  <div className="">Lifecom Global Services</div>
                 </div>
                 <li className="px12  xs-down-3 color-code-1">L-mobile will not be liable for any frudulent act between our LPM and customers. </li>

                 <div className="my-mother xs-down-8"><span onClick={()=> {setProceed(true)}}  className="my-mother centered px13 white bg-color-code-1 rad-20 bold c-pointer my-btn-sm">Proceed To Schedule</span></div>
                   
               </div></> : <>
                
                <div className="my-mother bd-bottom-bold"><span className="bold">Scheduler</span></div>
                <div className="my-mother xs-down-5">
                    <p className="px13 faded">Choose Date</p>
                    <input ref={dayRef}  onChange={(e)=> {setBooking(prev => ({...prev, date:e.target.value}))}} type="date" className="input xs-top-3 bg-faded px13" />
                </div>
                <div className="my-mother xs-down-5">
                    <p className="px13 faded">Choose Time</p>
                    <select ref={timeRef} onChange={(e)=> {setBooking(prev => ({...prev, time:e.target.value}))}} className="input xs-top-3 faded px13 bg-faded" id="">
                      <option value="">----</option>
                      <option value="10am">10am</option>
                      <option value="11am">11am</option>
                      <option value="12pm">12pm</option>
                      <option value="1pm">1pm</option>
                      <option value="2pm">2pm</option>
                      <option value="3pm">3pm</option>
                      <option value="4pm">4pm</option>
                      <option value="5pm">5pm</option>
                      <option value="6pm">6pm</option>
                    </select>
                </div>
                <div className="my-mother xs-down-5">
                <p className="px13 faded">Phone Number</p> 
                 <Tippy content={<div className="px13 my-mother bg-white my-b-shadow pd-10">
                  <p className="px13 faded">Phone Number</p> 
                    <div className="my-mother down-1 ">Please ensure you type in a valid phone Number we can reach you on.</div></div>}>
                    <input ref={phoneRef} onChange={(e)=> {setBooking(prev => ({...prev, phone:e.target.value}))}} type="tel" className="input xs-top-3 bg-faded px13" />
                  </Tippy>
                </div>
                <div className="px13 color-code-1 xs-down-5 my-mother">
                  <span className="bold">Inspection fee: ₦{formatNumber(calculateInspectionFee(i?.price?.first_year))}</span>
                  <div className="my-mother xs-down-2 justify ln-1"><span className="px13">Customer is responsible for the transportation cost during the inspection.</span></div>
                </div>
                {!isbooking ? <div className="my-mother xs-down-8"><span onClick={ProceedToPay} className="my-mother centered px13 white bg-color-code-1 rad-20 bold c-pointer my-btn-sm">Proceed To Book</span></div> :
                   <div className="my-mother xs-down-8"><span className="my-mother centered px13 white bg-color-code-1 rad-20 bold c-pointer my-btn-sm"><AiOutlineLoading className="fas fa-spin" /></span></div>
                }
               </>}
            </div>
        </div>
      </div>
    </> );
}
 
export default Bookings;