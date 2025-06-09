import React, { useRef, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

import {
  resetPassword,
  resetPasswordSet,
  selectUserPasswordSetError,
  selectUserPasswordSetStatus,
} from "./usersSlice";

const PasswordReset = () => {
  // password reset otp verification
  const userPasswordSetStatus = useSelector(selectUserPasswordSetStatus);
  const userPasswordSetError = useSelector(selectUserPasswordSetError);

  //   otp state
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   setting password
  const initialValues = {
    password: "",
    confirmPassword: "",
    passwordResetOtp: "",
    email: "",
  };
  //   password setting validation schema
  const passwordValidationSchema = Yup.object({
    email: Yup.string()
      .email("* Invalid email address.")
      .required("* Email address should not be empty."),
    password: Yup.string()
      .required("* Password is required")
      .min(8, "Password must be at least mix of 8 characters long.")
      .matches(/[0-9]/, "Password requires a number.")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires a uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),

    confirmPassword: Yup.string()
      .required("** Confirm password is required")
      .oneOf(
        [Yup.ref("password"), null],
        "* The passwords do not match. Please try again"
      ),
  });

  if (userPasswordSetStatus === "succeeded") {
    return (
      <>
        <div className="text-center">
          <div className="text-primary">
            <i className="bi bi-check-circle-fill fs-3"></i>
            <h6>Success</h6>
          </div>
          <button
            type="button"
            className="btn btn-outline-danger rounded-pill"
            data-bs-dismiss="modal"
            onClick={() => {
              dispatch(resetPasswordSet());
              navigate("/login");
            }}
          >
            Close
          </button>
        </div>
      </>
    );
  }

  if (userPasswordSetStatus === "failed") {
    return (
      <>
        <div className="text-center">
          <div className="text-primary">
            <i class="bi bi-exclamation-circle fs-3"></i>
            <h6>Failed</h6>
          </div>
          <button
            type="button"
            className="btn btn-outline-danger rounded-pill"
            data-bs-dismiss="modal"
            onClick={() => {
              dispatch(resetPasswordSet());
            }}
          >
            Close
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="row justify-content-center text-center border rounded m-4 p-4 bg-body-tertiary">
        <h5>Enter OTP</h5>
        <div className="col-auto">
          <div className="d-flex mt-3 gap-2 ">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "30px",
                height: "35px",
                borderColor: "gray",
                outlineColor: "green",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={passwordValidationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          const resetData = { ...values, passwordResetOtp: otp };

          dispatch(resetPassword(resetData))
            .unwrap()
            .then(() => {
              resetForm();
            })
            .catch((err) => alert(JSON.stringify(err, null, 2)));
        }}
      >
        {(formik) => (
          <Form
            onSubmit={formik.handleSubmit}
            className="border rounded m-4 p-4 bg-body-tertiary "
          >
            <h3 className="text-center p-4">Reset Password</h3>

            <div className="mb-3">
              <div className="form-floating mb-3">
                <Field
                  type="email"
                  className={`form-control ${
                    formik.touched.email
                      ? formik.errors.email
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  name="email"
                  id="email"
                  placeholder=""
                />
                <label htmlFor="email">Email address</label>
                <ErrorMessage
                  name="email"
                  className="text-danger"
                  component="div"
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="form-floating mb-3">
                <Field
                  type="password"
                  className={`form-control ${
                    formik.touched.password
                      ? formik.errors.password
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  id="password"
                  name="password"
                  placeholder=""
                />
                <label htmlFor="password">Password</label>
                <ErrorMessage
                  name="password"
                  className="text-danger"
                  component="div"
                />
              </div>
            </div>

            <div className="form-floating">
              <Field
                type="password"
                className={`form-control ${
                  formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="confirmPassword"
                name="confirmPassword"
                placeholder=""
              />
              <label htmlFor="confirmPassword">Confirm password</label>
              <ErrorMessage
                name="confirmPassword"
                className="text-danger"
                component="div"
              />
            </div>

            <div className="text-end">
              <button
                type="submit"
                className="btn btn-outline-success rounded-pill mt-3"
                disabled={userPasswordSetStatus === "loading"}
              >
                {userPasswordSetStatus === "loading" ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      area-hidden="true"
                    ></span>{" "}
                    <span role="status">Updating...</span>
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PasswordReset;
