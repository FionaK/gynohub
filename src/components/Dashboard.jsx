import React from "react";
import Table from "./Table";
import { UserAuth } from "../context/AuthContext";


const Dashboard = () => {
  const { user } = UserAuth();

  return (
    <section class="bg-white dark:bg-gray-800">
      <div class="container px-6 py-10 mx-auto">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-8 ">
            <p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
              My Appointments: {user?.email}
            </p>
            <Table />
          </div>
          <div class="col-span-4 ">
          <p class="mt-24 border rounded-md py-3 text-xl text-center text-gray-600 dark:text-gray-200">
              No virtual sessions
            </p>
            <div class="mt-12">
              <button class="btn btn-success w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Book a virtual session
              </button>

              <button class="btn btn-success mt-6 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
