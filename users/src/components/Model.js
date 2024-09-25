import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
