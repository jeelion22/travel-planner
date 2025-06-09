import React from "react";
import EditBudget from "./EditBudget";

const BudgetModal = () => {
  return (
    <div
      class="modal fade "
      id="editBudgetModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable"
        // style={{ maxWidth: "75%" }}
      >
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editBudgetModal">
              Edit Budget
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <EditBudget />
          </div>
          {/* <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;
