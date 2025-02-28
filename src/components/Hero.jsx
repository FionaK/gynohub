import React from "react";
import women from "../assets/women2.svg";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Hero = () => {
	const { user } = UserAuth();
	return (
		<section className="dark:bg-gray-800 dark:text-gray-800">
			<div class="container px-6 py-16 mx-auto">
				<div class="items-center lg:flex">
					<div class="w-full lg:w-1/2">
						<div class="lg:max-w-lg">
							<h1 class="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
								Need to see <br /> a{" "}
								<span class="text-blue-500 ">Gynaecologist?</span>
							</h1>

							<p class="mt-3  text-gray-600 dark:text-gray-400">
								Skip the waiting room and get easy access to an online
								<br /> gynaecologist at a time that suits you.
							</p>
							<p class="mt-3 text-gray-600 dark:text-gray-400">
								Enjoy easy and convenient gynaecological treatment.
							</p>

							<button class="w-full px-5 py-2 mt-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
								{!user?.email ? (
									<Link
										// class="btn btn-outline text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
										to={"/login"}
									>
										Book Now
									</Link>
								) : (
									<Link
										// class="btn btn-outline text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
										to={"/dashboard"}
									>
										Book Now
									</Link>
								)}
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
