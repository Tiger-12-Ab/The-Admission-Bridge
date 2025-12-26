import { useEffect, useState } from "react";
import { api } from "../api/api";
import toast, { Toaster } from "react-hot-toast";
import Profile from "../components/dashboard/Profile";
import Academic from "../components/dashboard/Academic";
import Applications from "../components/dashboard/Applications";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setData(res.data);
    } catch {
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (!data || !data.user) {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      No data found.............
    </div>
  );
}


  return (
    <div className="min-h-screen bg-white flex justify-center px-4 py-10">
      <Toaster position="top-right" />

      <div className="w-full max-w-5xl space-y-8">
        <h1 className="text-3xl font-bold text-green-600 text-center">
          Dashboard
        </h1>

        <Profile user={data.user} refresh={loadDashboard} />
        <Academic academics={data.academics} refresh={loadDashboard} />
        <Applications />
      </div>
    </div>
  );
}
