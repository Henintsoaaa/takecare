import EmotionEvaluation from "@/components/EmotionEvaluation";
import Sidebar from "@/components/Sidebar";
const Page = () => {
  const currentPath = "/userEvolution";
  return (
    <div>
      <Sidebar activePath={currentPath} />
      <EmotionEvaluation />
    </div>
  );
};

export default Page;
