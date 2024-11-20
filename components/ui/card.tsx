import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
interface CardHeaderProps {
  children: React.ReactNode;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div className={`rounded-lg overflow-hidden ${className}`}>{children}</div>
);

export const CardHeader = ({ children }: CardHeaderProps) => (
  <div className="p-4 border-b">{children}</div>
);

export const CardTitle = ({ children, className }: CardTitleProps) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
);

export const CardContent = ({ children, className }: CardContentProps) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
