import "../styles/UserLogin.css";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate, Link, useAsyncError } from "react-router-dom";
import { userLoginValidation } from "../validataionSchema/userLoginValidation";
import userServices from "../../services/userServices";

const initialValues = {
  email: "",
  password: "",
};

const UserLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLogin, setConfirmLogin] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={userLoginValidation}
        onSubmit={async (values) => {
          try {
            setIsLoading(true);
            const response = await userServices.login(values);

            if (response) {
              setIsLoading(false);
              setConfirmLogin(true);

              setTimeout(() => {
                navigate("/users/dashboard");
              }, 500);
            } else {
              setIsLoading(false);
            }
          } catch (error) {
            setIsLoading(false);

            alert(error?.response?.data?.message ?? error.message);
          }
        }}
      >
        {(formik) => {
          if (isLoading) {
            setTimeout(() => {
              return (
                <div className="container">
                  <div className="row text-center mt-5">
                    <div className="col-md-12">
                      Please wait, your account is being verified...
                    </div>
                  </div>
                </div>
              );
            }, 500);
          }

          if (confirmLogin) {
            return (
              <div className="container">
                <div className="row text-center mt-5">
                  <div className="col-md-12">
                    Your account verified successfully!, please wait,
                    redirecting to your dashboard...
                  </div>
                </div>
              </div>
            );
          }

          return (
            <form onSubmit={formik.handleSubmit}>
              <div className="container">
                <div className="row  mt-2 p-2">
                  <div className="col border rounded user-login">
                    <div className="row justify-content-center text-center mt-4">
                      <div className="col-md-6">
                        <h4 className="user-login-header">Log In</h4>
                      </div>
                    </div>
                    <div className="row justify-content-center mt-3">
                      <div className="col-md-6">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          aria-label="email"
                          id="email"
                          {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div className="text-danger">
                            {formik.errors.email}
                          </div>
                        )}
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
                        {formik.touched.password && formik.errors.password && (
                          <div className="text-danger">
                            {formik.errors.password}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row justify-content-center mt-3">
                      <div className="col-md-3">
                        <Link to="/users/forgot-password">
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="col-md-3">
                        <button
                          type="submit"
                          className="btn btn-outline-primary float-end"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                              ></span>
                              <span role="status">Logging...</span>
                            </>
                          ) : (
                            "Log in"
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="row justify-content-center mt-4">
                      <div className="col-md-6 text-center">
                        <span>or</span>
                      </div>
                    </div>
                    <div className="row justify-content-center mt-3 mb-3">
                      <div className="col-md-6 text-center">
                        <span>For create an account </span>{" "}
                        <Link to="/users/register">Click Here</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default UserLogin;
