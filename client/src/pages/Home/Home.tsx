import About from "./About/About";
import Exercises from "./Exercises/Exercises";
import Hero from "./Hero/Hero";
import "./Home.scss";
const Home = () => {
  return (
    <>
      <Hero />
      <Exercises />
      <About />
    </>
  );
};

export default Home;
