import About from "./About/About";
import Exercises from "./Exercises/Exercises";
import FAQ from "./FAQ/FAQ";
import Hero from "./Hero/Hero";
import "./Home.scss";
import Instruments from "./Instruments/Instruments";
const Home = () => {
  return (
    <>
      <Hero />
      <Exercises />
      <About />
      <Instruments />
      <FAQ />
    </>
  );
};

export default Home;
