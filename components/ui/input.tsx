import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="flex items-center gap-2">
        {icon ? (
          <div className="pointer-events-none text-inherit">{icon}</div>
        ) : null}
        <input
          type={type}
          className={cn(
            ` ring-1 ring-white truncate rounded-base bg-transparent p-2 placeholder:text-lightGray`,
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
