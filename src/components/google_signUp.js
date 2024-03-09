import {useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import useUtils from "../utils/useutils";
import useApi from "../hooks/useApi";
import { AiOutlineLoading } from "react-icons/ai";

const GoogleSignUp = () => {
   const { setToast } =  useUtils();
   const { makeRequest } = useApi();
   const [IsPending, setIsPending] = useState(false)

   const loginSignUpHandler = async (user) => {
      const cb =()=> {setIsPending(false)}
      setIsPending(true)
      const result = await makeRequest('post', 'user_auth/OAuth', user, cb);
      if(result?.message === 'done'){
         localStorage.setItem('LR_jwt', JSON.stringify(result))
         window.location = '/dashboard'
      }
   }

    const handleGoogleSignUp = async (res) => {
      if(res){
         const decode = jwtDecode(res?.credential);
         loginSignUpHandler({
            picture:decode?.picture,
            email:decode?.email, 
            firstname:decode?.family_name, 
            lastname:decode?.given_name
         });
      }else {
         setToast('Somethig went wrong')
      }
    }

    useEffect(() => {
      /* global google */ 
      if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
          google.accounts.id.initialize({
              client_id: process.env.REACT_APP_CLIENT_ID,
              callback: handleGoogleSignUp
          });
  
          const signUpDiv = document.getElementById('signUpDiv');
          if (signUpDiv) {
              google.accounts.id.renderButton(signUpDiv, { theme: "outline", size: "large" });
              signUpDiv.click();
          } else {
              console.error("Container element with ID 'signUpDiv' not found in the DOM.");
          }
      } else {
          console.error("Google Identity API not available.");
          setToast("something went wrong please refresh and try again")
      }
  
  }, []);


    return ( <>
    {IsPending &&  <div className="google-auth-modal">
      <div className="my-mother down-20 xs-down-40vh">
         <AiOutlineLoading className="fa fa-spin px30 color-code-1" />
      </div>
     </div>}
     <div className="my-mother" id="signUpDiv"></div>
    </> );
}
 
export default GoogleSignUp;