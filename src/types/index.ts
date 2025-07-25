// types/index.ts
export interface User {
  id: number;
  email: string;
  phoneNumber?: string;
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
  userName:(message:string)=>ValidationField
  email: (message?: string) => ValidationField;
  min: (length: number, message?: string) => ValidationField;
  url: (message?: string) => ValidationField;
  phone: (message?: string) => ValidationField;
  safeParse: (value: string) => ValidationResult;
}

export type PageType = 'login' | 'dashboard' | 'analytics';
