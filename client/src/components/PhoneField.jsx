import React from "react";
import { Field, ErrorMessage } from "formik";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const PhoneField = ({ field, form, ...props }) => {
  return (
    <div>
      <PhoneInput
        placeholder="Enter your contact number"
        defaultCountry="IN"
        international
        {...field}
        {...props}
        value={field.value}
        onChange={(value) => form.setFieldValue(field.name, value)}
      />
      <ErrorMessage name={field.name} component="div" className="text-danger" />
    </div>
  );
};

export default PhoneField;
