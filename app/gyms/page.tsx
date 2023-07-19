// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const { data: gyms } = await supabase.from("gyms").select();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/` route.
    redirect("/");
  }

  return (
    <>
      <h1>Gyms:</h1>
      <ul className="my-auto">
        {gyms?.map((gym) => (
          <li key={gym.id}>{gym.name}</li>
        ))}
      </ul>
    </>
  );
}
