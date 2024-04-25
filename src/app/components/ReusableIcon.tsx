import React from "react";

interface ReusableIconProps {
  imagePath: string;
  className?: string;
  isSelected?: boolean; 
}

function ReusableIcon({ imagePath, className,isSelected }: ReusableIconProps) {
    const selectedClass = isSelected ? 'selected' : '';
  return (
    <img src={imagePath} className={`${className || ''} ${selectedClass}`} alt="Custom Icon" />
  );
};

export default ReusableIcon;
