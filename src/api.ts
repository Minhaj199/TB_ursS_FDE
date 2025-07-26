import { AppError } from "./customError";
import { type ILoginAuth, type ISignup, type LoginResponse } from "./types";
import { request } from "./utils/axiosUtil";

export const loginAuthentication = async ({
  data,
}: ILoginAuth): Promise<LoginResponse> => {
  try {
    const userData: LoginResponse = await request({
      url: "/api/login",
      method: "POST",
      data,
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
export const signUpUser = async ({
  data,
}: ISignup): Promise<{ success: boolean }> => {
  try {
    const userData: { success: boolean } = await request({
      url: "/api/signup",
      method: "POST",
      data,
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
