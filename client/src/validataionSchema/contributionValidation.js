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
  );

export const contributionValidationSchema = Yup.object({
  name: Yup.string().default("NA"),
  address: Yup.string().default("NA"),
  phone: Yup.string()

    .transform((value, originalValue) => (originalValue === "" ? "NA" : value))

    .matches(phoneRegex, "Phone number is not valid"),

  description: Yup.string().default("NA"),
  file: fileSchema.required("Image of reuniteseeker should be required"),
});
