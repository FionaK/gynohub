import React from "react";
import women from "../assets/women2.svg"

const Hero = () => {
  return (
    <section className="dark:bg-gray-800 dark:text-gray-800">
      <div class="container px-6 py-16 mx-auto">
        <div class="items-center lg:flex">
          <div class="w-full lg:w-1/2">
            <div class="lg:max-w-lg">
              <h1 class="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                Need to see <br /> a{" "}
                <span class="text-blue-500 ">Gynecologist?</span>
              </h1>

              <p class="mt-3  text-gray-600 dark:text-gray-400">
              Skip the waiting room and get easy access to an online 
             <br /> gynecologist at a time that suits you at Gyno Hub. 
              </p>
              <p class="mt-3 text-gray-600 dark:text-gray-400"> 
               Enjoy easier, more convenient gynecology treatment.
              </p>

              <button class="w-full px-5 py-2 mt-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                Book Now
              </button>
            </div>
          </div>

          <div class="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <img
              class="w-full h-full lg:max-w-3xl"
              src={women}
              alt="Catalogue-pana.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
