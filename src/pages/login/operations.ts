import { AppError } from "../../customError";
import type { ILoginAuth, ISignup, LoginResponse, ResetFormProbs, SubmitFormAthentication } from "../../types";
import { request } from "../../utils/axiosUtil";
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
  if (!validateForm({isLogin,currentSchema,email,password,phone,setErrors,setTouched, }))
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


/////////////////////////// submitting user entered data
export const loginAuthentication = async ({
  data,
}: ILoginAuth): Promise<LoginResponse> => {
  try {
    const userData: LoginResponse = await request({url: "/api/login",method: "post",data,withCredentials:true,headers:{"Content-Type": "application/json"}});
  

    return userData;
  } catch (error: any) {
    if ("errorType" in error) {
      throw new AppError(error.message, error.errorType, error.result);
    } else {
      throw new Error("unexpted error");
    }
  }
};
export const signUpUser = async ({
  data,
}: ISignup): Promise<{ success: boolean }> => {
  try {
    const userData: { success: boolean } = await request({
      url: "/api/signup",
      method: "POST",
      data,
      withCredentials:true,headers:{"Content-Type": "application/json"}
    });

    return userData;
  } catch (error: any) {
    if ("errorType" in error) {
      throw new AppError(error.message, error.errorType, error.result);
    } else {
      throw new Error("unexpted error");
    }
  }
};