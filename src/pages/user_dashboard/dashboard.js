import { AiOutlineLogout } from "react-icons/ai";
import Layout from "./layout";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Isloading from "../../components/isloading";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "../../context/authcontex";
import Logout from "../../components/logout";
import useUtils from "../../utils/useutils";
import CatSkeleton from "../../components/skeleton/catSeleton";
import useApi from "../../hooks/useApi";
import Fade from 'react-reveal';
import { UserContext } from "../../context/userContext";
import SetPassword from "../../components/set_password";

const Dashboard = () => {

  useEffect(() => {
    document.body.style.backgroundColor = '#F7F9FD';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []); 


 const history = useHistory();
 const token = JSON.parse(localStorage.getItem('LR_jwt'));
 const { isloading, error, getUser, logoutOut, summary } = useContext(AuthContext);
 const { currentUser } = useContext(UserContext)
 const [logout, setLogout] = useState(false);
 const { formatNumber } = useUtils()
 const { makeRequest } = useApi();
 const cancleLogout = () => {setLogout(false)};
  return ( <>
  {isloading && <Isloading error={error} getUser={getUser} token={token}  />}
  {currentUser?.password === null && <SetPassword getUser={getUser} currentUser={currentUser} />}
  {logout && <Logout closeModal={cancleLogout} cb={logoutOut} />}
   <Layout active={'home'} />
   <div className="my-col-10 off-2 xs-container xs-down-20">
    <div className="my-col-10 down-5 xs-12 xs-down-7">
      <div className="px20">
        <div className="my-col-7 xs-10 bottom-bd">
          {/* <div>
            <h1 className="xs-px15 bold xs-down-3">Welcome Ayomide Olosho</h1>
            </div> */}
          <div><h1 className="bold">Welcome {currentUser?.lastname}</h1></div>
          <div className="my-mother xs-top-3 top-1 xs-faded"><span className="px13 faded">Buy, sell or rent properties</span></div>
        </div>
        <div className="my-col-5 xs-2 xs-top-5">
          <span className="fl-right pd-10" title="Logout" onClick={()=>{setLogout(true)}}><AiOutlineLogout/></span>
        </div>
      </div>
       {currentUser?.isVerified === false && <div className="my-col-8 xs-12 bg-color-code-2 xs-down-5 pd-5 down-4"><span className="px13 xs-px9 color-code-1 mg-10">please click the link sent to your mailbox to verify your email.</span></div>}
        
       {!summary && <div className="my-mother down-3 xs-down-5"><CatSkeleton slideToShow={3} /></div>}
       {summary &&    <Fade> <div className="my-mother down-6 xs-down-2">
        <div className="das-params-con xs-4 bd-r-active" onClick={()=>{history.push('/dashboard/properties/active')}}>
          <div className="my-col-10 off-1 xs-11">
            <span className="xs-px10 color-green bold">Active <i className="fas fa-angle-right"></i></span>
            <div className="my-mother down-3 color-green"> {summary?.active}</div>
          </div>
        </div>
        <div className="das-params-con xs-4 bd-r-reviewing" onClick={()=>{history.push('/dashboard/properties/pending')}}>
          <div className="my-col-10 off-1 xs-11">
            <span className="xs-px10 bold color-yellow">Reviewing <i className="fas fa-angle-right"></i></span>
            <div className="my-mother down-3 color-yellow"> {summary?.pending}</div>
          </div>
        </div>
        <div className="das-params-con xs-4 bd-r-declined" onClick={()=>{history.push('/dashboard/properties/declined')}}>
          <div className="my-col-10 off-1 xs-11">
            <span className=" bold red xs-px10">Declined <i className="fas fa-angle-right"></i></span>
            <div className="my-mother down-3 red"> {summary?.declined}</div>
          </div>
        </div>
      </div> </Fade>}

      <div className="my-mother down-5 xs-down-5 hidden-l">
        <div className="my-col-4 xs-12 pd-10 rad-10 bg-white xs-my-shadow" onClick={()=>{history.push('/dashboard/bookings')}}>
          <div className="xs-px13 faded">Your Bookings:</div>
          <div className="bold xs-px13 xs-down-1 ">NGN {formatNumber(currentUser?.balance)}</div>
          {/* <div className="my-mother down-2 c-pointer hidden-xs"><span className="pd-10 bg-faded color-code-1 px13">top up <i className="fas fa-arrow-down"></i></span></div> */}
        </div>
        <div className="my-col-4 xs-12 xs-down-3 pd-10 rad-10 bg-white">
        <div className="xs-10 my-col-10">
            <div className="xs-px13 faded">Pending Withdrawals:</div>
            <div className="xs-px13 xs-down- bold ">{formatNumber(currentUser?.balance)}</div>
            {/* <div className="my-mother down-2 c-pointer hidden-xs"><span className="pd-10 bg-faded color-code-1 px13">top up <i className="fas fa-arrow-down"></i></span></div> */}
          </div>
          <div className="xs-2 down-8 hidden-ls my-col-2 faded right xs-down-3">
            <i className="fas fa-angle-right px20"></i>
          </div>
        </div>
        <div className="my-col-4 xs-12 xs-down-3 pd-10 rad-10 xs-my-b-sha bg-white">
          <div className="xs-10 my-col-10">
            <div className="xs-px13 faded">Your Bookings:</div>
            <div className="xs-px13 xs-down- bold ">{formatNumber(currentUser?.balance)}</div>
            {/* <div className="my-mother down-2 c-pointer hidden-xs"><span className="pd-10 bg-faded color-code-1 px13">top up <i className="fas fa-arrow-down"></i></span></div> */}
          </div>
          <div className="xs-2 down-8 my-col-2 hidden-ls faded right xs-down-3">
            <i className="fas fa-angle-right px20"></i>
          </div>
        </div>
      </div>
      
      <div className="my-mother down-10 xs-down-10"><span className="xs-px13 faded">What would you like to do today ?</span></div>
      <div className="my-col-12 xs-12 down-2 entered xs-down-3">
        <div className="xs-6 hidden-ls">
          <span className="my-btn-sm bg-color-code-1 xs-px10 px13 white" onClick={()=>{history.push('/dashboard/all_properties')}}>Buy or Rent a Property</span>
        </div>
        <div className="xs-6 hidden-ls">
        <span className="my-btn-sm bg-color-code-1 px13 xs-px10 white" onClick={()=>{history.push('/dashboard/post')}}>Post New Property <i className="fas fa-plus"></i></span>
        </div>
        <span className="anchors bg-color-code-1 px13 white hidden-xs" onClick={()=>{history.push('/dashboard/all_properties')}}>Buy or Rent a Property</span>
        <span className="anchors bg-color-code-1 px13 white mg-10 hidden-xs" onClick={()=>{history.push('/dashboard/post')}}>Post New Property</span>
      </div>
    </div>
   <div className="my-mother down-10 xs-down-20vh"></div>

   </div>
  </> );
}
 
export default Dashboard;