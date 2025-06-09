import "../../styles/EditAdminsData.css";
import React, { useState } from "react";
import { Formik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import userServices from "../../../services/userServices";
import { adminEditValidationSchema } from "../../validataionSchema/adminEditValidationSchema";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const EditAdminsData = ({ admin, getAllAdmins }) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={admin}
      validationSchema={adminEditValidationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          setIsLoading(true);
          const response = await userServices.updateAdmin(
            admin._id.toString(),
            values
          );

          getAllAdmins();

          alert(response.data.message);
          resetForm();
          navigate(0);
        } catch (error) {
          alert(error.response.data.message);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {(formik) => {
        const handlePhoneChange = (value) => {
          formik.setFieldValue("phone", value);
        };
        return (
          <form onSubmit={formik.handleSubmit}>
            <div className="container">
              <div className="row p-4 border rounded">
                <div className="col">
                  <div className="row justify-content-center mt-2">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="username"
                        id="username"
                        {...formik.getFieldProps("username")}
                      />
                      <div className="d-flex">
                        {formik.touched.username && formik.errors.username ? (
                          <div className="text-danger">
                            {formik.errors.username}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="row justify-content-center mt-4">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        aria-label="firstname"
                        id="firstname"
                        {...formik.getFieldProps("firstname")}
                      />
                      <div className="d-flex">
                        {formik.touched.firstname && formik.errors.firstname ? (
                          <div className="text-danger">
                            {formik.errors.firstname}
                          </div>
                        ) : null}
                      </div>
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
                      <div className="d-flex">
                        {formik.touched.lastname && formik.errors.lastname ? (
                          <div className="text-danger">
                            {formik.errors.lastname}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center mt-3">
                    <div className="col">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        aria-label="email"
                        id="email"
                        {...formik.getFieldProps("email")}
                      />
                      <div className="d-flex">
                        {formik.touched.email && formik.errors.email ? (
                          <div className="text-danger">
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>
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

                  <div className="row justify-content-center mt-3">
                    <div className="col">
                      <select
                        className="form-select"
                        aria-label="role"
                        {...formik.getFieldProps("role")}
                      >
                        <option value="" disabled>
                          Select role
                        </option>

                        <option value="admin">Admin</option>
                      </select>
                      <div className="d-flex">
                        {formik.touched.role && formik.errors.role ? (
                          <div className="text-danger">
                            {formik.errors.role}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="row text-start mt-3">
                    <div className="col">
                      <p> Checkout permissions</p>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="read"
                          name="permissions"
                          value="read"
                          checked={formik.values.permissions.includes("read")}
                          onChange={formik.handleChange}
                        />
                        <label className="form-check-label" htmlFor="read">
                          Read
                        </label>
                      </div>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="write"
                          name="permissions"
                          value="write"
                          checked={formik.values.permissions.includes("write")}
                          onChange={formik.handleChange}
                        />

                        <label className="form-check-label" htmlFor="write">
                          Write
                        </label>
                      </div>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="update"
                          name="permissions"
                          value="update"
                          checked={formik.values.permissions.includes("update")}
                          onChange={formik.handleChange}
                        />
                        <label className="form-check-label" htmlFor="update">
                          Update
                        </label>
                      </div>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="delete"
                          name="permissions"
                          value="delete"
                          checked={formik.values.permissions.includes("delete")}
                          onChange={formik.handleChange}
                        />
                        <label className="form-check-label" htmlFor="delete">
                          Delete
                        </label>
                      </div>
                    </div>
                    <div className="d-flex">
                      {formik.touched.permissions &&
                      formik.errors.permissions ? (
                        <div className="text-danger">
                          {formik.errors.permissions}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row justify-content-center mt-3">
                    <div className="col">
                      <select
                        className="form-select"
                        aria-label="status"
                        {...formik.getFieldProps("status")}
                      >
                        <option value="" disabled>
                          Select status
                        </option>

                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="deleted">Deleted</option>
                      </select>
                      <div className="d-flex">
                        {formik.touched.status && formik.errors.status ? (
                          <div className="text-danger">
                            {formik.errors.status}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="row justify-content-center mt-3">
                    <div className="col-auto">
                      <button
                        type="submit"
                        className="btn btn-outline-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div
                            class="spinner-border fs-5 text-light "
                            role="status"
                          >
                            <span class="visually-hidden">Loading...</span>
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
          </form>
        );
      }}
    </Formik>
  );
};

export default EditAdminsData;
