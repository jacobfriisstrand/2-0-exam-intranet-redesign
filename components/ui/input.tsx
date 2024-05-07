import * as React from "react";

import { cn } from "@/lib/utils";
import { MdEmail } from "react-icons/md";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex items-center gap-4 relative">
        <MdEmail className="absolute left-2" />
        <input
          type={type}
          className={cn(
            "outline outline-white outline-base rounded-base border-white bg-transparent pl-8 py-2 placeholder:text-lightGray",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
