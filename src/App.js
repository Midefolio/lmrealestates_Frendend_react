import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Propeties from "./pages/properties";
import SignUpToSell from "./pages/signuptosell";
import { AiOutlineLoading } from "react-icons/ai";
import VerifyEmail from "./pages/veriy_email";
import Login from "./pages/login";
import Dashboard from "./pages/user_dashboard/dashboard";
import Post from "./pages/user_dashboard/post_property";
import AuthContextProvider from "./context/authcontex";
import UtilsContextProvider from "./context/utilsContext";
import UserProperties from "./pages/user_dashboard/user_properties";
import UserSettings from "./pages/user_dashboard/user_settings";
import UserContextProvider from "./context/userContext";
import AllProperties from "./pages/user_dashboard/all_properties";
import PropertyDetails from "./pages/user_dashboard/see_property-details";
const App = () => {
return (
 <>
 <div className="google-auth-modal my-d-none" id="isSending">
      <div className="my-mother down-20 xs-down-40vh">
         <AiOutlineLoading className="fa fa-spin px30 color-code-1" />
      </div>
     </div>
   <div className="my-toast" id="my-toast">
    <div className="xs-container my-col-10">
      <div className="xs-12 pdl-10 down-1"><span id="msg" className="xs-px13"></span></div>
    </div>
   </div>
 
 <Router>
   <Switch>

      <UserContextProvider>
       <UtilsContextProvider>
        <Route path="/">
          <Route path="/" exact  component={Home} />
          <Route path="/signup"  component={SignUpToSell} />
          <Route path="/properties/:category"  component={Propeties} />
          <Route path="/verifyemail/:token"  component={VerifyEmail} />

          <AuthContextProvider>
            <Route path="/login"  component={Login} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/dashboard/post"  component={Post} /> 
            <Route path="/dashboard/properties/:status" component={UserProperties} /> 
            <Route path="/dashboard/settings" component={UserSettings} /> 
            <Route path="/dashboard/properties" component={AllProperties} /> 
            <Route path="/dashboard/property/:id" component={PropertyDetails} /> 
          </AuthContextProvider>
          
      </Route>
      </UtilsContextProvider>
      </UserContextProvider>
   </Switch>
 </Router> 



 </>
);
}

 
export default App;
