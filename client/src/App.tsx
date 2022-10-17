import React, { useState } from "react";
import { Form } from "./Form";
import type { ClassNames } from "./types/ClassNames";

export const classNames: ClassNames = {
  inputElement: ["text-sm rounded"],
  inputLabel: ["text-md my-2 opacity-80"],
  loginButton: [
    "my-2",
    "p-2",
    "rounded-full",
    "bg-slate-700/70",
    "hover:bg-slate-700/80",
    "outline-1",
    "active:outline",
    "active:ring",
  ],
};

const TestComponent = () => {
  const [data, setData] = useState<string>("");

  const fetchData = async () => {
    const x = await fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.text())
      .then((x) => x);
    setData(x);
  };

  const handleClick = () => fetchData();

  return (
    <>
      <button
        onClick={handleClick}
        className="rounded-full ml-2 py-1 px-5 bg-indigo-700/80 hover:bg-indigo-700/90 outline-1 active:outline active:ring"
      >
        Load data
      </button>
      <pre>{data}</pre>
    </>
  );
};

export const App = () => {
  return (
    <div className="container-md mx-auto my-2">
      <h1 className="m-1 p-1 text-xl uppercase font-bold">otsikko</h1>
      <div>
        <TestComponent />
      </div>
      <Form />
    </div>
  );
};
