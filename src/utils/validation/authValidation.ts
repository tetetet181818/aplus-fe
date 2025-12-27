import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صالح'),
  password: z
    .string()
    .trim()
    .min(1, 'كلمة المرور مطلوبة')
    .min(8, 'يجب أن لا تقل كلمة المرور عن 8 أحرف'),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'اسم المستخدم مطلوب')
    .min(4, 'يجب أن يكون اسم المستخدم 4 أحرف على الأقل')
    .max(15, 'يجب أن لا يتجاوز اسم المستخدم 15 حرف')
    .regex(
      /^[a-z\u0600-\u06FF ]+$/i,
      'يجب أن يحتوي الاسم على حروف فقط بدون أرقام أو رموز'
    ),
  email: z
    .string()
    .trim()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صالح'),
  password: z
    .string()
    .trim()
    .min(1, 'كلمة المرور مطلوبة')
    .min(8, 'يجب أن تكون كلمة المرور8 أحرف على الأقل')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      'يجب أن تحتوي كلمة المرور على أحرف وأرقام'
    ),
  university: z.string().optional(),
});

export const updateSchema = z.object({
  university: z.string().optional(),
});

export const passwordSchema = z.object({
  password: z.string().min(1, 'كلمه المرور مطلوبه'),
  confirmPassword: z.string().min(1, 'تاكيد كلمه المرور مطلوب '),
});

export const resetPasswordValidation = z
  .object({
    password: z
      .string()
      .min(1, 'كلمة المرور مطلوبة')
      .min(6, 'كلمة المرور يجب أن تتكون من 6 أحرف على الأقل'),
    confirmPassword: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

export const validationForgetPassword = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('يرجى إدخال بريد إلكتروني صحيح'),
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
