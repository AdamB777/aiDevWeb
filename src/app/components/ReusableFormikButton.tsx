import { Button } from '@mui/material';
import React, { ReactNode } from 'react'

interface ReusableFormikButtonProps {
    className?: string;
    imagePath: string;
    children?: ReactNode; 
  }

function ReusableFormikButton({ children, className, imagePath }: ReusableFormikButtonProps) {
  return (
    <Button 
    className={`menu-button ${className || ''} `}
    style={{ backgroundImage: `url(${imagePath})`, color:"#E8AB74", fontFamily:"Rye", backgroundSize:"contain", width:"100px", border:"none", borderRadius:"20px" }} 
    type='submit'
>
    {children}
</Button>
  )
}

export default ReusableFormikButton