import React from "react";
import type { ButtonProps, InputProps } from "../types/Props";

const Input = ({ classNames, label, ...props }: InputProps) => {
  return (
    <>
      {label ? (
        <label htmlFor={props.id} className={classNames.inputLabel.join(" ")}>
          {label}
        </label>
      ) : null}
      <input {...props} className={classNames.inputElement.join(" ")} />
    </>
  );
};

export const TextInput = ({ ...props }: InputProps) => (
  <Input type="text" {...props} />
);

export const PasswordInput = ({ ...props }: InputProps) => (
  <Input type="password" {...props} />
);

export const Button = ({ buttonText, ...props }: ButtonProps) => (
  <button {...props}>{buttonText}</button>
);
