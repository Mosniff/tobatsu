import Header from "@/components/header";

export const metadata = {
  title: "Tobatsu - Manager",
};

export default function GymManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex flex-col items-center">
        {children}
      </main>
    </>
  );
}
