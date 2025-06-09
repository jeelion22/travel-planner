import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  getUser,
  selectUser,
  selectUserStatus,
} from "../features/users/usersSlice";

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const status = useSelector(selectUserStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="container">
        <div
          className="row justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div className="col text-center">
            <FontAwesomeIcon icon={faSpinner} spinPulse size="4x" />
            <h6 className="mt-4">Loading...</h6>
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
