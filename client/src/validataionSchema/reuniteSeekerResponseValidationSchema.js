import * as Yup from "yup";

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const reuniteSeekerResponseValidationSchema = Yup.object().shape({
  relationship: Yup.string().required(
    "Please specify your relationship with the person"
  ),

  lastSeen: Yup.date().required("Last seen date must be entered"),

  purpose: Yup.string().required("Describe your purpose"),

  contactNo: Yup.string()
    .required("** Your contact number is required for further communication")
    .matches(phoneRegex, "* Invalid contact number."),

  meetingDate: Yup.date().required("Meeting date must be entered"),

  willUpdate: Yup.bool().oneOf([true]),
});
