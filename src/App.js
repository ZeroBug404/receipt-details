import { nanoid } from "nanoid";
import React, { useState } from "react";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

function App() {
  const [receipts, setReceipts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    date: "",
    amount: "",
    paymentMode: "",
    remark: "",
  });

  const [editFormData, setEditFormData] = useState({
    date: "",
    amount: "",
    paymentMode: "",
    remark: "",
  });

  const [editReceiptId, setEditReceiptId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
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

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editReceiptId,
      date: editFormData.date,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...receipts];

    const index = receipts.findIndex((receipt) => receipt.id === editReceiptId);

    newContacts[index] = editedContact;

    setReceipts(newContacts);
    setEditReceiptId(null);
  };

  return (
    <>
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



      {/* table */}
    <div className="table">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {receipts.map((receipt) => (
              <>
                {editReceiptId === receipt.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    // handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    receipt={receipt}
                    // handleEditClick={handleEditClick}
                    // handleDeleteClick={handleDeleteClick}
                  />
                )}
              </>
            ))}
          </tbody>
        </table>
      </form>
    </div>

    </>
  );
}

export default App;
