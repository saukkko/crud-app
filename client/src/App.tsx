import React from "react";
import { MouseEvent } from "react";
export const App = () => {
  return (
    <>
      <h1>sladfkjsadf</h1>
      <div className="btn">
        <Btn />
      </div>
    </>
  );
};

const handleClick = async (ev: MouseEvent<HTMLInputElement>) => {
  const text = await (await fetch("/api/hello")).text();

  console.log(text);
};

const Btn = () => (
  <input type="button" onClick={handleClick} value="sdklfjhsdkj" />
);
