import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import userServices from "../../../services/userServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons";

import { useLoaderData } from "react-router-dom";
import EditAdminsData from "./EditAdminsData";

const AdminsList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [adminsList, setAdminsList] = useState([]);
  const [adminInfo, setAdminInfo] = useState({});

  const admin = useLoaderData();

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const getAllAdmins = async () => {
    try {
      const response = await userServices.getAllAdmins();

      setAdminsList(response.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (admin) {
      setAdminInfo(admin);
    }
  }, [admin]);

  useEffect(() => {
    getAllAdmins();
  }, []);

  const handleAdminDelete = async (name, adminId) => {
    if (confirm(`Would you like to delete ${name}?`)) {
      try {
        const response = await userServices.deleteAdmin(adminId);

        if (response) {
          alert("Admin was deleted successfully!");
          await getAllAdmins();
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  const itemsPerPage = 10;
  const admins = adminsList || [];
  const paginatedAdminsList = admins.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <div className="container">
        <div className="row ">
          <h4 className="text-center border-bottom shadow p-2 ">
            List of Admins
          </h4>
        </div>

        <div className="row border rounded bg-light p-2  mt-2">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Fullname</th>
                  <th scope="col">Email</th>

                  <th scope="col">Phone</th>
                  <th scope="col">Role</th>
                  <th scope="col">Permissions</th>
                  <th scope="col">Status</th>
                  {adminInfo.permissions?.includes(
                    "write" || "delete" || "update"
                  ) && <th scope="col">Manage</th>}
                </tr>
              </thead>
              <tbody>
                {paginatedAdminsList.map((admin, index) => {
                  const itemNumber = currentPage * itemsPerPage + index + 1;
                  return (
                    <tr key={admin._id.toString()}>
                      <th scope="row">{itemNumber}</th>

                      <td>{admin.username}</td>
                      <td>
                        {admin.firstname} {admin.lastname}
                      </td>
                      <td>{admin.email}</td>

                      <td>{admin.phone}</td>
                      <td>{admin.role}</td>
                      <td>{admin.permissions?.join(", ")}</td>

                      <td>{admin.status}</td>

                      {adminInfo.permissions?.includes(
                        "write" || "delete" || "update"
                      ) && (
                        <td className="text-end">
                          <div className="d-flex justify-content-end gap-2">
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                              data-bs-toggle="modal"
                              data-bs-target={`#${admin._id.toString()}`}
                              disabled={admin.email === "jeelion22@gmail.com"}
                            >
                              <FontAwesomeIcon
                                type="button"
                                icon={faPenToSquare}
                              />
                            </button>

                            <div
                              class="modal fade"
                              id={admin._id.toString()}
                              tabIndex="-1"
                              aria-labelledby={`${admin._id.toString()}`}
                              aria-hidden="true"
                            >
                              <div class="modal-dialog modal-dialog-scrollable">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h1
                                      class="modal-title fs-5"
                                      id={`${admin._id.toString()}`}
                                    >
                                      Admin Profile Update
                                    </h1>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    <EditAdminsData
                                      admin={admin}
                                      key={admin._id.toString()}
                                      getAllAdmins={getAllAdmins}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button
                              className="btn btn-outline-danger"
                              type="button"
                              disabled={
                                admin.status === "deleted" ||
                                admin.email === "jeelion22@gmail.com"
                              }
                              aria-disabled={admin.status === "deleted"}
                              onClick={() => {
                                handleAdminDelete(
                                  `${admin.firstname} ${admin.lastname}`,
                                  admin._id.toString()
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        pageCount={Math.ceil(adminsList.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        className="pagination justify-content-center mt-4"
        pageClassName="page_item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        onPageChange={handlePageClick}
      />
    </>
  );
};

export default AdminsList;
