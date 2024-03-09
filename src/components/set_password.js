import { useContext, useRef, useState } from "react";
import useApi from "../hooks/useApi";
import useUtils from "../utils/useutils";

const SetPassword = ({currentUser, getUser}) => {
    const { makeRequest } = useApi();
    const { setToast } = useUtils();
    const pasRef = useRef();
    const comRef = useRef();
    const token = JSON.parse(localStorage.getItem('LR_jwt'));
    const [isPending, setIsPending] = useState(false)
    const [param, setParam] = useState({
        password:"",
        confirm:'',
        _id:currentUser?._id
    })
  
   const submitHandler = async()=> {
    if(param?.password === ""){
        setToast('Please enter password')
        pasRef.current.focus()
        return
    }
    if(param?.confirm === ""){
        setToast('Please confirm password')
        comRef.current.focus()
        return
    }
    if(param?.password !== param?.confirm){
        setToast('Password is not consistent');
        comRef.current.focus();
        return
    }

   setIsPending(true);
   const cb =()=> {setIsPending(false)}
   const result = await makeRequest('post', 'users/set_password', param, cb, token?.jwt)
   if(result?.message === 'done'){
    await getUser(token, false)
    setIsPending(false)
   }
 }

    return ( <>
    <div className="my-modal">
      <div className="my-col-4 off-4 xs-10 bg-white my-bottom-50 xs-off-1 xs-down-10vh down-10">
         <div className="my-col-10 rad-10  off-1 xs-10 xs-off-1  down-5 xs-down-10">
           <div className="my-mother centered">
           <div className="my-mother"><span className="bold px20">Welcome {currentUser?.firstname} !</span></div>
            <div className="my-mother down-2 xs-down-5"><span className="faded px13">Please set your account password</span></div>
            <div className="my-mother down-2 xs-down-5">
                <div className="my-mother down-1 xs-down-2"><input ref={pasRef} onChange={(e) => {setParam(prev => ({...prev, password:e.target.value}))}} type="text" className="input bg-faded px13"  placeholder="Password" /></div>
                <div className="my-mother down-1 xs-down-2"><input ref={comRef} onChange={(e) => {setParam(prev => ({...prev, confirm:e.target.value}))}} type="text" className="input bg-faded px13" placeholder="Confirm Password" /></div>
                <div className="my-mother down-2 xs-down-3 bg-color-code-2 color-code-1 pd-5"><span className="px13 xs-px10 monR">Password must be at least 8 characters with at least a number, an alphabet and a symbol</span></div>
                <div className="my-mother down-3 xs-down-3">
                    {!isPending? <span className="my-mother c-pointer centered my-btn-sm white px13 bg-color-code-1" onClick={submitHandler}>Set Password</span>:
                     <span className="my-btn-sm  my-mother centered c-pointer white px13 bg-color-code-1"><i className="fas fa-spinner fa-spin"></i></span>
                    }
                </div>
            </div>
        
           </div>
         </div>
      </div>

    </div>
    
    </> );
}
 
export default SetPassword;