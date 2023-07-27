export const metadata = {
  title: "Tobatsu - Login",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen bg-background flex flex-col items-center">
        {children}
      </main>
    </>
  );
}
