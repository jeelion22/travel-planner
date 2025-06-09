import "../styles/UserDashboardNav.css";
import React, { useEffect } from "react";
import userServices from "../../services/userServices";
import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export async function loader() {
  try {
    const user = await userServices.getCurrentUser();

    return { user };
  } catch (error) {
    alert(error.response.data.message);
    if (error.response.data.message === "Unauthorized") {
      window.location.replace("/");
    }
    return null;
  }
}

const UserDashboardNav = () => {
  const navigate = useNavigate();

  const { user } = useLoaderData();

  const handleLogout = async () => {
    try {
      const response = await userServices.logout();

    

      if (response.status === 204) {
        alert("Logged out successfully!");
        navigate("/");
      } else {
        response.data.message;
      }
    } catch (error) {
      // console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row user-dashboard-nav">
        <div className="col">
          <nav className="navbar navbar-expand-lg">
            <h4 className="navbar-brand ps-2">ReUniteMe</h4>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link disabled" aria-disabled="true">
                    <h6>
                      Welcome {user.data.user.firstname}{" "}
                      {user.data.user.lastname}
                    </h6>
                  </a>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    <h6>Logout</h6>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-3">
          <Sidebar userType={user.data.user.userCategory} />
        </div>
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardNav;
