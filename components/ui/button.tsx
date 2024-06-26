"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useFormStatus } from "react-dom";
import { MdOutlineMotionPhotosOn } from "react-icons/md";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  " inline-flex place-items-center justify-center truncate gap-2 rounded-base w-fit px-3 py-2 transition-colors ease-in-out disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        outline: "border-white border-base hover:bg-white hover:text-black",
        filled:
          "bg-white border-white border-base text-black hover:bg-black hover:text-white",
        ctaFilled:
          "bg-accent border-base text-white hover:bg-transparent hover:border-accent hover:text-accent",
        ctaOutlined:
          "bg-transparent border-accent border-base text-accent hover:bg-accent hover:text-white hover:border-accent",
        unstyled: "px-0 py-0 gap-0 rounded-none transition-none",
        calendarSelect:
          "border-white border-base w-full min-w-52 justify-start text-left aria-expanded:outline-double aria-expanded:outline-offset-2 aria-expanded:outline-white",
        calendarDay:
          "aria-selected:rounded-base focus-visible:bg-accent focus-visible:rounded-base focus-visible:border-none transition-none",
        selectTrigger:
          "border-white border-base w-full justify-between aria-expanded:outline-double aria-expanded:outline-offset-2 aria-expanded:outline-white",
        sheetTrigger:
          "bg-accent bg-opacity-[0.5] backdrop-blur-base border-base text-white hover:bg-accent fixed bottom-10 right-10",
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      asChild = false,
      isLoading = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { pending, action } = useFormStatus();
    const isPending = isLoading || (pending && action === props.formAction);

    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
        disabled={isPending}
      >
        {isPending ? (
          <MdOutlineMotionPhotosOn size={"1.5em"} className="animate-spin" />
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
