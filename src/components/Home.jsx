import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Benefits from "./Benefits";
import Services from "./Services";
// import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <Benefits />
      <Services />
      {/* <Testimonials /> */}
    </>
  );
};

export default Home;
