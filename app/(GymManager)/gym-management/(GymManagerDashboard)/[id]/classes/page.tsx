import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ClassesPresentational from "./ClassesPresentational";

interface GymClassesPageProps {
  params: {
    id: string;
  };
}

const GymClassesPage = async ({
  params: { id: gymId },
}: GymClassesPageProps) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/` route.
    redirect("/");
  }

  const { data: gym } = await supabase
    .from("gyms")
    .select()
    .eq("id", gymId)
    .single();
  if (gym.owner_id !== user.id) {
    // This route can only be accessed by gym managers.
    // Other users will be redirected to the `/` route.
    redirect("/");
  }

  return <ClassesPresentational />;
};

export default GymClassesPage;
