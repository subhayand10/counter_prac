//calc

// import React, { useState } from "react";
// import "./App.css"; // Optional: for layout styling

// function App() {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState("");

//   const handleClick = (value) => {
//     setInput((prev) => prev + value);
//   };

//   const calculate = () => {
//     if (input.trim() === "") {
//       setResult("Error");
//       return;
//     }

//     try {
//       // eslint-disable-next-line no-eval
//       const evaluated = eval(input);
//       setResult(evaluated.toString());
//     } catch (e) {
//       setResult("Error"+e);
//     }
//   };

//   const clearAll = () => {
//     setInput("");
//     setResult("");
//   };

//   const buttonValues = [
//     "7",
//     "8",
//     "9",
//     "+",
//     "4",
//     "5",
//     "6",
//     "-",
//     "1",
//     "2",
//     "3",
//     "*",
//     "0",
//     "C",
//     "=",
//     "/",
//   ];

//   return (
//     <div
//       className="calculator-container"
//       style={{ textAlign: "center", marginTop: "40px" }}
//     >
//       <input
//         type="text"
//         value={input}
//         readOnly
//         style={{
//           fontSize: "20px",
//           padding: "10px",
//           width: "80%",
//           marginBottom: "20px",
//         }}
//       />

//       <div
//         className="buttons"
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(4, 1fr)",
//           gap: "10px",
//           maxWidth: "300px",
//           margin: "0 auto",
//         }}
//       >
//         {buttonValues.map((btn) => (
//           <button
//             key={btn}
//             onClick={() => {
//               if (btn === "=") calculate();
//               else if (btn === "C") clearAll();
//               else handleClick(btn);
//             }}
//             style={{
//               padding: "15px",
//               fontSize: "18px",
//               cursor: "pointer",
//             }}
//           >
//             {btn}
//           </button>
//         ))}
//       </div>

//       <div
//         className="result-display"
//         style={{
//           marginTop: "25px",
//           fontSize: "22px",
//           fontWeight: "bold",
//         }}
//       >
//         {result}
//       </div>
//     </div>
//   );
// }

// export default App;

// pagination

import React, { useEffect, useState } from "react";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => {
        if (!res.ok) throw new Error("API Error");
        return res.json();
      })
      .then((data) => setEmployees(data))
      .catch(() => {
        alert("failed to fetch data")+error;
        setError("Fetch failed");
      });
  }, []);

  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = employees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Employee List</h2>
      <table
        border="1"
        width="100%"
        cellPadding="10"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <button onClick={handlePrevious}>Previous</button>
        <p>{currentPage}</p>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default App;

