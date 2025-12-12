import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero }   from "../components/sections/Hero"
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="page">
      <Navbar />
       <main className="content">
            <Hero /> 
      </main>
      <Footer />
    </div>
  );
}
