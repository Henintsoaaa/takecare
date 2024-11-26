"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import SignalementBoard from "./SignalementBoard";
import ComplaintsBoard from "./ComplaintsDashboard";
import Statistiques from "./Statistique";
import Dashboard from "./Dashboard";
import GeographicDistributionChart from "./geoGraph";
import ReportsByPersonChart from "./ChartData";
import SignalementCharts from "./SignalementBoard";
import StatutHistoryChart from "./StatusChart";
import PrivateChat from "./PrivateChat";
// import ComplaintsBoard from "./FilterSignalement";

const SecuFonctNavigationCard: React.FC = () => {
  const pathname = usePathname();
  const activeElementClasses =
    "text-sm md:text-md flex gap-1 md:gap-3 py-2 my-2 bg-[#FFF8E8] text-black md:-mx-8 px-6 md:px-8 rounded-md shadow-md shadow-gray-300 md:shadow-none";
  const nonActiveElementClasses =
    "text-sm md:text-md flex gap-1 md:gap-3 py-2 my-2 hover:bg-[#FFF8E8] hover:bg-opacity-90 md:-mx-4 md:px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300";

  const [activeTab, setActiveTab] = useState<string>("dashboardSec"); // Specify the type of activeTab
  const Id: number = 1; // Specify the type of Id

  useEffect(() => {
    const currentPath = pathname.split("/").pop();
    if (
      [
        "manage",
        "dashboardSec",
        "proofAnalysis",
        "comments",
        "updateStatus",
        "communication",
      ].includes(currentPath || "")
    ) {
      setActiveTab(currentPath as string); // Cast currentPath to string
    } else {
      setActiveTab("manage");
    }
  }, [pathname]);

  const handleTabChange = (tab: string) => {
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
              onClick={() => handleTabChange("manage")}
              className={
                activeTab === "manage"
                  ? activeElementClasses
                  : nonActiveElementClasses
              }
            >
              🛡️<span className="hidden md:block">Gérer les signalements</span>
            </button>
            <button
              onClick={() => handleTabChange("dashboardSec")}
              className={
                activeTab === "dashboardSec"
                  ? activeElementClasses
                  : nonActiveElementClasses
              }
            >
              📊
              <span className="hidden md:block">
                Consulter le tableau de bord des cas
              </span>
            </button>

            <button
              onClick={() => handleTabChange("proofAnalysis")}
              className={
                activeTab === "proofAnalysis"
                  ? activeElementClasses
                  : nonActiveElementClasses
              }
            >
              🔍
              <span className="hidden md:block">
                Analyser les preuves fournies
              </span>
            </button>

            <button
              onClick={() => handleTabChange("communication")}
              className={
                activeTab === "communication"
                  ? activeElementClasses
                  : nonActiveElementClasses
              }
            >
              💬
              <span className="hidden md:block">
                Communiquer avec la victime
              </span>
            </button>
          </div>
        </Card>
      </div>

      <div className="md:ml-[220px] p-4">
        {activeTab === "manage" && (
          <div>
            <p>Gérer les signalements</p>
            <SignalementBoard />
          </div>
        )}
        {activeTab === "dashboardSec" && (
          <div>
            <p>Tableau de bord</p>
            <ComplaintsBoard />
            <Statistiques />
            <Dashboard />
            <GeographicDistributionChart />
            <ReportsByPersonChart />
            <SignalementCharts />
            <StatutHistoryChart />
          </div>
        )}
        {activeTab === "proofAnalysis" && (
          <div>
            <p>Analyser les preuves fournies</p>
          </div>
        )}
        {activeTab === "updateStatus" && (
          <div>
            <p>Mettre à jour l'état des plaintes</p>
          </div>
        )}
        {activeTab === "communication" && (
          <div>
            <p>Communiquer avec la victime</p>
            <Card>
              <div>{/* <PrivateChat receiverId="someReceiverId" /> */}</div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecuFonctNavigationCard;
