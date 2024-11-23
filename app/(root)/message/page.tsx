import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MessageSystem from "@/components/MessageSystem";
import { ForumLayout } from "@/components/forum/ForumLayout";
import ListOfChat from "@/components/chatWithFriends/ListOfChat";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 h-screen">
        {/* <Tabs defaultValue="messages" className="h-full">
          <TabsList className="mb-4">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
          </TabsList>
          <TabsContent value="messages" className="h-full">
            <MessageSystem />
          </TabsContent>
          <TabsContent value="forum" className="h-full">
            <ForumLayout />
          </TabsContent>
        </Tabs> */}
        <ListOfChat />
      </div>
    </main>
  );
}
