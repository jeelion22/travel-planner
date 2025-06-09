import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const AdminProfile = () => {
  const admin = useLoaderData();

  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div
          className="col-md-8 col-sm-12 border rounded p-4"
          style={{ backgroundColor: "white" }}
        >
          <div className="col ">
            <h3 className="text-center  p-2  border-bottom ">Profile</h3>
          </div>

          <div className="col-md-12 table-responsive">
            <table className="table table-borderless ">
              <tbody>
                <tr>
                  <td>Username</td>
                  <td>{admin.username}</td>
                </tr>
                <tr>
                  <td>Fullname</td>
                  <td>
                    {admin.firstname} {admin.lastname}
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{admin.email}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{admin.phone}</td>
                </tr>
                <tr>
                  <td>Permissions</td>
                  <td>{admin.permissions?.join(", ")}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{admin.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
