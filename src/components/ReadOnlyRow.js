import React from "react";

const ReadOnlyRow = ({ receipt, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{receipt.date}</td>
      <td>{receipt.amount}</td>
      <td>{receipt.paymentMode}</td>
      <td>{receipt.remark}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, receipt)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(receipt.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;