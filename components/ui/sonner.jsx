'use client'

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      toastOptions={{
        className: 'toaster' // THIS makes your .toaster CSS apply on EACH toast!
      }}
      {...props}
    />
  );
}

export { Toaster }
