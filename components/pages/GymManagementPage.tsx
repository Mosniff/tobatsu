"use client";
import ManagedGymsList from "../ManagedGymsList";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type GymManagementPageProps = {
  userId: string;
};

const GymManagementPage = ({ userId }: GymManagementPageProps) => {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [managedGyms, setManagedGyms] = useState<any[]>([]);

  useEffect(() => {
    const fetchGyms = async () => {
      const { data, error } = await supabase.from("gyms").select();
      if (data) {
        setManagedGyms(data.filter((gym) => gym.owner_id === userId));
        setLoading(false);
      }

      if (error) {
        alert(`error: ${error}`);
        console.log(`error in GymManagementPage: ${error}`);
      }
    };

    fetchGyms();
  }, []);

  return (
    <main className="min-h-screen bg-tc-background w-full flex flex-col items-center">
      <h1>Which gym would you like to manage?</h1>
      <ManagedGymsList loading={loading} managedGyms={managedGyms} />

      <button title="coming soon">Become manager of existing gym</button>
      <button title="coming soon">Create new gym</button>
    </main>
  );
};

export default GymManagementPage;
