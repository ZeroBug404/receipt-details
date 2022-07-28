import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import "./App.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

function App() {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    fetch('mock-data.json')
    .then(res => res.json())
    .then(data => setReceipts(data))
  },[])

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

    event.target.reset();
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

  const handleEditClick = (event, receipt) => {
    event.preventDefault();
    setEditReceiptId(receipt.id);

    const formValues = {
      date: receipt.date,
      amount: receipt.amount,
      paymentMode: receipt.paymentMode,
      remark: receipt.remark,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditReceiptId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...receipts];

    const index = receipts.findIndex((receipt) => receipt.id === contactId);

    newContacts.splice(index, 1);

    setReceipts(newContacts);
  };

  return (
    <>
    <div className="app-container">
      <h2>Receipt Details</h2>
      <form onSubmit={handleAddFormSubmit}>
        <div className="add_form">
          <div className="labels">
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
              style={{width: '200px'}}
              onChange={handleAddFormChange}
            />
            <input
              type="number"
              name="amount"
              required="required"
              placeholder="Enter Amount (in INR)"
              style={{width: '400px'}}
              onChange={handleAddFormChange}
            />
            <select name="paymentMode" onChange={handleAddFormChange}
            style={{width: '250px'}}>
              <option value="Cash" selected>
                Select
              </option>
              <option value="Cash">Cash</option>
              <option value="Visa Card">Visa Card</option>
              <option value="Master Card">Master Card</option>
            </select>
            <input
              type="text"
              name="remark"
              // required="required"
              placeholder="Enter remark"
              style={{width: '400px'}}
              onChange={handleAddFormChange}
            />
          </div>
        </div>

        <div className="buttons">
          <button style={{background: 'white', color: 'red', border: '1px solid #ff5733'}} type="cancel">CANCEL</button>
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
              <th>Date</th>
              <th>Amount</th>
              <th>Payment Mode</th>
              <th>Remark</th>
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
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    receipt={receipt}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
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
