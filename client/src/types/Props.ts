import {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  InputHTMLAttributes,
} from "react";
import type { ClassNames } from "./ClassNames";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  classNames: ClassNames;
};

export type FormProps = FormHTMLAttributes<HTMLFormElement>;
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonText: string;
};
