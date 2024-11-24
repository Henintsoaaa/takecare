import ReportsByPersonChart from "@/components/ChartData";
import Dashboard from "@/components/Dashboard";
import ComplaintsBoard from "@/components/Filters";
import GeographicDistributionChart from "@/components/geoGrap";
import SignalementCharts from "@/components/SignalementCharts";
import Statistiques from "@/components/Statistique";
import React from "react";

const Page = () => {
  return (
    <div>
      <ComplaintsBoard />
      <Statistiques />
      <Dashboard />
      <GeographicDistributionChart />
      <ReportsByPersonChart />
      <SignalementCharts />
      {/* <StatutHistoryChart signalementId={Id} /> */}
    </div>
  );
};

export default Page;
