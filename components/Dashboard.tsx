// components/Dashboard.tsx

import React from "react"; // Import React
import { Card } from "./ui/card"; // Import the Card component
import CommentForm from "./CommentForm";
import RecentForm from "./RecentForm";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <Card>
          <div>
            <RecentForm />
          </div>
          <div>
            <CommentForm />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
