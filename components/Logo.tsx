import Link from "next/link";
import { Heart } from "lucide-react";
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
      iconBg: "bg-white/20 group-hover:bg-white/30",
      icon: "text-white",
      glow: "group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]",
      textPrimary: "text-white",
      textAccent: "text-teal-300",
    },
    dark: {
      iconBg: "bg-teal-600 group-hover:bg-teal-500",
      icon: "text-white",
      glow: "group-hover:shadow-[0_0_20px_rgba(13,148,136,0.5)]",
      textPrimary: "text-teal-600",
      textAccent: "text-gray-700",
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
      {/* Heart Icon Container - symbolizing recovery/healing */}
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
              ? "bg-gradient-to-tr from-white/10 to-transparent"
              : "bg-gradient-to-tr from-teal-400/20 to-transparent"
          )}
        />

        {/* Heart icon representing recovery and healing */}
        <Heart
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
            Rehab
          </span>
          <span
            className={cn(
              currentVariant.textAccent,
              "transition-colors duration-300"
            )}
          >
            NearMe
          </span>
        </span>
      )}
    </Link>
  );
}
