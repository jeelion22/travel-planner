import "../styles/Profile.css";
import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();
  const { user } = useLoaderData();

  const handleProfileUpdate = () => {
    navigate("update");
  };

  useEffect(() => {
    if (user) {
      setUserInfo(user.data.user);
    }
  }, [user]);

  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div
          className="col-md-8 col-sm-12 border rounded p-4"
          style={{ backgroundColor: "white" }}
        >
          <div className="col ">
            <FontAwesomeIcon
              icon={faPenToSquare}
              type="button"
              className="btn btn-outline-secondary m-2  float-end"
              onClick={handleProfileUpdate}
            />
            <h3 className="text-center  p-2  border-bottom ">Profile</h3>
          </div>

          <div className="col-md-12 table-responsive">
            <table className="table table-borderless ">
              <tbody>
                <tr>
                  <td>Fullname</td>
                  <td>
                    {userInfo.firstname} {userInfo.lastname}
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{userInfo.email}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{userInfo.phone}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{userInfo.userCategory} </td>
                </tr>
                {["reuniteSeeker", "both"].includes(userInfo.userCategory) && (
                  <>
                    <tr>
                      <td>Address</td>
                      <td>{userInfo.address}</td>
                    </tr>
                    <tr>
                      <td>Authorized Id: </td>
                      <td>{userInfo.authorizedIdType}</td>
                    </tr>
                    <tr>
                      <td>Authorized Id No.</td>
                      <td>{userInfo.authorizedIdNo}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
