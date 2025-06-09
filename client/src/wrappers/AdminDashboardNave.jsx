import "../styles/AdminDashboardNav.css";
import React from "react";
import { useNavigate, Link, Outlet, useLoaderData } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import userServices from "../../services/userServices";

export async function loader() {
  try {
    const response = await userServices.getCurrentAdmin();

    return { ...response.data.admin };
  } catch (error) {
    alert(error.response.data.message);
    return null;
  }
}

const AdminDashboardNave = () => {
  const navigate = useNavigate();

  const admin = useLoaderData();

  const handleLogout = async () => {
    try {
      const response = await userServices.adminLogout();

      if (response.status === 204) {
        alert("Logged out successfully!");
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col admin-dashboard-nav">
          <nav className="navbar navbar-expand-lg">
            <span className="navbar-brand">ReUniteMe</span>
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
                    Welcome {admin?.firstname} {admin?.lastname}
                  </a>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-3">
          <AdminSidebar admin={admin} />
        </div>
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardNave;
