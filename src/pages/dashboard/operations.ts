import { AppError } from "../../customError";
import {
  type CreateUrlFunction,
} from "../../types";
import { request } from "../../utils/axiosUtil";



export const createUrl = async ({
  url,
}: {
  url: string;
}): Promise<CreateUrlFunction> => {
  try {
    const urlData: { success: boolean; shortUrl: string; expiresAt: Date } =
      await request({url: "/api/generate-url",method: "POST",data: { url },withCredentials:true,headers:{"Content-Type": "application/json"}});
    return {
      success: true,
      shortUrl: urlData.shortUrl,
      expiresAt: urlData.expiresAt,
    };
  } catch (error: any) {
    if ("errorType" in error) {
      throw new AppError(error.message, error.errorType, error.result);
    } else {
      throw new Error("unexpted error");
    }
  }
};
