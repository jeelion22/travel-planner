import "../../styles/EditUserData.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import userServices from "../../../services/userServices";
import { CommunityUploaderValidationSchema } from "../../validataionSchema/CommunityUploaderValidationSchema";
import { reuniteSeekerValidationSchema } from "../../validataionSchema/reuniteSeekerValidationSchema";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const EditUserData = ({ user }) => {
  const [initialValues, setInitialValues] = useState(user);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(user.userCategory);
  const [validationSchema, setValidationSchema] = useState(
    CommunityUploaderValidationSchema
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        try {
          setIsSubmitting(true);
          const response = await userServices.adminEditUserData(
            user._id.toString(),
            values
          );
          alert(response.data.message);
          navigate(0);
          resetForm();
        } catch (error) {
          alert(error.response ? error.response.data.message : error.message);
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      {(formik) => {
        const handlePhoneChange = (value) => {
          formik.setFieldValue("phone", value);
        };
        return (
          <form onSubmit={formik.handleSubmit}>
            <div className="container-md-6">
              <div className="row">
                <div
                  className="col border rounded p-4"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="row justify-content-center mt-2">
                    <div className="col">
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
                    <div className="col">
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
                    <div className="col">
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
                        <div className="col">
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
                        <div className="col">
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
                        <div className="col">
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
                    <div className="col">
                      <div className=" d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-outline-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div class="d-flex justify-content-center">
                              <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          ) : (
                            "Save changes"
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

export default EditUserData;
