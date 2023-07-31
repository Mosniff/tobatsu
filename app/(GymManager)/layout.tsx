import Header from "@/components/layout/header";

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
      {children}
    </>
  );
}
