import "../styles/UserRegister.css";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import userServices from "../../services/userServices";
import { CommunityUploaderValidationSchema } from "../validataionSchema/CommunityUploaderValidationSchema";
import { reuniteSeekerValidationSchema } from "../validataionSchema/reuniteSeekerValidationSchema";

import PhoneField from "./PhoneField";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  userCategory: "",
  address: "",
  authorizedIdType: "",
  authorizedIdNo: "",
};

const UserRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [validationSchema, setValidationSchema] = useState(
    CommunityUploaderValidationSchema
  );

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
          setIsLoading(true);
          const response = userServices.register(values);
          alert((await response).data.message);
          navigate("/");
          resetForm();
        } catch (error) {
          setIsLoading(false);
          alert(error.response.data.message);
        }
      }}
    >
      {(formik) => {
        return (
          <Form onSubmit={formik.handleSubmit}>
            <div className="container ">
              <div className="row  justify-content-center p-4 mt-2 user-register">
                <div className="col col-lg-8 border">
                  <div className="row text-center">
                    <div className="col">
                      <h4 className="user-register-header">Register</h4>
                    </div>
                  </div>

                  <div className="row justify-content-center mt-4">
                    <div className="col">
                      <Field
                        name="firstname"
                        className="form-control"
                        placeholder="Firstname"
                      />
                      <ErrorMessage
                        className="text-danger"
                        name="firstname"
                        component="div"
                      />
                    </div>
                    <div className="col">
                      <Field
                        name="lastname"
                        placeholder="Lastname"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="lastname"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center mt-3">
                    <div className="col">
                      <Field
                        name="email"
                        className="form-control"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="row justify-content-center mt-3">
                    <div className="col">
                      <Field
                        name="phone"
                        className="form-control d-flex phone-input-no-border"
                        component={PhoneField}
                      />
                    </div>
                  </div>

                  <div className="row justify-content-center mt-3">
                    <div className="col">
                      <select
                        className="form-select"
                        aria-label="category"
                        {...formik.getFieldProps("userCategory")}
                        onChange={(e) => {
                          formik.handleChange(e);
                          setSelectedCategory(e.target.value);
                        }}
                      >
                        <option value="" disabled>
                          Select category
                        </option>
                        <option value="communityUploader">
                          Community Uploader
                        </option>
                        <option value="reuniteSeeker">Reunite Seeker</option>
                        {/* <option value="both">Both</option> */}
                      </select>
                      {formik.touched.userCategory &&
                      formik.errors.userCategory ? (
                        <div className="text-danger">
                          {formik.errors.userCategory}
                        </div>
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

                  <div className="row justify-content-around mt-3">
                    <div className="col-auto p-1">
                      <span>Already have an account? </span>
                      <span>
                        <Link to={"/users/login"}>Log In</Link>
                      </span>
                    </div>

                    <div className="col-auto p-1">
                      <button
                        type="submit"
                        className="btn btn-outline-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span
                              class="spinner-border spinner-border-sm"
                              aria-hidden="true"
                            ></span>
                            <span role="status">Creating...</span>
                          </>
                        ) : (
                          "Create An Account"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserRegister;
