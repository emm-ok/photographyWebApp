import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`bg-stone-200 rounded-full px-4 py-3 text-sm focus:outline-none  ${
          props.className ?? ""
        }`}
      />
    </div>
  );
};

export default Input;
