import * as Yup from 'yup'

export const editWithdrawalValidationSchema = Yup.object().shape({
  accountName: Yup.string()
    .trim()
    .required('اسم صاحب الحساب مطلوب')
    .matches(
      /^[a-z\u0600-\u06FF ]+$/i,
      'يجب أن يحتوي الاسم على حروف فقط بدون أرقام أو رموز'
    )
    .min(4, 'يجب أن يكون اسم المستخدم 4 أحرف على الأقل')
    .max(30, 'يجب أن لا يتجاوز اسم المستخدم 30 حرف'),

  bankName: Yup.string().trim().required('اسم البنك مطلوب'),
  iban: Yup.string()
    .trim()
    .required('رقم الحساب (IBAN) مطلوب')
    .matches(/^SA\d{22}$/, 'رقم الحساب (IBAN) غير صالح'),
  amount: Yup.number()
    .required('المبلغ مطلوب')
    .min(50, 'يجب أن يكون المبلغ 50 ريال على الأقل'),
})
