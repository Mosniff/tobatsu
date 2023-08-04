import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../types/supabase";
import AccountForm from "../../../components/account-form";

export default async function AccountPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className="min-h-screen bg-tc-background w-full flex flex-col items-center">
      <AccountForm session={session} />
    </main>
  );
}
