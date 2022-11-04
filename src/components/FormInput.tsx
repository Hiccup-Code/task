import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField, { TextFieldProps } from "./TextField";

type IFormInputProps = {
  name: string;
} & TextFieldProps;

const FormInput: FC<IFormInputProps> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, ...field } }) => {
        const handleChange: React.ChangeEventHandler<
          HTMLTextAreaElement | HTMLInputElement
        > = (e) => {
          field.onChange(
            otherProps.mask === "currency"
              ? {
                  ...e,
                  target: { ...e.target, value: parseFloat(e.target.value) },
                }
              : e
          );
        };
        return (
          <TextField
            {...otherProps}
            {...field}
            onChange={handleChange}
            value={`${field.value || ""}`}
            error={!!errors[name]}
            helperText={`${errors[name]?.message || ""}`}
          />
        );
      }}
    />
  );
};

export default FormInput;
