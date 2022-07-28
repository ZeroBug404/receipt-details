import React, { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import data from "./mock-data.json";

function App() {
  const [receipts, setReceipts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    date: "",
    amount: "",
    paymentMode: "",
    remark: "",
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  console.log(addFormData);

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      date: addFormData.date,
      amount: addFormData.amount,
      paymentMode: addFormData.paymentMode,
      remark: addFormData.remark,
    };

    const newContacts = [...receipts, newContact];
    setReceipts(newContacts);
  };

  return (
    <div className="app-container">
      <h2>Receipt Details</h2>
      <form onSubmit={handleAddFormSubmit}>
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
              onChange={handleAddFormChange}
            />
            <input
              type="number"
              name="amount"
              required="required"
              placeholder="Enter Amount (in INR)"
              onChange={handleAddFormChange}
            />
            <select name="paymentMode" onChange={handleAddFormChange}>
              <option value="none" selected>
                Cash
              </option>
              <option value="Visa Card">Visa Card</option>
              <option value="Master Card">Master Card</option>
              <option value="other">other</option>
            </select>
            <input
              type="text"
              name="remark"
              // required="required"
              placeholder="Enter remark"
              onChange={handleAddFormChange}
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
