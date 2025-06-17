import React, { useState } from "react";
import "./App.css"; // Optional: for layout styling

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const calculate = () => {
    if (input.trim() === "") {
      setResult("Error");
      return;
    }

    try {
      // eslint-disable-next-line no-eval
      const evaluated = eval(input);
      setResult(evaluated.toString());
    } catch (e) {
      setResult("Error"+e);
    }
  };

  const clearAll = () => {
    setInput("");
    setResult("");
  };

  const buttonValues = [
    "7",
    "8",
    "9",
    "+",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "*",
    "0",
    "C",
    "=",
    "/",
  ];

  return (
    <div
      className="calculator-container"
      style={{ textAlign: "center", marginTop: "40px" }}
    >
      <input
        type="text"
        value={input}
        readOnly
        style={{
          fontSize: "20px",
          padding: "10px",
          width: "80%",
          marginBottom: "20px",
        }}
      />

      <div
        className="buttons"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          maxWidth: "300px",
          margin: "0 auto",
        }}
      >
        {buttonValues.map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === "=") calculate();
              else if (btn === "C") clearAll();
              else handleClick(btn);
            }}
            style={{
              padding: "15px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            {btn}
          </button>
        ))}
      </div>

      <div
        className="result-display"
        style={{
          marginTop: "25px",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        {result}
      </div>
    </div>
  );
}

export default App;
