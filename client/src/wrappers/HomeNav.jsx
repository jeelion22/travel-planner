import { useEffect, useState } from "react";
import "../styles/HomeNav.css";
import { Link, Outlet, useLocation } from "react-router-dom";
const HomeNav = () => {
  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  function activateLink(currentLink) {
    setActive(currentLink);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg home-dashboard-nav">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h4> ReUniteME</h4>
          </Link>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    active === "/users/register" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/users/register"
                  onClick={() => {
                    activateLink("/users/register");
                  }}
                >
                  <h6>Register</h6>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    active === "/users/login" ? "active" : ""
                  }`}
                  to="/users/login"
                  onClick={() => {
                    activateLink("/users/login");
                  }}
                >
                  <h6>Login</h6>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    active === "/admins/login" ? "active" : ""
                  }`}
                  to="/admins/login"
                  onClick={() => {
                    activateLink("/admins/login");
                  }}
                >
                  <h6>Admin Login</h6>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default HomeNav;
