// components/ui/text.tsx
import React from "react";
import clsx from "clsx";

interface TextProps {
  children: React.ReactNode; // Le contenu texte ou autre à afficher
  variant?: "default" | "title" | "subtitle"; // Variantes pour différents styles
  className?: string; // Permet de passer des classes CSS supplémentaires
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = "default",
  className,
}) => {
  // Styles de base et variantes
  const baseStyles = "text-gray-800";
  const variants = {
    default: "text-base",
    title: "text-2xl font-bold",
    subtitle: "text-lg font-medium",
  };

  return (
    <p className={clsx(baseStyles, variants[variant], className)}>{children}</p>
  );
};
