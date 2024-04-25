import React from "react";

interface ReusableMenuButtonProps {
  text: string;
  className?: string;
  isSelected?: boolean;
  imagePath: string;
}

function ReusableMenuButton({ text, className, isSelected, imagePath }: ReusableMenuButtonProps) {
    const selectedClass = isSelected ? 'selected' : '';
    return (
        <button 
            className={`menu-button ${className || ''} ${selectedClass}`}
            style={{ backgroundImage: `url(${imagePath})` }} 
        >
            {text}
        </button>
    );
};

export default ReusableMenuButton;
