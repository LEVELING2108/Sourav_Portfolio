import PreloaderSilicon from "./components/PreloaderSilicon";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";

export default function Home() {
  return (
    <>
      <PreloaderSilicon />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
