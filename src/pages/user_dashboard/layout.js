import {AiOutlineBell, AiOutlineHome, AiOutlinePlus, AiOutlineSetting } from "react-icons/ai";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Isloading from "../../components/isloading";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authcontex";
import useApi from "../../hooks/useApi";

const Layout = ({active}) => {
  const { isloading, error, getUser } = useContext(AuthContext);
  const history = useHistory();
  const { makeRequest } = useApi();
  const token = JSON.parse(localStorage.getItem('LR_jwt'));

  const checker = async () => {
    const res = await makeRequest('get', 'users/auc', null, null, token?.jwt);
  }
 
  useEffect(() => {
    checker()
  }, [])

  return ( <>
   {isloading && <Isloading error={error} getUser={getUser} token={token}  />}
    <div className="side-bar hidden-xs">
      <div className="my-col-10 off-1 dow-60">
        <span className={`side-bar-icons ${active === 'home' && 'black fas fa-shake'} `}  onClick={()=> {history.push('/dashboard')}}><AiOutlineHome/></span>
        <span className={`side-bar-icons ${active === 'post' && 'black fas fa-shake'} `} onClick={()=> {history.push('/dashboard/post')}}><AiOutlinePlus/></span>
        <span className={`side-bar-icons ${active === 'settings' && 'black fas fa-spin'} `} onClick={()=> {history.push('/dashboard/settings')}}><AiOutlineSetting/></span>
        <span className={`side-bar-icons ${active === 'notification' && 'black'} `}><AiOutlineBell/></span>
      </div>
    </div>

   <div className="mobile-nav bg-white hidden-ls">
    <div className="xs-container xs-down-4">
     <div className="xs-6">
      <div className="xs-4"> <span className="rad-50 pd-10 bg-faded hidden-ls"> <i className="fas xs-px13 fa-user"></i></span></div>
        <div className="xs-6 xs-down-2">
          <h1 className="color-code-1"><span className=''>L-</span><b>Mobile</b> </h1>
          <div className="xs-top-15"><span className={`px10`}>does it better...</span></div>
       </div>
     </div>
      <span className="nav-links xs-down-1"  onClick={()=>{history.push('/dashboard/post')}}>SELL</span>
    </div>
   </div>


  <div className="mobile-bottom-nav bg-white hidden-ls">
    <div className="xs-container">
      <div className={`xs-3 px30  centered ${active === 'home' ? 'color-code-1' : 'faded'}`}  onClick={()=>{history.push('/dashboard')}}><AiOutlineHome/></div>
      <div className={`xs-3 px30  centered ${active === 'post' ? 'color-code-1' : 'faded'}`}  onClick={()=>{history.push('/dashboard/post')}}><AiOutlinePlus/></div>
      <div className={`xs-3 px30  centered ${active === 'settings' ? 'color-code-1' : 'faded'}`}><AiOutlineSetting/></div>
      <div className={`xs-3 px30  centered ${active === 'notification' ? 'color-code-1' : 'faded'}`}><AiOutlineBell/></div>
    </div>
  </div>
  </> );
}
 
export default Layout;