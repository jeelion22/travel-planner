import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import { updateContributionValidationSchema } from "../validataionSchema/updateContributionValidationSchema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import userServices from "../../services/userServices";
import PhoneField from "./PhoneField";

const UpdateSeekerData = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { editFields, contribution } = state;

  const fields = Object.keys(editFields).filter(
    (key) => editFields[key] != false
  );
  console.log(fields);

  return (
    <>
      <Formik
        initialValues={{
          name: contribution.name || "",
          address: contribution.address || "",
          phone: contribution.phone || "",
          description: contribution.description || "",
          file: null,
        }}
        validationSchema={updateContributionValidationSchema(fields)}
        onSubmit={async (values, { resetForm }) => {
          const formData = new FormData();
          if (values.name) formData.append("name", values.name);
          if (values.address) formData.append("address", values.address);
          if (values.phone) formData.append("phone", values.phone);
          if (values.description)
            formData.append("description", values.description);

          if (values.file) {
            formData.append("file", values.file);
          }

          try {
            setLoading(true);
            const response = await userServices.updateContribution(
              contribution._id.toString(),
              formData
            );

            alert(response.data.message);

            navigate("/users/contributions");
          } catch (error) {
            console.log(error);
            alert(error.response.data.message);
          } finally {
            setLoading(false);
            resetForm();
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div
              className="container-md-12 border rounded p-5 text-white bg-opacity-50"
              style={{
                backgroundColor: "#6f42c1",
              }}
            >
              <div className="row">
                <div className="col-md-12 text-end">
                  <FontAwesomeIcon
                    className="btn btn-outline-light"
                    type="button"
                    icon={faRectangleXmark}
                    // style={{ fontSize: "36px" }}
                    onClick={() => {
                      navigate("/users/contributions");
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="row text-center mt-1">
                    <div className="col-md-6">
                      <h4>Update Reunite Seeker Details</h4>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-7 p-4 border rounded bg-dark bg-opacity-50">
                      {fields.map((field) => {
                        return (
                          <>
                            {field === "name" && (
                              <div className="row  mt-4">
                                <div className="col-md-12">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    aria-label="name"
                                    id="name"
                                    {...formik.getFieldProps("name")}
                                  />
                                  {formik.touched.name && formik.errors.name ? (
                                    <div className="text-danger">
                                      {formik.errors.name}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            )}

                            {field === "address" && (
                              <div className="row  mt-3">
                                <div className="col-md-12">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Address"
                                    aria-label="address"
                                    id="address"
                                    {...formik.getFieldProps("address")}
                                  />
                                  {formik.touched.address &&
                                  formik.errors.address ? (
                                    <div className="text-danger">
                                      {formik.errors.address}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            )}

                            {field === "phone" && (
                              <div className="row mt-3">
                                <div className="col-md-12">
                                  <Field
                                    className="form-control d-flex phone-input-no-border"
                                    name="phone"
                                    component={PhoneField}
                                  />
                                </div>
                              </div>
                            )}

                            {field === "photograph" && (
                              <div className="row  mt-3">
                                <div className="col-md-12">
                                  <input
                                    type="file"
                                    className="form-control"
                                    aria-label="file"
                                    id="file"
                                    onChange={(event) => {
                                      formik.setFieldValue(
                                        "file",
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                  {formik.touched.file && formik.errors.file ? (
                                    <div className="text-danger">
                                      {formik.errors.file}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            )}

                            {field === "description" && (
                              <div className="row  mt-3">
                                <div className="col-md-12">
                                  <textarea
                                    className="form-control"
                                    placeholder="Description"
                                    aria-label="description"
                                    id="description"
                                    rows={5}
                                    {...formik.getFieldProps("description")}
                                  />
                                  {formik.touched.description &&
                                  formik.errors.description ? (
                                    <div className="text-danger">
                                      {formik.errors.description}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                      <div className="row mt-3 text-center ">
                        <div className="col-md-12">
                          <button type="submit" className="btn btn-primary">
                            {loading ? (
                              <FontAwesomeIcon icon={faSpinner} spinPulse />
                            ) : (
                              "Submit"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className="col-md-5 text-start border rounded bg-body-tertiary text-dark p-2"
                      style={{
                        height: "50%",
                      }}
                    >
                      <ul>
                        <li>Name, Address, and Phone are optional</li>
                        <li>
                          The picture of reunite seeker should be either of the
                          following format
                          <ul>
                            <li>jpeg, png, or gif</li>
                            <li>Size should not exceed 5MB</li>
                          </ul>
                        </li>
                        <li>
                          <span className="text-danger">**</span>
                          <em>
                            The picture should be taken with location enabled.
                          </em>
                        </li>
                      </ul>
                      <p>
                        ( <span className="text-danger">*</span>{" "}
                        <em>
                          {" "}
                          The picture to be upload should not be shared via
                          WhatsApp){" "}
                        </em>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default UpdateSeekerData;
