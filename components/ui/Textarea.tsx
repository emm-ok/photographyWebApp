import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  rows = 4,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        {...props}
        className={`bg-stone-200 text-neutral-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none ${
          props.className ?? ""
        }`}
      />
    </div>
  );
};

export default Textarea;
