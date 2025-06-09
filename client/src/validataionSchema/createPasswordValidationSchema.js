import * as Yup from "yup";

export const createPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .required("* Passwod should not be empty")
    .min(8, "Password must be at leaset mix of 8 characters long.")
    .matches(/[0-9]/, "Password requires anumber.")
    .matches(/[a-z]/, "Password requires a lowercase letter.")
    .matches(/[A-Z]/, "Password requires a upercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: Yup.string()
    .required("** Confirm password should not be empty")
    .oneOf(
      [Yup.ref("password"), null],
      "* The passwords do not match. Please try again."
    ),
});
