import React from "react";
import { PopupProps } from "../types";

const Popup: React.FC<PopupProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <p className="popup-message">{message}</p>
        <div className="popup-buttons">
          <button onClick={onCancel} className="popup-button popup-cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="popup-button popup-confirm">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
