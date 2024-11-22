import EmotionTracker from "@/components/Emotion-tracker";
import PublicationStyle from "@/components/PublicationStyle";
const Page = () => {
  // log the session cookie
  return (
    <div className="flex gap-2">
      <div className="flex p-4 w-1/5">
        <PublicationStyle />
      </div>
      <EmotionTracker />;
    </div>
  );
};

export default Page;
