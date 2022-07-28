import React from "react";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h2>Receipt Details</h2>
      <form className="add_form">
        <div>
          <p>Date</p>
          <p>Amount</p>
          <p>Payment Mode</p>
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
          <input
            type="text"
            name="phoneNumber"
            required="required"
            placeholder="Enter a phone number..."
          />
          <input
            type="email"
            name="email"
            required="required"
            placeholder="Enter remark."
          />
        </div>

        <div>
          <button type="submit">CANCEL</button>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default App;
