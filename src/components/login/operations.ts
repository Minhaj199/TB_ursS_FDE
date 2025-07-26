import type { ResetFormProbs, SubmitFormAthentication } from "../../types";
import { validateForm } from "./validation";
//////////////submitin login and signup
export const handleSubmit = ({
  isLogin,
  currentSchema,
  email,
  password,
  phone,
  setErrors,
  setTouched,
  loginMutaion,
  signupMutaion,
}: SubmitFormAthentication): void => {
  if (
    !validateForm({
      isLogin,
      currentSchema,
      email,
      password,
      phone,
      setErrors,
      setTouched,
    })
  )
    return;
  if (isLogin) {
    loginMutaion.mutate({ username: email, password });
  } else {
    signupMutaion.mutate({ email, password, phone });
  }
};

//////////////reseting page////////////
export const resetForm = ({
  setEmail,
  setPassword,
  setPhoneNumber,
  setErrors,
  setTouched,
}: ResetFormProbs): void => {
  setEmail("");
  setPassword("");
  setPhoneNumber("");
  setErrors({});
  setTouched({});
};
