import { useParams } from "react-router-dom";
import NavBar from "../components/navbar";
import CatSkeleton from "../components/skeleton/catSeleton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Propeties = () => {
 const {category} = useParams();
 const history = useHistory(); 

  return ( <>
  <NavBar color={'black'} bg={'bg-white'} />
  <div className="my-col-10 off-1 xs-container down-10">
    <div className="my-mother xs-down-8">
     <div className="my-col-5"><span className="monR faded">Trending Properties <i className="fas faded fa-angle-double-down mg-5 pd-10"></i> </span></div>
     <div className="my-col-4 off-3">
     </div>
    </div>
    <div className="my-mother down-3 xs-down-3"><CatSkeleton slideToShow={4} /></div>
    <div className="my-mother down-3 xs-down-5">
      <span onClick={()=>{history.push('/properties/Lands')}} className={`anchors rad-10 px13 mg-10 ${category === 'Lands'? 'bg-color-code-1 white':'faded bg-faded'}`}>Lands</span>
      <span onClick={()=>{history.push('/properties/Homes')}} className={`anchors px13 mg-10 ${category === 'Homes'? 'bg-color-code-1 white' : 'faded bg-faded'}`}>Homes</span>
      <span onClick={()=>{history.push('/properties/Hostels')}} className={`anchors px13 mg-10 ${category === 'Hostels'? 'bg-color-code-1 white':'faded bg-faded'}`}>Hostels</span>
      <span onClick={()=>{history.push('/properties/Shops&Hall')}} className={`anchors px13 mg-10 ${category === 'Shops&Hall'? 'bg-color-code-1 white':'faded bg-faded'}`}>Shops</span>
    </div>
  </div>
  <div className="my-col-10 off-1 xs-container down-3 xs-down-8">
  <div className="my-mother">
     <div className="my-col-5 xs-4 xs-down-2"><span className="monR faded">Available {category} <i className="fas hidden-xs faded fa-angle-double-down mg-5 pd-10"></i> </span></div>
     <div className="my-col-4 off-3 xs-8">
      <form className="xs-container" >
       <div className="search-con unset-shadow">
         <input type="text"  className='monR px13 black bg-faded' placeholder='Search for Properties'/>
          <span  className="c-pointer"><i className="fas fa-search" ></i></span>
        </div>
      </form>
     </div>
     <div className="my-mother down-3 xs-down-5"><CatSkeleton slideToShow={4} /></div>
    </div>
    <div className="my-mother centered my-bottom-50 down-5 xs-down-10"><span className="px13 pd-10 bg-color-code-2 rad-10 monR">Fetch more properties <i className="fas fa-refresh mg-10"></i>  </span></div>
  </div>
  </> );
}
 
export default Propeties;