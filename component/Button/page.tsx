"use client";

import { ReactNode, MouseEventHandler } from "react";

const buttonVariants = {
  primary: " text-white bg-gradient-to-r from-blue-700 to-blue-600",
  secondary: "text-black  bg-gradient-to-r from-white/70 to-white",
  danger: " text-white bg-gradient-to-r from-red-700 to-red-600",
} as const;

const buttonSizes = {
  default: "min-w-36  ",
  sm: "min-w-28 ",
  md: "min-w-52",
  full: "w-full",
} as const;

type buttonProps = {
  varient?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  isLoading?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const page = ({
  varient = "primary",
  size = "default",
  isLoading = false,
  children,
  onClick,
}: buttonProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl hover:cursor-pointer p-2 ${buttonVariants[varient]} ${buttonSizes[size]} `}
    >
      {!isLoading ? (
        children
      ) : (
        <span className="inline-block h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
    </button>
  );
};

export default page;
