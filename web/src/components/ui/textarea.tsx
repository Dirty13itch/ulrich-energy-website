import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-md border border-[#d1d1d1] bg-white px-4 py-3 text-base transition-colors",
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
Textarea.displayName = "Textarea";

export { Textarea };
