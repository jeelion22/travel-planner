import { Formik } from "formik";
import { useEffect, useState } from "react";
import { createPasswordValidationSchema } from "../validataionSchema/createPasswordValidationSchema";
import userServices from "../../services/userServices";
import { useNavigate, useParams } from "react-router-dom";

const VerifyAccount = () => {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  const { activationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await userServices.verify(activationId);

        if (response.data.redirectTo) {
          setVerified(true);
          setTimeout(() => {
            navigate(`/users/verified/${response.data.redirectTo}`);
          }, 3000);
        } else {
          alert(response.data.message);
          navigate("/");
        }
      } catch (error) {
        alert(error.response.data.message);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    verifyAccount();
  }, [activationId, navigate]);

  return (
    <>
      {loading && (
        <div className="container">
          <div className="row text-center mt-5">
            <div className="col-md-12">
              Please wait verifying your account...
            </div>
          </div>
        </div>
      )}

      {verified && (
        <div className="container">
          <div className="row text-center mt-5">
            <div className="col-md-12">
              Your account verified successfully! please wait, redirecting to
              password creation!
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyAccount;
