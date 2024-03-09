import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useApi from "../../hooks/useApi";
import Layout from "./layout";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authcontex";
import useUtils from "../../utils/useutils";
import CatSkeleton from "../../components/skeleton/catSeleton";
import { GiEmptyMetalBucketHandle } from "react-icons/gi";
import ViewProperties from "./view_single_ppt";
import { UserContext } from "../../context/userContext";

const UserProperties = () => {
 const { status } = useParams();
 const [properties, setProperties] = useState(null);
 const {token, path} = useContext(AuthContext); 
 const {currentUser} = useContext(UserContext)
 const { makeRequest } = useApi();
 const { formatNumber, formatTransactionTime } = useUtils();
 const history = useHistory();
 const [viewPpt, setViewPpt] = useState(null)
 const abortController = useRef(new AbortController)


 const getProperties = async () => {
   let url;
   if(status === 'active'){
     url = 'users/active_prop';
    }else if(status === 'pending'){
      url = 'users/pending_prop'
    }else if(status === 'declined'){
      url = 'users/declined_prop'
    }
    
  setProperties(null);
  const res = await makeRequest('post', url, {user_id: currentUser?._id}, null, token?.jwt, abortController);
  if(res?.message === 'done') {
    setProperties(res?.properties)
  }
 }

 useEffect(() => {
    if(currentUser){
      getProperties();
    }
 }, [currentUser])
  

  return ( <>
    <Layout active={'properties'}/>
    {properties?.map((i) => (
      viewPpt === i?._id && <ViewProperties getProperties={getProperties} i={i} setViewPpt={setViewPpt} />
    ))}
    <div className="my-col-10 off-2 xs-container xs-down-20 my-bottom-50">
      <div className="my-col-10 down-5 xs-12 xs-down-5">
        <div className="my-mother bd-bottom-bold">
          {status === 'active' && <h1 className="bold">  <span className="pd-10 c-pointer" onClick={()=> {history.push('/dashboard')}}><i className="fas fa-arrow-left"></i></span>   Active Properties</h1> }
          {status === 'pending' && <h1 className="bold"> <span className="pd-10 c-pointer" onClick={()=> {history.push('/dashboard')}}><i className="fas fa-arrow-left"></i></span> Properties Under Review</h1> }
          {status === 'declined' && <h1 className="bold"> <span className="pd-10 c-pointer" onClick={()=> {history.push('/dashboard')}}><i className="fas fa-arrow-left"></i></span> Rejected Properties</h1> }
        </div>
        {/* <div className="my-mother down-3"><span className="faded">Properties under review</span></div> */}
         <div className="my-mother down-2 xs-down-5">
          <span onClick={()=>{history.push('/dashboard/properties/active')}} className={`anchors px13 black mg-5 ${status === 'active'?'bg-color-code-1 white':'bg-faded black'} `}>Active</span>
          <span onClick={()=>{history.push('/dashboard/properties/pending')}} className={`anchors px13 black mg-5 ${status === 'pending'?'bg-color-code-1 white':'bg-faded black'} `}>Reviewing</span>
          <span onClick={()=>{history.push('/dashboard/properties/declined')}} className={`anchors px13 black mg-5 ${status === 'declined'?'bg-color-code-1 white':'bg-faded black'} `}>Declined</span>
         </div>

         {!properties && <div className="my-mother down-3 xs-down-5"><CatSkeleton slideToShow={3} /></div>}
        <div className="my-mother down-1 xs-down-5">
          {properties && <>
           {properties?.map((i, index) =>(
              <div className="my-col-3 xs-12 xs-down-2 down-4" key={i._id}>
                <div className="my-container my-bottom-10 my-b-shadow bg-white" onClick={() => {setViewPpt(i.status !== 'pending' && i._id)}}>
                 <div className="my-col-12 xs-container">
                  <div className="my-col-10 xs-4 xs-down-3 off-1 down-5"><div className="ppt-img-container"><img  src={path + i.images[0]} alt="" loading="lazy"  /></div></div>
                    <div className="my-col-10 xs-8 off-1 down-5">
                     <div className="my-col-12 xs-container xs-down-10">
                      <div><span className="black bold px13"> ₦ {formatNumber(i.price.first_year)}</span></div>
                        <div><span className="faded">{i.title.slice(0, 10) + '...'}</span></div>
                        <div className="my-mother down-3 xs-down-3"><span className="pd-5 bg-color-code-2 color-code-1 px10">Reviewing</span></div>
                        <div className="my-mother down-5 xs-down-2 right faded px10">{formatTransactionTime(i.createdAt, new Date)}</div>
                     </div>
                    </div>
                 </div>
                </div>
              </div>
           ))}
          </>}

          {properties?.length === 0 && <>
            <div className="my-mother down-15 xs-down-20 centered">
              <div className="page-icon"><GiEmptyMetalBucketHandle className="px100 faded" /></div>
              <div className="my-mother down-1"><span className="faded">No properties in this category</span></div>
            </div>
          </>}
        </div>
      </div>
    </div>
   

  </> );
}
 
export default UserProperties;