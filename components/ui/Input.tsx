import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-0.5">
      {label && (
        <label className="text-[11px] md:text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full
          rounded-full
          bg-background
          text-foreground
          border
          px-3 py-2 md:px-4 md:py-2.5
          text-xs md:text-sm
          placeholder:text-zinc-400
          focus:outline-none
          focus:ring-2 focus:ring-black
          ${props.className ?? ""}
        `}
      />
    </div>
  );
};

export default Input;
