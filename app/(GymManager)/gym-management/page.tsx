import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GymManagementPage from "@/components/pages/GymManagementPage";

const Page = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/` route.
    redirect("/");
  }

  return <GymManagementPage userId={user.id} />;
};

export default Page;
