import { TextField } from "@mui/material";
import { useField } from "formik";
import { useEffect } from "react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  value?: string;
}

function ReusableFormikInput({ placeholder, name, label, className, disabled,value }: Props) {
  const [field, meta,helpers] = useField(name);
  useEffect(() => {
    if (value !== undefined) {
      helpers.setValue(value);
    }
  }, [value, helpers]);
  return (
    <TextField
    {...field}
      className={`${className}`}
      size='small'
      label={label}
      variant='outlined'
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error ? meta.error : ""}
      disabled= {disabled}
      placeholder={placeholder}
    />
  );
}

export default ReusableFormikInput;
