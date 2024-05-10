import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  " inline-flex place-items-center justify-center truncate gap-2 rounded-base w-fit px-3 py-2 transition-colors ease-in-out duration-200",
  {
    variants: {
      variant: {
        outline: "border-white border-base hover:bg-white hover:text-black",
        filled:
          "bg-white border-white border-base  text-black  hover:bg-black hover:text-white",
        ctaFilled:
          "bg-accent border-base text-white hover:bg-transparent hover:border-accent hover:text-accent",
        ctaOutlined:
          "bg-transparent  border-accent border-base  text-accent  hover:bg-accent hover:text-white hover:border-accent",
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
