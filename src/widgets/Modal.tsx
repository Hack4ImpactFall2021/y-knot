import React from "react";
import "./Modal.css";

interface Props {
  title: string,
  content: string,
  onConfirm: VoidFunction,
  onCancel: VoidFunction,
}


export const Modal = React.forwardRef<any, Props>(({ title, content, onConfirm, onCancel }, ref) => {
  return (
    <div className="modal-wrapper" ref={ref}>
      <div className="modal">
        <h1>{title}</h1>
        <p>{content}</p>
        <div className="btn-wrappers">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="confirm-btn"onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
});