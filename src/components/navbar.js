import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = ({color, bg}) => {
  const history = useHistory();
  return ( <>
  <nav className={`${bg} hidden-xs`}>
    <div className ="logo"></div>
    <div className="my-col-10 off-1">
      <span className={`${color} nav-links`}>Categories</span>
      <span className={`${color} nav-links`}>Terms</span>
      <span className={`${color} nav-links`}>Login</span>
      <span className={`${color} nav-links`} onClick={()=> {history.push('/signup')}}>SELL</span>
    </div>
  </nav>



  <div className={`${bg} mobile-nav hidden-ls`}>
    <div className="xs-container xs-down-4">
     <div className="xs-6">
      <div className="xs-4 xs-down-3"> <i className={`${color} px30 fas fa-bars`}></i></div>
        <div className="xs-6 xs-down-2">
          <h1 className="color-code-1"><span className={color}>L-</span><b>Mobile</b> </h1>
          <div className="xs-top-15"><span className={`px10 ${color}`}>does it better...</span></div>
       </div>
     </div>
      <span className="nav-links xs-down-1"  onClick={()=> {history.push('/signup')}}>SELL</span>
    </div>
  </div>
  </> );
}
 
export default NavBar;