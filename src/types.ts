import type { UseMutationResult } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";

export interface ILoginAuth {
  data: { username: string; password: string };
}
export interface ISignup {
  data: { email: string; password: string; phone: string };
}

export interface User {
  id: number;
  email: string;
  phone?: string;
}



export interface DailyClick {
  date: string;
  clicks: number;
}

export interface GeoData {
  country: string;
  clicks: number;
  color: string;
}

export interface AnalyticsData {
  dailyClicks: DailyClick[];
  geoData: GeoData[];
}

export interface ValidationResult {
  success: boolean;
  error: {
    issues: { message: string }[];
  } | null;
  data: string | null;
}

export interface ValidationField {
  _email?: boolean;
  _emailMessage?: string;
  _minLength?: number;
  _minMessage?: string;
  _url?: boolean;
  _urlMessage?: string;
  _phone?: boolean;
  _phoneMessage?: string;
  _userName?: boolean;
  _usernameMessage?: string;
  userName: (message: string) => ValidationField;
  email: (message?: string) => ValidationField;
  min: (length: number, message?: string) => ValidationField;
  url: (message?: string) => ValidationField;
  phone: (message?: string) => ValidationField;
  safeParse: (value: string) => ValidationResult;
}
////////////validate form parms in login and signup
export interface ValidateFormParams {
  isLogin: boolean;
  currentSchema: any;
  email: string;
  phone: string;
  password: string;
  setErrors: Dispatch<SetStateAction<Record<string, string | null>>>;
  setTouched: Dispatch<SetStateAction<Record<string, boolean>>>;
}
export interface SubmitFormAthentication extends ValidateFormParams {
  loginMutaion: UseMutationResult<
    LoginResponse,
    Error,
    { username: string; password: string }
  >;
  signupMutaion: UseMutationResult<
    { success: boolean },
    Error,
    { email: string; password: string; phone: string }
  >;
}

////////////reset form function in login//
export interface ResetFormProbs {
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  setErrors: Dispatch<SetStateAction<Record<string, string | null>>>;
  setTouched: Dispatch<SetStateAction<Record<string, boolean>>>;
}

//////////////login operation response /////
export type LoginResponse = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
};

export type CreateUrlFunction={success:true,shortUrl:string,expiresAt:Date}|{success:false,result:Record<string,string>[]}

export interface IUrl {
  _id:string
  shortUrl: string;
  clicks: number;
  originalUrl:string
  createdAt: string;
  expiresAt: string;
}

export interface UrlItem {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  expiresAt: string;

}

export interface DashboardProps {
  onLogout: () => void;
  onViewAnalytics: (url: UrlItem) => void;
}
export interface UrlsResponse {
  urls: IUrl[];
  dialyLimit: number;
  totalUrl: number;
}
export interface NavbarProps {
  title?: string;
  dailyUsage?: number;
  showBackButton?: boolean;
  onBackClick?: () => void;
  onLogout?: () => void;
}

export interface UrlCreationFormProps {
  dailyUsage: number;
  onCreateUrl: (url: UrlItem) => void;
}
export interface UrlsListProps {
  urls: UrlItem[];
  onViewAnalytics: (url: UrlItem) => void;
}