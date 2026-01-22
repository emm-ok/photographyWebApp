import React from "react";

const Input = ({ label, ...props }) => {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full mt-1 rounded-full shadow-md bg-stone-100 px-5 py-3 text-sm focus:outline-none"
      />
    </div>
  );
};

export default Input;
