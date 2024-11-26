import GeographicDistributionChart from "@/components/geoGraph";
import SignalementCharts from "@/components/SignalementCharts";
import Statistiques from "@/components/Statistique";
import { Card } from "@/components/ui/card";

const Page = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-4 grid-rows-4 gap-4 w-full max-w-6xl">
        {/* Statistiques Générales spans 2 columns and 2 rows */}
        <div className="bg-white shadow-lg rounded-lg p-6 col-span-2 row-span-2">
          <h2 className="text-xl font-semibold mb-4">Statistiques Générales</h2>
          <Statistiques />
        </div>
        {/* Statistiques des Signalements spans 2 columns and 1 row */}
        <div className="bg-white shadow-lg rounded-lg p-6 col-span-2 row-span-1">
          <h2 className="text-xl font-semibold mb-4">
            Statistiques des Signalements
          </h2>
          <SignalementCharts />
        </div>
        {/* Répartition Géographique spans 2 columns and 1 row */}
        <div className="bg-white shadow-lg rounded-lg p-6 col-span-2 row-span-1">
          <h2 className="text-xl font-semibold mb-4">
            Répartition Géographique
          </h2>
          <GeographicDistributionChart />
        </div>
      </div>
    </div>
  );
};

export default Page;
