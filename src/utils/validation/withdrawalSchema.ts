import * as Yup from "yup";

/** Validation schema for withdrawal form */
export const withdrawalValidationSchema = (availableBalance: number) =>
  Yup.object().shape({
    accountHolderName: Yup.string()
      .required("اسم صاحب الحساب مطلوب")
      .test("is-full-name", "الرجاء إدخال الاسم الرباعي بالكامل", (value) => {
        if (!value) return false;
        const words = value.trim().split(/\s+/);
        return words.length >= 4;
      }),
    bankName: Yup.string().required("اسم البنك مطلوب"),
    iban: Yup.string()
      .required("رقم الآيبان مطلوب")
      .matches(/^SA\d{22}$/, "الآيبان يجب أن يبدأ بـ SA ويتبعه 22 رقمًا"),
    withdrawalAmount: Yup.number()
      .required("قيمة السحب مطلوبة")
      .min(100, "الحد الأدنى للسحب هو 100 ريال")
      .max(availableBalance, `الحد الأقصى للسحب هو ${availableBalance} ريال`),
  });
