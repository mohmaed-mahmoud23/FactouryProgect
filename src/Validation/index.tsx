import * as yup from "yup";
export const Rgester = yup
  .object({
    name: yup.string().required("user name requierd").min(5, "user name min 5"),
    password: yup
      .string()
      .required("passwors is requaierd")
      .min(5, "pasword must 5"),
    email: yup
      .string()
      .required("email is requaierd")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "email not valid"),
    userType: yup
      .mixed<"عميل" | "تاجر" | "صاحب مصنع">()
      .oneOf(["عميل", "تاجر", "صاحب مصنع"])
      .required("من فضلك اختر نوع المستخدم"),
  })
  .required();

export const Loginscema = yup
  .object({
    password: yup
      .string()
      .required("passwors is requaierd")
      .min(5, "pasword must 5"),
    email: yup
      .string()
      .required("email is requaierd")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "email not valid"),
  })
  .required();
