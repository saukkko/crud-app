import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";

export type ClassNames = {
  inputElement: InputClassNames;
  inputLabel: InputLabelClassNames;
  loginButton: LoginButtonClassNames;
};

type InputClassNames = InputHTMLAttributes<HTMLInputElement>["className"][];
type InputLabelClassNames =
  LabelHTMLAttributes<HTMLLabelElement>["className"][];
type LoginButtonClassNames =
  ButtonHTMLAttributes<HTMLButtonElement>["className"][];
