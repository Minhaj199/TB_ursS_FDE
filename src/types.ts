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

export interface UrlItem {
  id: number;
  longUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  expiresAt: string;
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
  refreshTokens: string;
  accessTokens: string;
};
