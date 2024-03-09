import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../components/navbar";
import Snow from "react-snowfall";
import SearchComponent from "./user_dashboard/search_and_filter";

const Home = () => {
 const history = useHistory();
//  const settings = {
//   dots: false,
//   fade: false,
//   arrows: false,
//   infinite: false,
//   speed: 1000,
//   autoplay: true,
//   autoplaySpeed: 7000,
//   pauseOnHover: true, // prevent pausing on hover
//   slidesToShow: 1,
//   slidesToScroll: 1
//  };

 return ( 
  <>
   <NavBar color={'white'} />
   <div className="bg-landing">
    <div className="dark-scarf">
    <Snow snowflakeCount={20} />
     <div className="my-col-8 off-2 xs-let centered xs-container monR xs-down-15 down-8" >
     <div className="my-mother down-1"><span className="px50 xs-px30 bold white oxygenB">Rent Or Buy Your Dream Property In Your Desired Location</span></div>
    </div>
    </div>
   </div>
   <div className="my-col-10 off-1 down-5">
    {/* <SearchComponent/> */}
   </div>




   
  </>
 );
}
export default Home;