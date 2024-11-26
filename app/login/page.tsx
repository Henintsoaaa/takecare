import Agenda from "@/components/Agenda";
import EvaluationForm from "@/components/Formulaire_status";
import StatusChartEvolution from "@/components/Graphe_case_evolution";
import Login from "@/components/LoginPage";
import StatusChart from "@/components/StatusChart";
import Evaluations from "@/components/UserEvaluation";
import React from "react";

const Page = () => {
  return (
    <div className="text-black">
      <Login />
      {/* <EvaluationForm />
      <Evaluations />
      <Agenda />
      <StatusChart />
      <StatusChartEvolution /> */}
    </div>
  );
};

export default Page;
