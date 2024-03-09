import { useState } from "react";
import PageNav from "./pagenav";
import useApi from "../hooks/useApi";
import { AiOutlineLoading } from "react-icons/ai";
import { useEffect } from "react";
import parse from 'react-html-parser';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const GeneralTerms = () => {
  const {requestMaker} = useApi();
  const [terms, setTerms] = useState(); 
  const [isPending, setPending] = useState();
  const history = useHistory();

  const getTerms = async() => {
    setPending(true);
    const params = {action:"getTerms"};
    const res = await requestMaker('frontend/terms', params);
    if(res?.status === 'successful'){
      setTerms(res?.data);
      setPending(false);
    }
  }

  useEffect(() => {
    getTerms();
  }, [])

  return ( <>
  <div className="mother"><PageNav/></div>
  <div className="my-col-10 xs-10 xs-off-1 down-10 off-1 xs-down-10vh">
    <div className="mother bd-bottom-bold xs-down-4"><span className="bold upper-case">Terms and Conditions</span></div>
    {isPending && <div className="mother down-5 xs-down-10"><AiOutlineLoading className="fas fa-spin" /></div>}
    <div className="mother down-2 xs-down-10 monR"><span className="px13" >{parse(terms?.general_terms)}</span></div>
  </div>
  </> );
}

 
export default GeneralTerms;