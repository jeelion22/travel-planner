import React from "react";
import { Formik } from "formik";
import { CommunityUploaderValidationSchema } from "../validataionSchema/CommunityUploaderValidationSchema";
import userServices from "../../services/userServices";
import { useNavigate } from "react-router-dom";

const initialValuesForCommunityUploader = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  userCategory: "",
};

const CommunityUploader = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValuesForCommunityUploader}
      validationSchema={CommunityUploaderValidationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (userCategory) values.append(userCategory);

        try {
          const response = await userServices.register(values);
          alert(response.data.message);
          navigate("/users/login");
          navigate(0);
          resetForm();
        } catch (error) {
          alert(error.response.data.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
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
                <div className="text-danger">{formik.errors.firstname}</div>
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
                <div className="text-danger">{formik.errors.lastname}</div>
              ) : null}
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
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>

          <div className="row justify-content-center mt-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Phone e.g. +919677061448"
                aria-label="phone"
                id="phone"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-danger">{formik.errors.phone}</div>
              ) : null}
            </div>
          </div>

          <div className="col-md-3 justify-content-end">
            <div className=" d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Create An Account
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CommunityUploader;
