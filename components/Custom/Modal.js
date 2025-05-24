import React from "react";
import "./Modal.css";
/* Reference from Assignment 2 */
function Modal({
  heading,
  content,
  closeModal,
  primaryLabel,
  secondaryLabel,
  showSecondary,
  secondaryOperation,
}) {
  return (
    <div>
      <div className="modal_wrapper"></div>
      <div className="modal_content">
        <h3 className="modal_heading">{heading}</h3>
        <hr />

        <p className="modal_paragraph">{content}</p>
        <div className="button_container">
          <button className="close_button" onClick={closeModal}>
            {primaryLabel}
          </button>
          {showSecondary && (
            <button className="close_button" onClick={secondaryOperation}>
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
