import { AiOutlineLoading } from "react-icons/ai";
import NavBar from "../components/navbar";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";

const VerifyEmail = () => {
  const {token} = useParams();
  const [verification_status, setVerification_status] = useState('verifying');
  const {makeRequest} = useApi();
  const history = useHistory();

  const verifyEmail = async () => {
    setVerification_status('verifying');
    const res = await makeRequest('post', '/auth/verifyemail', { emailToken: token }, cb);
    if(res){
      localStorage.setItem('LR_jwt', JSON.stringify(res))
      history.push('/dashboard')
    }
  }

  
  const cb =()=> {
    setVerification_status('bad');
  }

  useEffect(() => {
    verifyEmail()
  }, [token])


  return ( <>
   <NavBar/>
   <div className="my-col-10 xs-container off-1 down-10 xs-down-30">
    {verification_status === 'verifying' && <div><span className="">Verifing your email...... <AiOutlineLoading className="fas fa-spin" /></span></div>}
    {verification_status === 'bad' && <div><span className="">Oops!!!.... Verification was not successfull.  </span> <div className="my-mother down-3 xs-down-5 px13">You may have used the wrong link or This link has expired</div></div>}
    

    <div className="my-mother down-5 xs-down-10 px13" >Page will automatically redirect if verification is successful.</div>
   </div>
  </> );
}
 
export default VerifyEmail;