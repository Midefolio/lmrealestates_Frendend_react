import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/authcontex";
import useApi from "../../hooks/useApi";
import useUtils from "../../utils/useutils";
import { AiOutlineLoading } from "react-icons/ai";
import { Fade } from "react-reveal";

const Password = ({setChangePassword}) => {
  const {currentUser, token} = useContext(AuthContext);
  const {makeRequest} = useApi();
  const {setToast, isStrongPassword, preventSpaceInPassword} = useUtils();
  const [pending, setIsPending] = useState(false);
  const [password, setPassword] = useState({
    _id:"",
    password:"",
    new_password:"",
    confirm_password:""
  })

  const passwordRef = useRef();
  const newRef = useRef();
  const confirmRef = useRef();

  const updatePassword = async () => {
   
     if(password.password === ""){
       passwordRef.current.focus();
       return;
     }

     if(password.new_password === ""){
       newRef.current.focus();
       return;
     }

     if(password.confirm_password === ""){
       confirmRef.current.focus();
       return;
     }

     if(password.new_password !== password?.confirm_password){
      setToast('Password does not match')
      newRef.current.focus();
      confirmRef.current.focus();
       return;
     }

     if(!isStrongPassword(password?.new_password)){
        setToast("Password must be at least 8 characters with at least a number, an alphabet and a symbol")
        newRef.current.focus();
        return;
     }

    setIsPending(true);
    const cb =()=>{setIsPending(false)}
    password['_id'] = currentUser?._id;
    const res = await makeRequest('post', 'api/passwords', password, cb, token?.jwt);
    if(res?.message === 'done'){
      setIsPending(false);
      setChangePassword(false);
      setToast("Password changed successfully")
    }
  }


  return (<>
  <Fade>
    <div className="my-col-4 off-4 down-15 floating-container">
      <div className="my-col-10 off-1 down-5">
        <div className="my-mother bd-bottom-bold">
          Change Password
          <span className="fl-right pd-10 top-3 c-pointer" onClick={()=>{setChangePassword(false)}}><i className="fas fa-times px13 black"></i></span>
        </div>
        <div className="form my-mother down-3">
          <div className="my-mother down-3"><input id="pas" ref={passwordRef} type="text"  onInput={(e) => {setPassword(prev => ({...prev, password:e.target.value})); preventSpaceInPassword('pas')}} placeholder="current Password" className="input-1 px13 unset-tx" /></div>
          <div className="my-mother down-3"><input id="new" type="text" ref={newRef}  onInput={(e) => {setPassword(prev => ({...prev, new_password:e.target.value})); preventSpaceInPassword('new') }} placeholder="New Password" className="input-1 px13 unset-tx" /></div>
          <div className="my-mother down-3"><input id="com" type="text" ref={confirmRef}  onInput={(e) => {setPassword(prev => ({...prev, confirm_password:e.target.value})); preventSpaceInPassword('com')}} placeholder="Confirm Password" className="input-1 px13 unset-tx" /></div>
          {pending?
          <div className="my-mother down-5"><span className="anchors bg-color-code-1 px13 white"><AiOutlineLoading className="fas fa-spin" /></span></div>
          :
          <div className="my-mother down-5"><span className="anchors bg-color-code-1 px13 white" onClick={updatePassword}>Change Password</span></div>}
        </ div>
      </div>
    </div>
    </Fade>
  </> );
}
 
export default Password;