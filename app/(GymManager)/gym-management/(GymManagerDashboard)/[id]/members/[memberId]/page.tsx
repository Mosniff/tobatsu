import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface GymMemberPageProps {
  params: {
    id: string;
  };
}

const GymMemberPage = async ({ params: { id: gymId } }: GymMemberPageProps) => {
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

  return <div>Gym Member Page</div>;
};

export default GymMemberPage;
