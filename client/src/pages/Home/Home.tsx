import About from './About';
import Exercises from './Exercises';
import FAQ from './FAQ';
import Hero from './Hero';
import './Home.scss';
import Instruments from './Instruments';
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
