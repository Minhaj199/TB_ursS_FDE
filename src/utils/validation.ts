import { type ValidationField, type ValidationResult } from "../types";

export const z = {
  string: (): ValidationField => ({
    email: function (message = "Invalid email address") {
      return {
        ...this,
        _email: true,
        _emailMessage: message,
      };
    },
    min: function (length: number, message?: string) {
      return {
        ...this,
        _minLength: length,
        _minMessage: message || `Must be at least ${length} characters`,
      };
    },
    userName: function (message: string) {
      return {
        ...this,
        _userName: true,
        _usernameMessage: message || "please enter a valid username",
      };
    },
    url: function (message = "Invalid URL format") {
      return {
        ...this,
        _url: true,
        _urlMessage: message,
      };
    },
    phone: function (message = "Invalid phone number format") {
      return {
        ...this,
        _phone: true,
        _phoneMessage: message,
      };
    },
    safeParse: function (value: string): ValidationResult {
      const errors: string[] = [];

      if (!value || value.trim() === "") {
        errors.push("This field is required");
      } else {
        if (this._userName) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const isPhone = /^[\+]?[1-9][\d]{0,15}$|^[\+]?[(]?[\d\s\-\(\)]{10,}$/;

          if (!emailRegex.test(value) && !isPhone.test(value)) {
            errors.push(this._usernameMessage || "Invalid email address");
          }
        }
        if (this._email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors.push(this._emailMessage || "Invalid email address");
          }
        }

        if (this._url) {
          try {
            new URL(value);
          } catch {
            errors.push(this._urlMessage || "Invalid URL format");
          }
        }

        if (this._phone) {
          const phoneRegex =
            /^[\+]?[1-9][\d]{0,15}$|^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
          const cleanPhone = value.replace(/[\s\-\(\)]/g, "");
          if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
            errors.push(this._phoneMessage || "Invalid phone number format");
          }
        }
        if (this._minLength && value.length < this._minLength) {
          errors.push(
            this._minMessage || `Must be at least ${this._minLength} characters`
          );
        }
      }

      return {
        success: errors.length === 0,
        error:
          errors.length > 0
            ? { issues: errors.map((msg) => ({ message: msg })) }
            : null,
        data: errors.length === 0 ? value : null,
      };
    },
  }),
};

export const loginSchema = {
  username: z
    .string()
    .min(1, "please insert your email or phone number")
    .userName("please enter a valid username"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
};

export const signupSchema = {
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z.string().phone("Please enter a valid phone number"),
};

export const urlSchema = {
  url: z
    .string()
    .url("Please enter a valid URL (including http:// or https://)"),
};
