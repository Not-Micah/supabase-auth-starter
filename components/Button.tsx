"use client";

import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
  children: React.ReactNode;
  className?: string;
  redirectLink?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  redirectLink
}) => {
  const router = useRouter();

  const onClick = () => {
    if (redirectLink) {
      router.replace(redirectLink)
      return; 
    } 
  }

  return (
    <button
      onClick={onClick}
      className={twMerge(
        "px-3 py-2 bg-slate-500 text-white rounded-md shadow-md",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
