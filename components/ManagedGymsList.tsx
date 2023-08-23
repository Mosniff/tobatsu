"use client";
import Link from "next/link";

type ManagedGymsListProps = {
  loading: boolean;
  managedGyms: any[];
};

function ManagedGymsList({ loading, managedGyms }: ManagedGymsListProps) {
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {managedGyms.length > 0 && (
            <ul className="my-auto">
              {managedGyms.map((gym) => (
                <Link key={gym.id} href={`/gym-management/${gym.id}`}>
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
    </>
  );
}

export default ManagedGymsList;
