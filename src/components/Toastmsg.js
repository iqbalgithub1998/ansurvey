import React from "react";
import { Toast } from "react-bootstrap";
function Toastmsg({ show, time, closeToast, message, variant }) {
  return (
    <div>
      <Toast
        bg={variant.toLowerCase()}
        onClose={closeToast}
        show={show}
        delay={time ? time : 3000}
        autohide
      >
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </div>
  );
}

export default Toastmsg;
