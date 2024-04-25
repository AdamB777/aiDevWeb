import { TextField } from "@mui/material";
import { useField } from "formik";
import { useEffect } from "react";
import InputFrame from "../assets/icons/input_frame.png";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  value?: string;
  inputFrame:string
}

function ReusableFormikInput({ placeholder, name, label, className, disabled, value,inputFrame }: Props) {
  const [field, meta, helpers] = useField(name);
  useEffect(() => {
    if (value !== undefined) {
      helpers.setValue(value);
    }
  }, [value, helpers]);
  return (
    <div
      style={{
        backgroundImage: `url(${inputFrame})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "200px",
        color:"red",
        border:"none"
      }}>
<TextField
  {...field}
  className={`${className}`}
  size='small'
  label={label}
  variant='outlined'
  error={meta.touched && !!meta.error}
  helperText={meta.touched && meta.error ? meta.error : ""}
  placeholder={placeholder}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none', 
      },
      '&:hover fieldset': {
        border: 'none', 
      },
      '&.Mui-focused fieldset': {
        border: 'none', 
      },
    },
    '& .MuiInputBase-input': {
      color:"#E8AB74",
      fontSize: '14px', 
      fontFamily:"Rye",
      textAlign:"center",
      backgroundColor: 'transparent', // Makes the background transparent
    },
  }}
/>


    </div>
  );
}

export default ReusableFormikInput;
