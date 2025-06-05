import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-blue-500 group-[.toaster]:text-white group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-blue-100",
          actionButton:
            "group-[.toast]:bg-white group-[.toast]:text-blue-500",
          cancelButton:
            "group-[.toast]:bg-blue-600 group-[.toast]:text-white",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
