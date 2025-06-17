// import React, { useState } from "react";

// function App() {
//   const [count, setCount] = useState(0);

//   const increment = () => setCount((prev) => prev + 1);
//   const decrement = () => setCount((prev) => prev - 1);

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//     </div>
//   );
// }

// export default App;


//calc
import React, { useState } from "react";

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setExpression((prev) => prev + value);
  };

  const handleEqual = () => {
    if (expression.trim() === "") {
      setResult("Error");
      return;
    }

    try {
      // eslint-disable-next-line no-eval
      const evalResult = eval(expression);
      setResult(evalResult.toString());
    } catch {
      setResult("Error");
    }
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <input
        type="text"
        value={expression}
        readOnly
        style={{ fontSize: "20px", width: "80%", marginBottom: "20px" }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          width: "300px",
          margin: "auto",
        }}
      >
        {[
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
        ].map((btn) => (
          <button
            key={btn}
            onClick={() =>
              btn === "="
                ? handleEqual()
                : btn === "C"
                ? handleClear()
                : handleClick(btn)
            }
            style={{ padding: "15px", fontSize: "18px" }}
          >
            {btn}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "20px", fontSize: "22px" }}>{result}</div>
    </div>
  );
}

export default App;
