import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showText?: boolean;
  className?: string;
}

export default function Logo({
  size = "md",
  variant = "dark",
  showText = true,
  className,
}: LogoProps) {
  const sizes = {
    sm: {
      container: "w-8 h-8",
      icon: "w-4 h-4",
      text: "text-lg",
      gap: "gap-2",
    },
    md: {
      container: "w-10 h-10",
      icon: "w-5 h-5",
      text: "text-xl",
      gap: "gap-2.5",
    },
    lg: {
      container: "w-14 h-14",
      icon: "w-7 h-7",
      text: "text-2xl",
      gap: "gap-3",
    },
  };

  const variants = {
    light: {
      iconBg: "bg-yellow-500/20 group-hover:bg-yellow-500/30",
      icon: "text-yellow-400",
      glow: "group-hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]",
      textPrimary: "text-white",
      textAccent: "text-yellow-400",
    },
    dark: {
      iconBg: "bg-yellow-500 group-hover:bg-yellow-400",
      icon: "text-navy-900",
      glow: "group-hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]",
      textPrimary: "text-navy-900",
      textAccent: "text-yellow-600",
    },
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center group transition-all duration-300",
        currentSize.gap,
        className
      )}
    >
      {/* Lightning Bolt Icon Container - symbolizing electricity */}
      <div
        className={cn(
          currentSize.container,
          currentVariant.iconBg,
          currentVariant.glow,
          "rounded-xl flex items-center justify-center",
          "transition-all duration-300 ease-out",
          "group-hover:scale-110",
          "relative overflow-hidden"
        )}
      >
        {/* Subtle pulse animation on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300",
            variant === "light"
              ? "bg-gradient-to-tr from-yellow-400/20 to-transparent"
              : "bg-gradient-to-tr from-yellow-300/30 to-transparent"
          )}
        />

        {/* Lightning bolt icon representing electricity */}
        <Zap
          className={cn(
            currentSize.icon,
            currentVariant.icon,
            "relative z-10 transition-transform duration-300",
            "group-hover:scale-110",
            "fill-current"
          )}
          strokeWidth={2}
        />
      </div>

      {/* Text Logo */}
      {showText && (
        <span
          className={cn(
            currentSize.text,
            "font-bold tracking-tight transition-all duration-300"
          )}
        >
          <span
            className={cn(
              currentVariant.textPrimary,
              "transition-colors duration-300"
            )}
          >
            Vind
          </span>
          <span
            className={cn(
              currentVariant.textAccent,
              "transition-colors duration-300"
            )}
          >
            Elektricien
          </span>
        </span>
      )}
    </Link>
  );
}
