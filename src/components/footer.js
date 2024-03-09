import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Footer = () => {
 const history = useHistory();
 return ( <>
 <div className="mother">
  <div className="my-col-3 xs-12">
   <div className="my-container">
   <div><span className="bold upper-case">L-Mobile Ltd</span></div>
   <div className="px13 black mother down-5 xs-down-3">Kwara state Nigeria</div>
   <div className="px13 black mother down-2 xs-down-2">Nigeria</div>
   <div className="px13 black mother down-2 xs-down-2 bold">( +234 ) 813 7242 631</div>
   </div>
  </div>
  <div className="my-col-3 xs-12 xs-down-10">
   <div className="my-container">
   <div><span className="bold">Top Categories</span></div>
   <div className="px13 black mother down-5 xs-down-5 pd-5 c-pointer">Groceries</div>
   <div className="px13 black mother xs-down-2  pd-5 c-pointer">Health Care</div>
   <div className="px13 black mother xs-down-2  pd-5 c-pointer">Real-Eastes</div>
   </div>
  </div>
  <div className="my-col-3 xs-12 xs-down-7">
   <div className="my-container">
   <div><span className="bold">Terms Of Service</span></div>
   <div className="px13 black mother down-5 xs-down-5 c-pointer" onClick={()=> {history.push('/general/terms')}}>Terms and Conditions</div>
   </div>
  </div>
  <div className="my-col-3 xs-12 xs-down-8">
   <div className="my-container">
   <div><span className="bold">Socials</span></div>
   <div className="px13 black mother down-5 xs-down-5 c-pointer">
    <a href="https://instagram.com/l_mobilestores?igshid=OGY3MTU3OGY1Mw=="> <i className="pd-10 bg-color-code-1 white rad-10 fab fa-instagram"></i></a>
    <a href="https://www.facebook.com/profile.php?id=61551622062567"> <i className="pd-10 bg-color-code-1 fab white  rad-10 fa-facebook"></i></a>
   </div>
   </div>
  </div>
  <div className="centered mother down-3 xs-down-8 my-bottom-50">@ l-mobile 2023 </div>
 </div>
 </> );
}
 
export default Footer;