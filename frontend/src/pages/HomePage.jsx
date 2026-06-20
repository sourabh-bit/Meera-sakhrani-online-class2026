import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import Hero from "../components/site/Hero";
import Venue from "../components/site/Venue";
import GlamLooks from "../components/site/GlamLooks";
import Curriculum from "../components/site/Curriculum";
import Masterclass from "../components/site/Masterclass";
import Attendees from "../components/site/Attendees";

export default function HomePage() {
  return (
    <div data-testid="home-page" className="min-h-screen bg-[#f5ede7]">
      <Navbar />
      <Hero />
      <GlamLooks />
      <Venue />
      <Curriculum />
      <Masterclass />
      <Attendees />
      <Footer />
    </div>
  );
}
