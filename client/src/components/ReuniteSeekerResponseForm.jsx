import "../styles/ReuniteSeekerResponseForm.css";
import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { reuniteSeekerResponseValidationSchema } from "../validataionSchema/reuniteSeekerResponseValidationSchema";
import userServices from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import PhoneField from "./PhoneField";

const ReuniteSeekerResponseForm = ({ contribution }) => {
  const [spinner, setSpinner] = useState(false);
  const [location, setLocation] = useState(false);
  const [loadLocation, setLoadLocation] = useState(false);

  const initialValues = {
    relationship: "",
    otherRelationship: "",
    lastSeen: "",
    purpose: "",
    contactNo: "",
    meetingDate: "",
    willUpdate: false,
  };

  const navigate = useNavigate();
  const handleLocation = async (location) => {
    try {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
      window.location.href = url;
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="container">
      <h2 className="my-4">Fill out the form before accessing the location</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={reuniteSeekerResponseValidationSchema}
        onSubmit={async (values, { resetForm }) => {
          setSpinner(true);
          try {
            const response = await userServices.addVisitor(
              contribution._id,
              values
            );
            resetForm();
            if (response.status === 200) {
              setLocation(true);
              setLoadLocation(true);
            }
          } catch (error) {
            alert(error.response.data.message);
          }
        }}
      >
        {(formik) => {
          return spinner ? (
            <div class="d-flex align-items-center">
              {!location & !loadLocation ? (
                <strong role="status">Submitting your response...</strong>
              ) : (
                <strong role="status">
                  <div className=" text-center">
                    <span>Here is the location</span>
                    <FontAwesomeIcon
                      icon={faMapLocationDot}
                      type="button"
                      className="btn btn-outline-success ms-2"
                      onClick={() => {
                        handleLocation(contribution.location);
                      }}
                    />
                  </div>
                </strong>
              )}
            </div>
          ) : (
            <Form className="needs-validation" onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="relationship" className="form-label">
                  How are you related to the person?
                </label>
                <Field
                  type="string"
                  name="relationship"
                  className="form-control"
                />
                <ErrorMessage
                  name="relationship"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lastSeen" className="form-label">
                  When did you last see that person?
                </label>
                <Field type="date" name="lastSeen" className="form-control" />
                <ErrorMessage
                  name="lastSeen"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="purpose" className="form-label">
                  Purpose of inquiry
                </label>
                <Field
                  type="text"
                  name="purpose"
                  className="form-control"
                  placeholder="Enter purpose"
                />
                <ErrorMessage
                  name="purpose"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="contactNo" className="form-label">
                  Enter your contact number
                </label>
                <Field
                  name="contactNo"
                  component={PhoneField}
                  className="form-control d-flex phone-input-no-border"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="meetingDate" className="form-label">
                  When will you meet or find them?
                </label>
                <Field
                  type="date"
                  name="meetingDate"
                  className="form-control"
                />
                <ErrorMessage
                  name="meetingDate"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <div className="form-check form-switch">
                  <Field
                    type="checkbox"
                    name="willUpdate"
                    className="form-check-input"
                    id="willUpdate"
                  />
                  <label className="form-check-label" htmlFor="willUpdate">
                    Once you find them, will you update or inform us?
                  </label>
                </div>
                <ErrorMessage
                  name="willUpdate"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    !formik.values.willUpdate ||
                    Object.keys(formik.errors).length > 0
                  }
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ReuniteSeekerResponseForm;
