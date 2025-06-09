import { Field, Formik } from "formik";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

const EditSeekerData = ({ setEdit, contribution }) => {
  const navigate = useNavigate();
  const [editFields, setEditFields] = useState(null);

  return (
    <Formik
      initialValues={{
        name: false,
        address: false,
        phone: false,
        description: false,
        photograph: false,
      }}
      j
      onSubmit={(values, { resetForm }) => {
        setEditFields(values);

        resetForm();
        navigate(`/users/contributions/edit/${contribution._id}`, {
          state: { editFields: values, contribution },
        });
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="border rounded mt-2 p-2">
            <div className="text-end">
              <FontAwesomeIcon
                className="btn btn-outline-dark"
                type="button"
                icon={faRectangleXmark}
                onClick={() => {
                  setEdit(false);
                }}
              />
            </div>
            <div className="d-flex justify-content-between">
              <p> Which of the following field(s) to be updated?</p>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="name"
                {...formik.getFieldProps("name")}
              />
              <label class="form-check-label" htmlFor="name">
                Name
              </label>
            </div>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="address"
                {...formik.getFieldProps("address")}
              />

              <label class="form-check-label" htmlFor="address">
                Address
              </label>
            </div>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="phone"
                {...formik.getFieldProps("phone")}
              />
              <label class="form-check-label" htmlFor="phone">
                Phone
              </label>
            </div>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="description"
                {...formik.getFieldProps("description")}
              />
              <label class="form-check-label" htmlFor="description">
                Description
              </label>
            </div>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="photograph"
                {...formik.getFieldProps("photograph")}
              />
              <label class="form-check-label" htmlFor="photograph">
                Photograph
              </label>
            </div>

            <button
              type="submit"
              class="btn btn-outline-primary"
              disabled={Object.values(formik.values).every(
                (value) => value === false
              )}
            >
              Proceed
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EditSeekerData;
