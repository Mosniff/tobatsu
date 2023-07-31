import Header from "@/components/layout/header";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex flex-col items-center">
        <div className="row">
          <div className="col-6">home page</div>
        </div>
      </main>
    </>
  );
}
