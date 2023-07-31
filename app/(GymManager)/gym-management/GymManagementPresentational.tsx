"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

type Props = {
  userId: string;
};

function GymManagementPresentational({ userId }: Props) {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [gyms, setGyms] = useState<any[]>([]);
  const [managedGyms, setManagedGyms] = useState<any[]>([]);

  useEffect(() => {
    const fetchGyms = async () => {
      const { data, error } = await supabase.from("gyms").select();
      if (data) {
        setGyms(data);
        console.log(data, userId);
        setManagedGyms(data.filter((gym) => gym.owner_id === userId));
        setLoading(false);
      }

      if (error) {
        console.log(error);
      }
    };

    fetchGyms();
  }, []);

  return (
    <>
      <h1>Which gym would you like to manage?</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {managedGyms.length > 0 && (
            <ul className="my-auto">
              {managedGyms.map((gym) => (
                <Link href={`/gym-management/${gym.id}`}>
                  <li>{gym.name}</li>
                </Link>
              ))}
            </ul>
          )}
          {!(managedGyms.length > 0) && (
            <p>
              You do not currently manage any gyms. Would you like to create a
              gym or become a manager of an existing gym?
            </p>
          )}
        </>
      )}
      <button title="coming soon">Become manager of existing gym</button>
      <button title="coming soon">Create new gym</button>
    </>
  );
}

export default GymManagementPresentational;
