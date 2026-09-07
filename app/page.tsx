import LoadingPage from "./components/LoadingPage";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import HomePortalGrid from "./components/HomePortalGrid";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";

export default function Home() {
  return (
    <>
      <LoadingPage />
      <Nav />
      <main className="flex-1">
        <Hero />
        <HomePortalGrid />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
