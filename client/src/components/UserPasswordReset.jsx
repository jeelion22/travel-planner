import "../styles/UserPasswordReset.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { createPasswordValidationSchema } from "../validataionSchema/createPasswordValidationSchema";
import userServices from "../../services/userServices";

const UserPasswordReset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [isPasswordCreated, setIsPasswordCreated] = useState(false);

  const { userId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const isPasswordResetComplete = sessionStorage.getItem(
      "passwordResetComplete"
    );
    if (isPasswordResetComplete) {
      navigate("/users/login");
    }
  }, [navigate]);

  return (
    <Formik
      initialValues={{
        password,
        confirmPassword,
      }}
      validationSchema={createPasswordValidationSchema}
      onSubmit={(values) => {
        const pass = values.confirmPassword;
        setPasswordStatus(true);
        userServices
          .resetPassword(userId, { password: pass })
          .then((response) => {
            if (response.status == 200) {
              setPasswordStatus(false);
              setIsPasswordCreated(true);
              sessionStorage.setItem("passwordResetComplete", "true");
              setTimeout(() => {
                setPassword(""), setConfirmPassword("");
                navigate("/users/login");
              }, 5000);
            } else {
              alert(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
            alert(error.response.data.message);
          });
      }}
    >
      {(formik) => {
        if (passwordStatus) {
          return (
            <div className="container">
              <div className="row text-center mt-5">
                <div className="col-md-12">Creating password...</div>
              </div>
            </div>
          );
        }

        if (isPasswordCreated) {
          return (
            <div className="container">
              <div className="row text-center mt-5">
                <div className="col-md-12">
                  Password created successfully! please wait, redirecting to
                  login page.
                </div>
              </div>
            </div>
          );
        }
        return (
          <form onSubmit={formik.handleSubmit}>
            <div className="container-md-6  p-5">
              <div className="row">
                <div className="col border rounded user-password-reset">
                  <div className="row justify-content-center text-center mt-4">
                    <div className="col-md-6">
                      <h4 className="user-password-reset-header">
                        Create Password
                      </h4>
                    </div>
                  </div>

                  <div className="row justify-content-center mt-3">
                    <div className="col-md-6">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="password"
                        id="password"
                        {...formik.getFieldProps("password")}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row justify-content-center mt-3">
                    <div className="col-md-6">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm password"
                        aria-label="confirmPassword"
                        id="confirmPassword"
                        {...formik.getFieldProps("confirmPassword")}
                      />
                      {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword ? (
                        <div className="text-danger">
                          {formik.errors.confirmPassword}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row justify-content-center mt-3 mb-4">
                    <div className="col-md-6 justify-content-end">
                      <div className=" d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-outline-primary"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </form>
        );
      }}
    </Formik>
  );
};

export default UserPasswordReset;
