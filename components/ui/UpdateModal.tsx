"use client";
import React, { ReactNode } from "react";

interface ModalProps {
  onClose: () => void; // Function to close the modal
  children: ReactNode; // Dynamically passed content, like forms
}

// Reusable modal component
export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg max-w-md w-full relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Modal content */}
        {children}
      </div>
    </div>
  );
};
