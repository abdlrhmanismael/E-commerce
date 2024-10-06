import React, { useState } from "react";

function Test() {
  const [numOne, setNumOne] = useState(1);
  const [numTwo, setNumTwo] = useState(2);
  function plusone() {
    setNumOne((prev) => prev + 1);
    console.log(numOne);
  }
  function plustwo() {
    setNumTwo((prev) => prev + 1);
    console.log(numTwo);
  }
  return (
    <>
      <h1 onClick={() => plusone()} className="text-black">
        {numOne}
      </h1>
      <h1 onClick={() => plustwo()} className="text-black">
        {numTwo}
      </h1>
    </>
  );
}

export default Test;
