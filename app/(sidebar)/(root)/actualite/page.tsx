import GeographicDistributionChart from "@/components/geoGraph";
import SignalementCharts from "@/components/SignalementCharts";
import Statistiques from "@/components/Statistique";

const Page = () => {
  return (
    <div>
      <GeographicDistributionChart />
      <SignalementCharts />
      <Statistiques />
    </div>
  );
};

export default Page;
