import * as Yup from "yup";

export const userLoginValidation = Yup.object({
  email: Yup.string()
    .email("** Invalid email address")
    .required("* Email address should not empty."),
  password: Yup.string().required("* Password should not empty."),
});
