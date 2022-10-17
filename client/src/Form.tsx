import React, { useState } from "react";
import { TextInput, PasswordInput, Button } from "./common/Inputs";
import { classNames } from "./App";
import type { FormEvent, ChangeEvent } from "react";
import type { FormProps } from "./types/Props";
import type { FormData } from "./types/Misc";

export const Form = ({ ...props }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: encodeURIComponent(formData.username),
        password: encodeURIComponent(formData.password),
      }),
    })
      .then((res) => {
        setFormData({ username: "", password: "" });
        res
          .json()
          .then((data) => /* do something with the data */ console.log(data));
      })
      .catch(console.error);
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) =>
    evt.target.id === "username" || evt.target.id === "password"
      ? setFormData({ ...formData, [evt.target.id]: evt.target.value })
      : null;

  return (
    <form id="form" method="POST" action="#" onSubmit={handleSubmit} {...props}>
      <fieldset className="mx-2 p-2 grid grid-rows-3 max-w-md rounded-md border border-black">
        <legend className="px-1">Login</legend>
        <TextInput
          id="username"
          label="Username"
          placeholder="Enter username"
          classNames={classNames}
          value={formData.username}
          onChange={handleChange}
        />
        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter password"
          classNames={classNames}
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          id="login"
          buttonText="Login"
          className={classNames.loginButton.join(" ")}
        />
      </fieldset>
    </form>
  );
};
