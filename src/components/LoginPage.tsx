import React, { useState } from "react";
import { Link2, AlertCircle } from "lucide-react";
import { type User } from "../types";
import { loginSchema, signupSchema } from "../utils/validation";
import { motion, AnimatePresence } from "framer-motion";

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const currentSchema = isLogin ? loginSchema : signupSchema;

  const validateField = (field: string, value: string): string | null => {
    if (field in currentSchema) {
      console.log(field);
      const result = (currentSchema as any)[field].safeParse(value);
      return result.success ? null : result.error!.issues[0].message;
    }
    return null;
  };

  const handleFieldChange = (field: string, value: string): void => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "phoneNumber") setPhoneNumber(value);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleFieldBlur = (field: string, value: string): void => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    let userNameError: string | null = null;
    let emailError: string | null = null;
    let passwordError;
    let phoneError = null;
    if (isLogin) {
      userNameError = validateField("username", email);
      passwordError = validateField("password", password);
    } else {
      emailError = validateField("email", email);
      console.log(emailError);
      passwordError = validateField("password", password);
      phoneError = validateField("phoneNumber", phoneNumber);
    }
    const newErrors = {
      email: emailError,
      password: passwordError,
      phoneNumber: phoneError,
      username: userNameError,
    };
    console.log(newErrors.username);
    setErrors(newErrors);
    setTouched({
      email: true,
      password: true,
      phoneNumber: true,
    });

    return (
      !emailError &&
      !passwordError &&
      !userNameError &&
      (isLogin || !phoneError)
    );
  };

  const resetForm = (): void => {
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setErrors({});
    setTouched({});
  };

  const handleSubmit = (): void => {
    if (!validateForm()) return;

    const userData: User = {
      email,
      id: Date.now(),
      ...(!isLogin && { phoneNumber }),
    };
    onLogin(userData);
  };

  const getInputClassName = (field: string): string => {
    const baseClass =
      "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors";
    if (errors[field] && touched[field]) {
      return `${baseClass} border-red-300 focus:ring-red-500`;
    }
    return `${baseClass} border-gray-300`;
  };
  const handleToggle = () => {
    setIsLogin(!isLogin);
    resetForm();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Link2 className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">LinkShort</h1>
          <p className="text-gray-600 mt-2">Shorten your URLs with ease</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type={isLogin ? "text" : "email"}
                value={email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                onBlur={(e) => handleFieldBlur("email", e.target.value)}
                className={getInputClassName("email")}
                placeholder={
                  !isLogin
                    ? "Enter your email"
                    : "Enter your email or phone number"
                }
              />
              {errors.email && touched.email && (
                <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.email || errors.username}</span>
                </div>
              )}
              {errors.username && touched.email && (
                <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.email || errors.username}</span>
                </div>
              )}
            </div>

            {/* Phone field only in signup */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) =>
                    handleFieldChange("phoneNumber", e.target.value)
                  }
                  onBlur={(e) => handleFieldBlur("phoneNumber", e.target.value)}
                  className={getInputClassName("phoneNumber")}
                  placeholder="Enter your phone number (e.g., +1234567890)"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.phoneNumber}</span>
                  </div>
                )}
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => handleFieldChange("password", e.target.value)}
                onBlur={(e) => handleFieldBlur("password", e.target.value)}
                className={getInputClassName("password")}
                placeholder="Enter your password"
              />
              {errors.password && touched.password && (
                <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 text-center">
          <button
            onClick={handleToggle}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};
