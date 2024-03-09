const SearchComponent = () => {
    return ( <>
     <div className="my-mother">
       <div className="my-col-4 xs-12 off- xs-down-10 ">
        <form className="xs-container" >
          <div className="search-con">
           <input type="text"  className='monR px13 black' placeholder='Search for Properties'/>
           <span  className="c-pointer"><i className="fas fa-search" ></i></span>
         </div>
        </form>
        </div>
        <div className="col-8">
          <div className="col-11 off-1">
            <div className="my-col-3">
              <select name="" className="input bg-faded  rad-10 px13 monR" id=""></select>
            </div>
          </div>
        </div>
     </div>
    
    </> );
}
 
export default SearchComponent;