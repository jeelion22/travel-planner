import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBudgetUpdateStatus,
  selectTrip,
  selectTripStatus,
  updateBudget,
} from "./tripSlice";
import { currencyOptions } from "./currency";
import { useNavigate } from "react-router-dom";

const EditBudget = () => {
  const tripId = useSelector(selectTrip)._id;
  const budget = useSelector(selectTrip).budget;

  const status = useSelector(selectBudgetUpdateStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const budgetValidationSchema = Yup.object({
    currency: Yup.string().required("* Currency type required"),
    transportationBudget: Yup.number()
      .min(0, "* Amount must be a non-negative number")
      .required("* Amount required"),
    accommodationBudget: Yup.number()
      .min(0, "* Amount must be a non-negative number")
      .required("* Amount required"),
    foodBudget: Yup.number()
      .min(0, "* Amount must be a non-negative number")
      .required("* Amount required"),
    otherBudget: Yup.number()
      .min(0, "* Amount must be a non-negative number")
      .required("* Amount required"),

    transportation: Yup.number()
      .min(0, "* Amount must be a non-negative number")
      .required("* Amount required"),
    accommodation: Yup.number()
      .min(0, "* Amount must be a non-negative number")
      .required("* Amount required"),
    food: Yup.number()
      .min(0, "* Amount must be a non-negative number")
      .required("* Amount required"),
    other: Yup.number()
      .min(0, "* Amount must be a non-negative number")
      .required("* Amount required"),
  });

  return (
    <Formik
      initialValues={budget}
      validationSchema={budgetValidationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        dispatch(updateBudget({ tripId, budget: values }))
          .unwrap()
          .then(() => {
            alert("Budget updated successfully!");
            resetForm();

            navigate(0);
          })
          .catch((err) => {
            alert(err);
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {(formik) => (
        <>
          <Form onSubmit={formik.handleSubmit}>
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="form-floating mb-3">
                    <Field
                      as="select"
                      name="currency"
                      id="currency"
                      className={`form-select ${
                        formik.touched.currency
                          ? formik.errors.currency
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                    >
                      {currencyOptions.map((currency, index) => (
                        <option key={index} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </Field>
                    <label htmlFor="currency">Currency</label>
                    <ErrorMessage
                      name="currency"
                      className="text-danger"
                      component="div"
                    />
                  </div>
                  <div className="row">
                    <div className="col">
                      <h6>Original Budget</h6>

                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            type="number"
                            name="transportationBudget"
                            className={`form-control  ${
                              formik.touched.transportationBudget
                                ? formik.errors.transportationBudget
                                  ? "is-invalid"
                                  : "is-valid"
                                : ""
                            }`}
                            id="transportationBudget"
                            placeholder="transportationBudget"
                          />
                          <label htmlFor="transportationBudget">
                            transportation
                          </label>
                          <ErrorMessage
                            name="transportationBudget"
                            className="text-danger"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            type="number"
                            name="accommodationBudget"
                            className={`form-control ${
                              formik.touched.accommodationBudget
                                ? formik.errors.accommodationBudget
                                  ? "is-invalid"
                                  : "is-valid"
                                : ""
                            }`}
                            id="accommodationBudget"
                            placeholder="accommodationBudget"
                          />
                          <label htmlFor="accommodationBudget">
                            Accommodation
                          </label>
                          <ErrorMessage
                            name="accommodationBudget"
                            className="text-danger"
                            component="div"
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            type="number"
                            name="foodBudget"
                            className={`form-control ${
                              formik.touched.foodBudget
                                ? formik.errors.foodBudget
                                  ? "is-invalid"
                                  : "is-valid"
                                : ""
                            }`}
                            id="foodBudget"
                            placeholder="foodBudget"
                          />
                          <label htmlFor="foodBudget">Food</label>
                          <ErrorMessage
                            name="foodBudget"
                            className="text-danger"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            type="number"
                            name="otherBudget"
                            className={`form-control ${
                              formik.touched.otherBudget
                                ? formik.errors.otherBudget
                                  ? "is-invalid"
                                  : "is-valid"
                                : ""
                            }`}
                            id="otherBudget"
                            placeholder="otherBudget"
                          />
                          <label htmlFor="otherBudget">Other</label>
                          <ErrorMessage
                            name="otherBudget"
                            className="text-danger"
                            component="div"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <h6>Actual Spent</h6>

                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            type="number"
                            name="transportation"
                            className={`form-control  ${
                              formik.touched.transportation
                                ? formik.errors.transportation
                                  ? "is-invalid"
                                  : "is-valid"
                                : ""
                            }`}
                            id="transportation"
                            placeholder="transportation"
                          />
                          <label htmlFor="transportation">transportation</label>
                          <ErrorMessage
                            name="transportation"
                            className="text-danger"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            type="number"
                            name="accommodation"
                            className={`form-control ${
                              formik.touched.accommodation
                                ? formik.errors.accommodation
                                  ? "is-invalid"
                                  : "is-valid"
                                : ""
                            }`}
                            id="accommodation"
                            placeholder="accommodation"
                          />
                          <label htmlFor="accommodation">Accommodation</label>
                          <ErrorMessage
                            name="accommodation"
                            className="text-danger"
                            component="div"
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            type="number"
                            name="food"
                            className={`form-control ${
                              formik.touched.food
                                ? formik.errors.food
                                  ? "is-invalid"
                                  : "is-valid"
                                : ""
                            }`}
                            id="food"
                            placeholder="food"
                          />
                          <label htmlFor="food">Food</label>
                          <ErrorMessage
                            name="food"
                            className="text-danger"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            type="number"
                            name="other"
                            className={`form-control ${
                              formik.touched.other
                                ? formik.errors.other
                                  ? "is-invalid"
                                  : "is-valid"
                                : ""
                            }`}
                            id="other"
                            placeholder="other"
                          />
                          <label htmlFor="other">Other</label>
                          <ErrorMessage
                            name="other"
                            className="text-danger"
                            component="div"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-outline-success rounded-pill mt-3"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          area-hidden="true"
                        ></span>{" "}
                        <span role="status">Saving...</span>
                      </>
                    ) : (
                      "Save channges"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default EditBudget;
