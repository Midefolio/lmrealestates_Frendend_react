import { AiOutlineDisconnect, AiOutlineLoading } from "react-icons/ai";

const Isloading = ({error, getUser, token}) => {
  return ( < >
   <div className="loader-div">
    {! error? <div className="my-mother down-20 xs-down-30vh">
      <p><span><AiOutlineLoading className="px30 fas fa-spin faded"/></span></p> <br />
      <p><span className="faded">LOADING YOUR DASHBOARD...</span></p>
    </div>:<div className="my-mother down-20 xs-down-20vh">
      <p><span><AiOutlineDisconnect className="px30 fas fa-spin"/></span></p> <br />
      <p><span className="faded upper-case">There was an error loading your dashboard</span></p>
      <p className="my-mother xs-down-5"><span className="my-btn-sm bg-color-code-1 white" onClick={()=>{getUser(token, true)}}>Try again</span></p>
    </div>}
   </div>
  </> );
}
 
export default Isloading;