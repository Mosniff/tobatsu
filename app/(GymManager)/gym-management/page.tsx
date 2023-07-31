import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GymManagementPresentational from "./GymManagementPresentational";

const GymManagementPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/` route.
    redirect("/");
  }

  console.log(user.id);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center">
      <GymManagementPresentational userId={user.id} />
    </main>
  );
};

export default GymManagementPage;
