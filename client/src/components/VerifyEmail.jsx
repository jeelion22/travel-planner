import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserEmailVerificationError,
  selectUserEmailVerificationStatus,
  verifyAccount,
  selectUserId
} from "../features/users/usersSlice";
import {
  selectUser,
  selectUserError,
  selectUserStatus,
} from "../features/users/usersSlice";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);

  const userEmailVerificationStatus = useSelector(
    selectUserEmailVerificationStatus
  );
  const userEmailVerificationError = useSelector(
    selectUserEmailVerificationError
  );

  const [otp, setOtp] = useState("");

  const verifyOtp = () => {
    if (userId) {
      dispatch(verifyAccount({ userId, otp: { emailOtp: otp } }))
        .unwrap()
        .then((res) => {
          alert(res.message);

          navigate(0);
        })
        .catch((err) => {
          console.log(err), alert(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <form className="border rounded m-4 p-4 bg-body-tertiary">
            <h3 className="text-center p-4">Verify Email Address</h3>

            <div className="row justify-content-center text-center">
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

                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={status === "loading"}
                    onClick={verifyOtp}
                  >
                    {userEmailVerificationStatus === "loading" ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        ></span>{" "}
                        <span role="status">Verifying...</span>
                      </>
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {userEmailVerificationError && (
              <div className="text-danger text-center mt-2">
                {userEmailVerificationError}
              </div>
            )}

            <div className="text-center">
              <button
                type="button"
                className="btn btn-outline-primary mt-3 rounded-pill"
                onClick={() =>
                  alert("Resend OTP functionality not implemented")
                }
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
