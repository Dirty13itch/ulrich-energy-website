import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border border-[#d1d1d1] bg-white px-4 py-3 text-base transition-colors",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-[#737373]",
          "focus:border-[#214293] focus:outline-none focus:ring-2 focus:ring-[#DDE9FF]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-[#ef4444] aria-invalid:focus:ring-red-100",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
