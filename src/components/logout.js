import { Zoom } from "react-reveal";

const Logout = ({cb, closeModal}) => {
  return ( <>
    <div className="my-modal">
  <Zoom>
      <div className="my-col-4 xs-container xs-down-20vh xs-off- bg-white rad-10 my-bottom-50 off-4 down-10">
        <div className="my-col-10 off-1 xs-10 xs-off-1 xs-down-10 down-4">
          <div><h1 className="bold">Logout </h1></div>
          <div className="xs-12 xs-down-3">Are you sure you want to logout ?</div>
          <div className="my-mother down-5 xs-down-5">
            <span className="anchors bg-color-code-2 color-code-1" onClick={closeModal}>Cancel</span>
            <span className="anchors bg-color-code-1 white mg-10" onClick={cb}>Yes</span>
          </div>
        </div>
      </div>
    </Zoom>
    </div>
  </> );
}
 
export default Logout;