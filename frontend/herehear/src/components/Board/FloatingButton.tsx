import React from "react";
import { FiPlus } from "react-icons/fi";

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-16 h-16 text-white rounded-full p-4 shadow-lg flex items-center justify-center" 
      style={{ backgroundColor: "#ff4a4d" }}
    >
      <FiPlus size={24} />
    </button>
  );
};

export default FloatingButton;
