import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Layout from "./layout";
import Password from "./manage_password";
import { useContext, useState } from "react";
import Logout from "../../components/logout";
import { AuthContext } from "../../context/authcontex";
const UserSettings = () => {
  const history = useHistory();
  const [changePassword, setChangePassword] = useState(false)
  const {logoutOut} = useContext(AuthContext)
  const [logout, setLogout] = useState(false);
  const cancleLogout = () => {setLogout(false)};



  return ( <>
   {logout && <Logout closeModal={cancleLogout} cb={logoutOut} />}
  {changePassword && <Password setChangePassword={setChangePassword} />}
   <Layout active={'settings'} />
   <div className="my-col-10 off-2">
    <div className="my-col-10 down-5">
      <div className="my-mother bd-bottom-bold"><h1><span className="pd-10 c-pointer" onClick={()=> {history.push('/dashboard')}}><i className="fas fa-arrow-left"></i></span> User Settings</h1></div>
      <div className="my-mother down-5">
        <div className=" bd-bottom my-mother c-pointer" onClick={() =>{setChangePassword(true)}}>
          <span className="faded"><i className="black fas px13 fa-lock pd-10"></i> Password Management</span>
        </div>
        <div className=" bd-bottom down-3 my-mother c-pointer">
          <span className="faded"><i className="black fas px13 fa-headphones pd-10"></i> Customer Service</span>
        </div>
        <div className=" bd-bottom down-3 my-mother c-pointer">
          <span className="faded"><i className="black fas px13 fa-trash-alt pd-10"></i> Delete Account</span>
        </div>
        <div className="down-10 my-mother c-pointer">
          <span className="pd-10 my-col-5 centered bg-color-code-1 white" onClick={()=>{setLogout(true)}}> Logout</span>
        </div>
      </div>
    </div>
   </div>
  </> );
}
 
export default UserSettings;