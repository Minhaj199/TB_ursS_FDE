import type { ValidateFormParams } from "../../types";

export const validateField = (
  field: string,
  value: string,
  currentSchema: any
): string | null => {
  if (field in currentSchema) {
    const result = (currentSchema as any)[field].safeParse(value);
    return result.success ? null : result.error!.issues[0].message;
  }
  return null;
};

export const validateForm = ({
  isLogin,
  currentSchema,
  email,
  phone,
  password,
  setErrors,
  setTouched,
}: ValidateFormParams): boolean => {
  let userNameError: string | null = null;
  let emailError: string | null = null;
  let passwordError;
  let phoneError = null;
  if (isLogin) {
    userNameError = validateField("username", email, currentSchema);
    passwordError = validateField("password", password, currentSchema);
  } else {
    emailError = validateField("email", email, currentSchema);

    passwordError = validateField("password", password, currentSchema);
    phoneError = validateField("phone", phone, currentSchema);
  }
  const newErrors = {
    email: emailError,
    password: passwordError,
    phone: phoneError,
    username: userNameError,
  };
  setErrors(newErrors);
  setTouched({
    email: true,
    password: true,
    phone: true,
  });

  return (
    !emailError && !passwordError && !userNameError && (isLogin || !phoneError)
  );
};
