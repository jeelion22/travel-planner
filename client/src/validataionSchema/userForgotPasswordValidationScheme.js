import * as Yup from "yup";

export const userForgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email("* Invalid email address")
    .required("* Email address should not empty."),
});
