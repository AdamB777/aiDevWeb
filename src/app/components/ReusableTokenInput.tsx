import React from "react";

interface ReusableTokenInputProps {
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  imagePath: string;
}

function ReusableTokenInput({ label, value, onChange, className, imagePath }: ReusableTokenInputProps) {
  return (
    <div
      className={`token-input-container ${className || ""}`}
      style={{ backgroundImage: `url(${imagePath})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", height: 40, }}>
      <label className='token-input-label'>{label}</label>
      <input
        type='text'
        value={`Token:   ${value}`} 
        onChange={onChange}
        className='token-input'
        style={{ fontFamily: "Rye", color: "#E8AB74", backgroundColor: "transparent", textAlign: "center", fontSize:"12px", paddingTop:"9px",paddingLeft:"115px",border:"none" }}
      />
    </div>
  );
}

export default ReusableTokenInput;
