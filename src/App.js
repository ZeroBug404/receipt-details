import React from "react";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h2>Receipt Details</h2>
      <form>
        <div className="add_form">
          <div>
            <p>
              Date<span style={{ color: "red" }}>*</span>
            </p>
            <p>
              Amount<span style={{ color: "red" }}>*</span>
            </p>
            <p>
              Payment Mode<span style={{ color: "red" }}>*</span>
            </p>
            <p>Remark</p>
          </div>
          <div className="form_inputs">
            <input
              type="date"
              name="date"
              required="required"
              placeholder="Enter Date"
            />
            <input
              type="number"
              name="amount"
              required="required"
              placeholder="Enter Amount (in INR)"
            />
            <select name="gender">
              <option value="none" selected>
                Cash
              </option>
              <option value="male">Visa Card</option>
              <option value="female">Master Card</option>
              <option value="other">other</option>
            </select>
            <input
              type="email"
              name="email"
              required="required"
              placeholder="Enter remark."
            />
          </div>
        </div>

        <div className="buttons">
          <button type="cancel">CANCEL</button>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default App;
