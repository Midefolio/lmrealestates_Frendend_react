import { useState } from "react";

const Bookings = ({setBook}) => {
    const [proceed, setProceed] = useState(false);


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
                 <li className="px12 color-code-1 xs-down-3">You will be required to pay a non-refundable inspection fee.</li>
                 <li className="px12 faded xs-down-3">At no point should customers pay or do transactions with any of our location personnel Managers(LPM). All transcation are to be made directly to the L-mobile account.</li>
                 <li className="px12  xs-down-3 color-code-1">L-mobile will not be liable for any frudulent act between our LPM and customers. </li>

                 <div className="my-mother xs-down-8"><span onClick={()=> {setProceed(true)}}  className="my-mother centered px13 white bg-color-code-1 rad-20 bold c-pointer my-btn-sm">Proceed To Schedule</span></div>
                   
               </div></> : <>
                
                <div className="my-mother bd-bottom-bold"><span className="bold">Scheduler</span></div>
                <div className="my-mother xs-down-5">
                    <p className="px13 faded">Choose Day</p>
                    <select className="input xs-top-3 faded px13 bg-faded" id="">
                      <option value="">----</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                </div>
                <div className="my-mother xs-down-5">
                    <p className="px13 faded">Choose Time</p>
                    <select className="input xs-top-3 faded px13 bg-faded" id="">
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
                   <input type="tel" className="input xs-top-3 bg-faded px13" />
                </div>
                <div className="px13 color-code-1 xs-down-3 my-mother"><span>Inspection fee: N2,000.00</span></div>
                <div className="my-mother xs-down-8"><span className="my-mother centered px13 white bg-color-code-1 rad-20 bold c-pointer my-btn-sm">Proceed To Book</span></div>
               </>}
            </div>
        </div>
      </div>
    </> );
}
 
export default Bookings;