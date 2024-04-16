import React from "react";
import contacticon from "../assets/customer-service.png";
import money from "../assets/money.png";
import virtual from "../assets/digital-assistant.png";

const Benefits = () => {
  return (
    <section class="bg-white dark:bg-gray-800">
      
      <div class="container px-6 py-10 mx-auto">
        
        <h1 class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          WHY <span class="text-blue-500">GynoHub?</span>
        </h1>

        <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
          <div class="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
            <span class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
              <img
                class="w-12 h-12"
                src={contacticon}
                alt="Catalogue-pana.svg"
              />
            </span>

            <h1 class="text-xl font-semibold text-gray-700 capitalize dark:text-white">
              24/7 Personal Care
            </h1>

            <p class="text-gray-500 dark:text-gray-300">
              Access personalized sexual health care whenever you need it, day
              or night. 
            </p>
          </div>

          <div class="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
            <span class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
              <img class="w-12 h-12" src={money} alt="Catalogue-pana.svg" />
            </span>

            <h1 class="text-xl font-semibold text-gray-700 capitalize dark:text-white">
              Affordable & Convinient
            </h1>

            <p class="text-gray-500 dark:text-gray-300">
              Enjoy high-quality sexual health care that's both affordable and
              convenient. 
            </p>
          </div>

          <div class="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
            <span class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
              <img class="w-12 h-12" src={virtual} alt="Catalogue-pana.svg" />
            </span>

            <h1 class="text-xl font-semibold text-gray-700 capitalize dark:text-white">
              Virtual Visits
            </h1>

            <p class="text-gray-500 dark:text-gray-300">
              Experience the ease and comfort of virtual consultations from the
              privacy of your own home. 
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Benefits;
