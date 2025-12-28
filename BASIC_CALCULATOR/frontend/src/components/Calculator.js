import React, { useEffect, useState } from "react";
import axios from "axios";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  // 👉 Fetch calculation history
  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/calculations");
      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 👉 Load history on page load
  useEffect(() => {
    fetchHistory();
  }, []);

  // 👉 Button click
  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  // 👉 Clear input
  const clearInput = () => {
    setInput("");
  };

  // 👉 Calculate + Save
  const calculate = async () => {
    try {
      const result = eval(input).toString();

      // Save to backend
      await axios.post("http://localhost:8000/api/calculations", {
        expression: input,
        result: result,
      });

      setInput(result);
      fetchHistory(); // refresh history
    } catch {
      setInput("Error");
    }
  };

  // 👉 Clear history
  const clearHistory = async () => {
    try {
      await axios.delete("http://localhost:8000/api/calculations");
      setHistory([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <input className="display" value={input} readOnly />

        <div className="buttons">
          {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","+"] .map((val) => (
            <button key={val} onClick={() => handleClick(val)}>
              {val}
            </button>
          ))}

          <button className="equal" onClick={calculate}>=</button>
          <button className="clear" onClick={clearInput}>C</button>
        </div>
      </div>

      {/* 📜 History */}
      <div className="history">
        <h3>History</h3>
        <button className="clear-history" onClick={clearHistory}>
          Clear History
        </button>

        {history.length === 0 && <p>No calculations yet</p>}

        <ul>
          {history.map((item) => (
            <li key={item._id}>
              {item.expression} = <strong>{item.result}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
