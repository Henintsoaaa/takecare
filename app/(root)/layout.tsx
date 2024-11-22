import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex-grow p-6 min-h-screen bg-gray-100">{children}</div>
    </div>
  );
};

export default Layout;
