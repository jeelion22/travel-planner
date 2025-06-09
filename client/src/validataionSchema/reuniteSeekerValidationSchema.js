import * as Yup from "yup";

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const reuniteSeekerValidationSchema = Yup.object({
  firstname: Yup.string()
    .min(3, "* First name must be at least 3 characters.")
    .max(12, "* First name should not exceed 12 characters.")
    .required("* First name should not be empty."),
  lastname: Yup.string()
    .min(1, "* Last name should be at least 1 character.")
    .max(15, "* Last name should not exceed 15 characters.")
    .required("* Last name should not be empty."),
  email: Yup.string()
    .email("* Invalid email address.")
    .required("* Email address should not be empty."),
  phone: Yup.string()
    .required("* Phone number is required")
    .matches(phoneRegex, "* Phone number is not valid"),
  userCategory: Yup.string().required("* Please select user category"),
  address: Yup.string().required("* Please enter full address"),
  authorizedIdType: Yup.string().required("* Please select ID Type"),
  authorizedIdNo: Yup.string().required("* Please enter valid ID number"),
});
