import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="flex w-full place-items-center gap-2">
        {icon ? (
          <div className="text-inherit pointer-events-none">{icon}</div>
        ) : null}
        <input
          type={type}
          className={cn(
            ` w-full truncate rounded-base bg-transparent p-2 ring-1 ring-white placeholder:text-lightGray  disabled:opacity-50`,
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
