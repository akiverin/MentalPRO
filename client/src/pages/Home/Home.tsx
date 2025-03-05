import About from "./About/About";
import Exercises from "./Exercises/Exercises";
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
    </>
  );
};

export default Home;
