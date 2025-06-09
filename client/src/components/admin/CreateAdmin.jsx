import "../../styles/CreateAdmin.css";
import React from "react";
import { Formik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import userServices from "../../../services/userServices";
import { adminCreateValidationSchema } from "../../validataionSchema/adminCreateValidationSchema";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const initialValues = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "admin",
  permissions: [],
};

const CreateAdmin = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={adminCreateValidationSchema}
      onSubmit={async (values, { resetForm }) => {
        const { confirmPassword, ...adminValues } = values;

        try {
          const response = await userServices.createAdmin(adminValues);
          console.log(adminValues);

          alert(response.data.message);
          resetForm();
        } catch (error) {
          alert(error.response.data.message);
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
              <div className="row p-4 border bg-light rounded">
                <div className="col">
                  <div className="row justify-content-center text-center mt-4">
                    <div className="col border-bottom shadow-sm p-2">
                      <h4>Create Admin</h4>
                    </div>
                  </div>

                  <div className="row justify-content-center mt-4">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="username"
                        id="username"
                        {...formik.getFieldProps("username")}
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <div className="text-danger">
                          {formik.errors.username}
                        </div>
                      ) : null}
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
                    <div className="col">
                      <PhoneInput
                        className="form-control d-flex phone-input-no-border"
                        placeholder="Enter phone number"
                        value={formik.values.phone}
                        onChange={handlePhoneChange}
                      />

                      {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-danger">{formik.errors.phone}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row justify-content-center mt-4">
                    <div className="col">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="password"
                        id="password"
                        {...formik.getFieldProps("password")}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div className="col">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        aria-label="confirmPassword"
                        id="confirmPassword"
                        {...formik.getFieldProps("confirmPassword")}
                      />
                      {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword ? (
                        <div className="text-danger">
                          {formik.errors.confirmPassword}
                        </div>
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
                      {formik.touched.role && formik.errors.role ? (
                        <div className="text-danger">{formik.errors.role}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row justify-content-center mt-3">
                    <div className="col">
                      <div className="d-flex justify-content-between">
                        <p> Checkout permissions:</p>
                      </div>

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
                    {formik.touched.permissions && formik.errors.permissions ? (
                      <div className="text-danger">
                        {formik.errors.permissions}
                      </div>
                    ) : null}
                  </div>

                  <div className="row justify-content-center mt-3">
                    <div className="col-auto">
                      <button type="submit" className="btn btn-outline-primary">
                        Create Admin
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

export default CreateAdmin;
