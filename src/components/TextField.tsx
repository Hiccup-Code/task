import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import React from "react";
import { useIMask } from "react-imask";

const getMaskOptions = (mask?: string) => {
  if (!mask) return { mask: String };
  switch (mask) {
    case "currency":
      return {
        mask: Number,
        thousandsSeparator: " ",
        scale: 2,
        padFractionalZeros: true,
        signed: false,
      };
    case "number":
      return {
        mask: Number,
      };
    default:
      return { mask };
  }
};

export type TextFieldProps = {
  mask?: string;
} & MuiTextFieldProps;

const TextField = ({
  mask,
  value,
  onChange,
  ...otherProps
}: TextFieldProps) => {
  const iMask = useIMask(getMaskOptions(mask));

  React.useEffect(() => {
    if (value !== iMask.unmaskedValue) {
      iMask.setValue(value as string);
    }
  }, [value]);

  const handleChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    iMask.setValue(e.target.value);
    if (onChange)
      onChange({ ...e, target: { ...e.target, value: iMask.unmaskedValue } });
  };

  return (
    <MuiTextField
      {...otherProps}
      inputRef={iMask.ref}
      value={iMask.value}
      onChange={handleChange}
    />
  );
};

export default TextField;
