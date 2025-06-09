import "../styles/UserUpdate.css";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLoaderData } from "react-router-dom";
import userServices from "../../services/userServices";
import { CommunityUploaderValidationSchema } from "../validataionSchema/CommunityUploaderValidationSchema";
import { reuniteSeekerValidationSchema } from "../validataionSchema/reuniteSeekerValidationSchema";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const UserUpdate = () => {
  const { user } = useLoaderData();
  const [initialValues, setInitialValues] = useState(user.data.user);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(
    user.data.user.userCategory
  );

  const [validationSchema, setValidationSchema] = useState(
    CommunityUploaderValidationSchema
  );

  const handleClose = () => {
    navigate("/users/profile");
  };

  useEffect(() => {
    if (selectedCategory === "reuniteSeeker" || selectedCategory === "both") {
      setValidationSchema(reuniteSeekerValidationSchema);
    } else {
      setValidationSchema(CommunityUploaderValidationSchema);
    }
  }, [selectedCategory]);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        setIsLoading(true);

        userServices
          .userInfoUpdate(values)
          .then((response) => {
            alert(response.data.message);

            navigate("/users/profile");
            resetForm();
          })
          .catch((error) => {
            setIsLoading(false);
            alert(error.response.data.message);
          });
      }}
    >
      {(formik) => {
        const handlePhoneChange = (value) => {
          formik.setFieldValue("phone", value);
        };
        return (
          <form onSubmit={formik.handleSubmit}>
            <div className="container">
              <div className="row">
                <div
                  className="col border rounded p-4"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="row justify-content-end ">
                    <div className="col-auto">
                      <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        onClick={handleClose}
                      ></button>
                    </div>
                  </div>

                  <div className="row justify-content-center text-center mt-4">
                    <div className="col-md-6">
                      <h4 className="border-bottom pb-3">Profile Update</h4>
                    </div>
                  </div>

                  <div className="row justify-content-center mt-4">
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        aria-label="firstname"
                        id="firstname"
                        {...formik.getFieldProps("firstname")}
                      />
                      {formik.touched.firstname && formik.errors.firstname ? (
                        <div className="text-danger">
                          {formik.errors.firstname}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        aria-label="lastname"
                        id="lastname"
                        {...formik.getFieldProps("lastname")}
                      />
                      {formik.touched.lastname && formik.errors.lastname ? (
                        <div className="text-danger">
                          {formik.errors.lastname}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row justify-content-center mt-3">
                    <div className="col-md-6">
                      <PhoneInput
                        className="form-control d-flex border-0 phone-input-no-border"
                        placeholder="Enter phone number"
                        value={formik.values.phone}
                        onChange={handlePhoneChange}
                      />

                      {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-danger">{formik.errors.phone}</div>
                      ) : null}
                    </div>
                  </div>

                  {(selectedCategory === "reuniteSeeker" ||
                    selectedCategory === "both") && (
                    <>
                      <div className="row justify-content-center mt-3">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                            aria-label="address"
                            id="address"
                            {...formik.getFieldProps("address")}
                          />
                          {formik.touched.address && formik.errors.address ? (
                            <div className="text-danger">
                              {formik.errors.address}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="row justify-content-center mt-3">
                        <div className="col-md-6">
                          <select
                            className="form-select"
                            aria-label="authorizedIdType"
                            {...formik.getFieldProps("authorizedIdType")}
                          >
                            <option value="" disabled>
                              Select Government authorized ID
                            </option>
                            <option value="aadhaar">Aadhaar</option>
                            <option value="voter_id">Voter ID</option>
                            <option value="driving_license">
                              Driving License
                            </option>
                            <option value="pan_card">PAN Card</option>
                            <option value="ration_card">Ration Card</option>
                            <option value="passport">Passport</option>
                          </select>
                          {formik.touched.authorizedIdType &&
                          formik.errors.authorizedIdType ? (
                            <div className="text-danger">
                              {formik.errors.authorizedIdType}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="row justify-content-center mt-3">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={
                              formik.values.authorizedIdType
                                .split("_")
                                .join(" ")
                                .toLocaleUpperCase() + " Number"
                            }
                            aria-label="authorizedId"
                            id="authorizedId"
                            {...formik.getFieldProps("authorizedIdNo")}
                          />
                          {formik.touched.authorizedIdNo &&
                          formik.errors.authorizedIdNo ? (
                            <div className="text-danger">
                              {formik.errors.authorizedIdNo}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="row justify-content-center mt-3">
                    <div className="col-md-3">
                      <div className=" d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-outline-secondary rounded-pill"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                              ></span>
                              <span role="status">Updating...</span>
                            </>
                          ) : (
                            "update"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default UserUpdate;
