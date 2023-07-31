import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface GymOverviewPageProps {
  params: {
    id: string;
  };
}

const GymOverviewPage = async ({
  params: { id: gymId },
}: GymOverviewPageProps) => {
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

  return <div>Gym Overview Page</div>;
};

export default GymOverviewPage;
