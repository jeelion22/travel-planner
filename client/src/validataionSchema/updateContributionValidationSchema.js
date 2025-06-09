import * as Yup from "yup";

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const fileSchema = Yup.mixed()
  .test(
    "fileSize",
    "File is too large",
    (value) => !value || value.size <= 5 * 1024 * 1024
  ) // 5MB limit
  .test(
    "fileType",
    "Unsupported file format",
    (value) =>
      !value || ["image/jpeg", "image/png", "image/gif"].includes(value.type)
  )
  .required("Image of reuniteSeeker is required");

export const updateContributionValidationSchema = (fields) => {
  const schema = {
    name: Yup.string().default("NA"),
    address: Yup.string().default("NA"),
    phone: Yup.string()
      .required("* Phone number is required")
      .matches(phoneRegex, "* Phone number is not valid"),

    description: Yup.string().default("NA"),
    file: fileSchema,
  };
  const filteredSchema = Object.keys(schema).reduce((acc, key) => {
    if (fields.includes(key)) {
      acc[key] = schema[key];
    }
    return acc;
  }, {});

  return Yup.object(filteredSchema);
};
