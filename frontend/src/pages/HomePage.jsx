import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import Hero from "../components/site/Hero";
import Venue from "../components/site/Venue";
import GlamLooks from "../components/site/GlamLooks";

export default function HomePage() {
  return (
    <div data-testid="home-page" className="min-h-screen bg-[#f5ede7]">
      <Navbar />
      <Hero />
      <Venue />
      <GlamLooks />
      <Footer />
    </div>
  );
}
