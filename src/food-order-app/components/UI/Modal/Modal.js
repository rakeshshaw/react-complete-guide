import ReactDOM from "react-dom";
import { Fragment } from "react";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// Bwe can create ackdrop and ModalOverlay in seperate component as well
// we'll be using react portal feature to render it above the main body

const portalElement = document.getElementById("overlays");
// using React portal feature
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.onBackdropClick} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

// Without React portal but in that case the overlay code will be part of body in the rendered html
// const Modal = (props) => {
//   return (
//     <Fragment>
//       <Backdrop />
//       <ModalOverlay>{props.children}</ModalOverlay>
//     </Fragment>
//   );
// };

export default Modal;
