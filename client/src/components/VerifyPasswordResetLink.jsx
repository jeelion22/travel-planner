import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userServices from "../../services/userServices";

const VerifyPasswordResetLink = () => {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);

  const { activationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPasswordResetLink = async () => {
      try {
        const response = await userServices.verifyPasswordResetLink(
          activationId
        );

        if (response.status === 200) {
          setVerified(true);
          setTimeout(() => {
            navigate(
              `/users/password/reset/verified/${response.data.redirectTo}`
            );
          }, 3000);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError(
          error.response?.data?.message || "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    verifyPasswordResetLink();
  }, [activationId, navigate]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <>
      {loading && (
        <div className="container">
          <div className="row text-center mt-5">
            <div className="col-md-12">Please wait, verifying your link...</div>
          </div>
        </div>
      )}

      {verified && (
        <div className="container">
          <div className="row text-center mt-5">
            <div className="col-md-12">
              Your account link verified successfully! Please wait, redirecting
              to password creation!
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyPasswordResetLink;
