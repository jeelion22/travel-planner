import * as Yup from "yup";

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const adminCreateValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, "* Username must be atleast 3 characters.")
    .max(8, "* Username should not exceed 8 charectors.")
    .required("* Username must be required."),
  firstname: Yup.string()
    .min(3, "* First name must be atleast 3 characters.")
    .max(12, "* Firstname name should not exceed 12 characters.")
    .required("* First name should not empty."),
  lastname: Yup.string()
    .min(1, "* Last name should be at least 1 character.")
    .max(15, "* Last name should not exceed 15 characters.")
    .required("* Last name should not empty."),
  email: Yup.string()
    .email("* Invalid email address.")
    .required("* Email address should not be empty."),

  phone: Yup.string()
    .transform((value, originalValue) => (originalValue === "" ? "NA" : value))
    .matches(phoneRegex, "Phone number is not valid")
    .required("* Phone number should not be empty."),

  password: Yup.string()
    .required("* Passwod should not be empty")
    .min(8, "* Password must be at leaset mix of 8 characters long.")
    .matches(/[0-9]/, "Password requires anumber.")
    .matches(/[a-z]/, "Password requires a lowercase letter.")
    .matches(/[A-Z]/, "Password requires a upercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: Yup.string()
    .required("* Confirm password should not be empty")
    .oneOf(
      [Yup.ref("password"), null],
      "* The passwords do not match. Please try again."
    ),

  role: Yup.string().required("Role should be selected").default("admin"),
  permissions: Yup.array()
    .of(
      Yup.string().oneOf(
        ["read", "write", "delete", "update"],
        "Invalid permissions selected."
      )
    )

    .test(
      "at-least-one-permission",
      "At least one permission must be selected.",
      (value) => value.length > 0
    ),
});
