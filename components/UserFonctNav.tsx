"use client";

import Link from "next/link";
import { Card } from "./ui/card";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Plainte from "./Plainte";
import ProofSection from "./ProofSection";
import ResourcesSection from "./ResourcesSection";
import StatusForUser from "./StatusForUser";

// Define the types for the tab options
type Tab = "report" | "dashboardUser" | "proof" | "ressources";

export default function FonctNavigationCard() {
  const pathname = usePathname();
  const activeElementClasses =
    "text-sm md:text-md flex gap-1 md:gap-3 py-2 my-2 bg-[#FFF8E8] text-black md:-mx-8 px-6 md:px-8 rounded-md shadow-md shadow-gray-300 md:shadow-none";
  const nonActiveElementClasses =
    "text-sm md:text-md flex gap-1 md:gap-3 py-2 my-2 hover:bg-[#FFF8E8] hover:bg-opacity-90 md:-mx-4 md:px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300";

  const [activeTab, setActiveTab] = useState<Tab>("dashboardUser");

  useEffect(() => {
    const currentPath = pathname.split("/").pop();
    if (
      ["report", "dashboardUser", "proof", "ressources"].includes(
        currentPath || ""
      )
    ) {
      setActiveTab(currentPath as Tab); // Cast currentPath to Tab type
    } else {
      setActiveTab("dashboardUser");
    }
  }, [pathname]);

  const handleTabChange = (tab: Tab) => {
    // Specify the type of tab parameter
    setActiveTab(tab);
    window.history.pushState(null, "", `/${tab}`);
  };

  return (
    <div className="md:flex md:flex-row">
      <div className="md:fixed md:w-[200px]">
        <Card>
          <div className="px-9 py-2 flex justify-center md:block shadow-md shadow-gray-500">
            <h2 className="text-gray-400 mb-3 hidden md:block">Navigation</h2>
            <button
              onClick={() => handleTabChange("report")}
              className={
                activeTab === "report"
                  ? activeElementClasses
                  : nonActiveElementClasses
              }
            >
              🚨<span className="hidden md:block">Signalement</span>
            </button>
            <button
              onClick={() => handleTabChange("dashboardUser")}
              className={
                activeTab === "dashboardUser"
                  ? activeElementClasses
                  : nonActiveElementClasses
              }
            >
              📊<span className="hidden md:block">Tableau de bord</span>
            </button>
            <button
              onClick={() => handleTabChange("proof")}
              className={
                activeTab === "proof"
                  ? activeElementClasses
                  : nonActiveElementClasses
              }
            >
              🧾<span className="hidden md:block">Preuves</span>
            </button>
            <button
              onClick={() => handleTabChange("ressources")}
              className={
                activeTab === "ressources"
                  ? activeElementClasses
                  : nonActiveElementClasses
              }
            >
              🏢<span className="hidden md:block">Ressources</span>
            </button>
          </div>
        </Card>
      </div>

      <div className="md:ml-[220px] p-4">
        {activeTab === "report" && (
          <div>
            <p>Signaler un abus</p>
            <Plainte userId="someUserId" />
          </div>
        )}
        {activeTab === "dashboardUser" && (
          <div>
            <p>Tableau de bord</p>
            <StatusForUser />
          </div>
        )}
        {activeTab === "proof" && (
          <div>
            <p>Prouver</p>
            <ProofSection />
          </div>
        )}
        {activeTab === "ressources" && (
          <div>
            <ResourcesSection />
          </div>
        )}
      </div>
    </div>
  );
}
