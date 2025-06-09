import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import userServices from "../../../services/userServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faSquareCheck,
  faRectangleXmark,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons";

import { useLoaderData, useNavigate } from "react-router-dom";
import EditUserData from "./EditUserData";

const AdminLookupUsers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [adminInfo, setAdminInfo] = useState({});

  const admin = useLoaderData();

  const navigate = useNavigate();

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleUserDelete = async (name, userId) => {
    if (confirm(`Would you like to delete ${name}?`)) {
      try {
        await userServices.adminDeleteUser(userId);

        alert("The user was deleted successfully");
        getAllUsers();
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await userServices.adminGetAllUsers();

      if (response) {
        setUsersList(response.data.users);
      }
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
    getAllUsers();
  }, []);

  const handleUserStatus = async (name, userId) => {
    if (confirm(`Would you like to activate ${name}?`)) {
      try {
        const response = await userServices.adminActivateUser(userId);

        if (response) {
          alert(response.data.message);
          await getAllUsers();
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  const itemsPerPage = 10;
  const users = usersList || [];
  const paginatedUsersList = users.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <div className="container">
        <div className="row">
          <h4 className="text-center border-bottom p-2 shadow">
            List of Users{" "}
          </h4>
        </div>

        <div className="row border rounded pt-3  bg-light">
          <div className="table-responsive ">
            <table className="table table-hover align-middle pt-2">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Fullname</th>
                  <th scope="col">Email</th>

                  <th scope="col">Phone</th>
                  <th scope="col">Category</th>
                  <th scope="col">isActive</th>
                  <th scope="col">Manage</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsersList.map((user, index) => {
                  const itemNumber = currentPage * itemsPerPage + index + 1;
                  return (
                    <tr key={user._id.toString()}>
                      <th scope="row">{itemNumber}</th>
                      <td>
                        {user.firstname} {user.lastname}
                      </td>
                      <td>
                        {user.email}
                        {user.isEmailVerified ? (
                          <FontAwesomeIcon
                            icon={faSquareCheck}
                            className="text-success ms-1"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faRectangleXmark}
                            className="text-danger ms-1"
                          />
                        )}
                      </td>

                      <td>
                        {user.phone}
                        {user.isPhoneVerified ? (
                          <FontAwesomeIcon
                            icon={faSquareCheck}
                            className="text-success ms-1"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faRectangleXmark}
                            className="text-danger ms-1"
                          />
                        )}
                      </td>
                      <td>{user.userCategory}</td>
                      <td>
                        {user.isActive.toString()}
                        {user.isEmailVerified && !user.isActive && (
                          <FontAwesomeIcon
                            type="button"
                            icon={faToggleOff}
                            className="text-primary ms-1"
                            onClick={() => {
                              handleUserStatus(
                                `${user.firstname} ${user.lastname}`,
                                user._id.toString()
                              );
                            }}
                          />
                        )}
                      </td>

                      {adminInfo.permissions.includes(
                        "write" || "delete" || "update"
                      ) && (
                        <td className="text-end">
                          <div className="d-flex justify-content-end gap-2">
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              type="button"
                              className="btn btn-outline-primary"
                              data-bs-toggle="modal"
                              data-bs-target={`#${user._id.toString()}`}
                            />

                            <div
                              class="modal fade"
                              id={user._id.toString()}
                              tabIndex="-1"
                              aria-labelledby={`${user._id.toString()}`}
                              aria-hidden="true"
                            >
                              <div class="modal-dialog modal-dialog-scrollable">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h1
                                      class="modal-title fs-5"
                                      id={`${user._id.toString()}`}
                                    >
                                      User Profile Update
                                    </h1>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    <EditUserData
                                      user={user}
                                      key={user._id.toString()}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button
                              className="btn btn-outline-danger"
                              type="button"
                              disabled={!user.isActive}
                              aria-disabled="true"
                              onClick={() => {
                                handleUserDelete(
                                  `${user.firstname} ${user.lastname}`,
                                  user._id.toString()
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
        pageCount={Math.ceil(users.length / itemsPerPage)}
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

export default AdminLookupUsers;
