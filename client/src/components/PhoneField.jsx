import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const PhoneField = ({ field, form, meta, ...props }) => {
  const [showInput, setShowInput] = useState(false);

  const handleFocus = () => {
    setShowInput(true);
  };

  return (
    <div className="form-floating border rounded">
      {showInput ? (
        <PhoneInput
          style={{
            "--PhoneInputCountryFlag-height": "16px",
            "--PhoneInputCountryFlag-borderColor": "gray",
          }}
          international
          {...field}
          {...props}
          value={field.value}
          onChange={(value) => form.setFieldValue(field.name, value)}
          id="phone"
        />
      ) : (
        <input
          type="text"
          className="form-control"
          id="phone"
          onFocus={handleFocus}
          placeholder=""
        />
      )}

      <label htmlFor="phone" className="form-label">
        Phone
      </label>

      <ErrorMessage name={field.name} component="div" className="text-danger" />
    </div>
  );
};

export default PhoneField;
