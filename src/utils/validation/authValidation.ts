import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("البريد الإلكتروني غير صالح")
    .trim()
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .trim()
    .min(8, "يجب أن لا تقل كلمة المرور عن 8 أحرف")
    .required("كلمة المرور مطلوبة"),
});

export const registerSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .required("اسم المستخدم مطلوب")
    .matches(
      /^[a-z ]+$/,
      "يجب أن يحتوي الاسم على حروف صغيرة فقط بدون أرقام أو رموز"
    )
    .min(4, "يجب أن يكون اسم المستخدم 4 أحرف على الأقل")
    .max(15, "يجب أن لا يتجاوز اسم المستخدم 15 حرف"),
  email: Yup.string()
    .trim()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .trim()
    .required("كلمة المرور مطلوبة")
    .min(8, "يجب أن تكون كلمة المرور8 أحرف على الأقل")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      "يجب أن تحتوي كلمة المرور على أحرف وأرقام"
    ),
  university: Yup.string().optional(),
});

export const updateSchema = Yup.object({
  university: Yup.string().optional(),
});
export const passwordSchema = Yup.object({
  password: Yup.string().required("كلمه المرور مطلوبه"),
  confirmPassword: Yup.string().required("تاكيد كلمه المرور مطلوب "),
});
export const resetPasswordValidation = Yup.object({
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تتكون من 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "كلمتا المرور غير متطابقتين")
    .required("تأكيد كلمة المرور مطلوب"),
});

export const validationForgetPassword = Yup.object({
  email: Yup.string()
    .email("يرجى إدخال بريد إلكتروني صحيح")
    .required("البريد الإلكتروني مطلوب"),
});
