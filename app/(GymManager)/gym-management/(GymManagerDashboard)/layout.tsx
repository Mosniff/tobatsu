import SideNav from "@/components/layout/sideNav";

export const metadata = {
  title: "Tobatsu - Manager",
};

export default function GymManagerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideNav />
      <main className="min-h-screen bg-tc-background w-full flex flex-col items-center">
        {children}
      </main>
    </div>
  );
}
