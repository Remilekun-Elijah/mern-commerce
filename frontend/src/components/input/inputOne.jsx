import React, { useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import "./InputOne.css";
const Input = ({
  readOnly = false,
  id,
  label,
  icon,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  onClick,
  type,
  inputClass = "",
  wrapperClass = "",
  disabled = false,
  maxLength,
  labelClass = "",
  required = false,
  minLength,
  min,
  max,
  passwordStrength = { show: false, size: 0, color: "var(--C_danger)" },
  data,
  inputC,
  children,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`custom-input mt-3 text-start ${wrapperClass}`}>
      <div className={`flex justify-between mt-y relative`}>
        {label && (
          <label
            className={`block text-xl mb-2 input-label text-left input-label ${labelClass}`}
            htmlFor={id || name}
          >
            {label}{" "}
            {!disabled && required && (
              <span style={{ top: "2px", color: "red" }} className="relative">
                *
              </span>
            )}
          </label>
        )}
        {passwordStrength.show &&
          (data || (
            <span className="passStrength absolute rounded-2xl">
              <span
                className="progress rounded-2xl"
                style={{
                  width: passwordStrength.size + "%",
                  backgroundColor: passwordStrength.color,
                }}
              ></span>
            </span>
          ))}
      </div>

      <div
        className={`flex shadow items-center input_wrapper bg-white mb-1 p-2 ${inputClass}`}
      >
        <input
          className={`w-full py-3 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline ${inputC}`}
          type={(type || "text") && showPassword ? "text" : type}
          name={name}
          readOnly={readOnly}
          min={min}
          max={max}
          onClick={onClick}
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          id={id || name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          minLength={type === "tel" ? minLength || 10 : minLength}
          maxLength={type === "tel" ? maxLength || 15 : maxLength}
          required={error ? false : required}
        />
        {icon ? (
          icon
        ) : type === "password" ? (
          showPassword ? (
            <IoMdEye
              onClick={(e) => setShowPassword(!showPassword)}
              className="icon pr-2"
              size="2em"
            />
          ) : (
            <IoMdEyeOff
              onClick={(e) => setShowPassword(!showPassword)}
              className="icon pr-2"
              size="2em"
            />
          )
        ) : null}

        {children}
      </div>
      <div
        className={`text-red-500 text-xs italic ${
          error?.touched[name] && error?.errors[name] ? "visible" : "invisible"
        }`}
      >
        {error?.touched[name] && error?.errors[name]
          ? error?.errors[name]
          : "nil"}
      </div>
    </div>
  );
};
export default Input;
