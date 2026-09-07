import LoadingPage from "@/components/home/LoadingPage";
import Hero from "@/components/home/Hero";
import HomePortalGrid from "@/components/home/HomePortalGrid";

export default function Home() {
  return (
    <>
      <LoadingPage />
      <main className="flex-1">
        <Hero />
        <HomePortalGrid />
      </main>
    </>
  );
}
