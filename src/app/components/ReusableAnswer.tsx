import React from 'react'

interface ReusableAnswerProps {
    label?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    imagePath: string;
  }

  function ReusableAnswer({ label, value, onChange, className, imagePath }: ReusableAnswerProps) {
    return (
      <div
        className={` ${className || ""}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${imagePath})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "400px",
          height: "400px"
        }}
      >
        <input
          type='text'
          value={value}
          onChange={onChange}
          style={{
            fontFamily: "Rye",
            color: "#E8AB74",
            backgroundColor: "transparent",
            border: "none",
            textAlign: "center",
            fontSize: "18px",
            paddingBottom:"150px"
          }}
        />
      </div>
    );
  }

export default ReusableAnswer