import { Button, Tooltip } from "@mui/material";
import React, { useState } from "react";

interface ReusableTooltipButtonProps {
  text: string;
  className?: string;
  imagePath?: string;
  title: string;
}

function ReusableTooltipButton({ text, className, imagePath, title }: ReusableTooltipButtonProps) {
    const [open, setOpen] = useState(false);
  
    const handleTooltipToggle = () => {
      setOpen(!open); 
    };
  
    const handleTooltipClose = () => {
      setOpen(false); 
    };
  
    return (
      <Tooltip
        placement="right-end"
        PopperProps={{ disablePortal: true }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={title}
      >
        <button
          className={`menu-button ${className || ""} `}
          style={{
            backgroundColor:"#181A19",
            backgroundImage: `url(${imagePath})`,
            backgroundSize: "contain",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "75px",
            // height: "50",
            padding: "0px",
            fontSize: "12px",
            
          }}
          aria-label={title}
          onClick={handleTooltipToggle} 
        >
          {text}
        </button>
      </Tooltip>
    );
  }

export default ReusableTooltipButton;
