import React, { useState } from "react";

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  children,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsList) {
          return React.cloneElement(child as React.ReactElement<any>, {
            activeTab,
            setActiveTab,
          });
        }
        if (React.isValidElement(child) && child.type === TabsContent) {
          return React.cloneElement(child as React.ReactElement<any>, {
            activeTab,
          });
        }
        return child;
      })}
    </div>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (value: string) => void;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({
  children,
  activeTab,
  setActiveTab,
  className,
}) => (
  <div className={className}>
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, {
          activeTab,
          setActiveTab,
        });
      }
      return child;
    })}
  </div>
);

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (value: string) => void;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  activeTab,
  setActiveTab,
  className,
}) => (
  <button
    className={`${className} ${
      activeTab === value
        ? "bg-purple-200 text-black font-semibold"
        : "hover:bg-purple-100 text-gray-700"
    } p-3 rounded-lg transition-all duration-200`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);
interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  activeTab: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  activeTab,
}) => {
  if (activeTab !== value) return null;
  return <div>{children}</div>;
};
