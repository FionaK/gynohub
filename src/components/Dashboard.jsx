import React from "react";
import Table from "./Table";
import { UserAuth } from "../context/AuthContext";
import Cards from "./Cards";

const Dashboard = () => {
	const { user } = UserAuth();

	return (
		<section class="bg-white dark:bg-gray-800">
			<div class="container px-6 py-10 mx-auto bg-white dark:bg-gray-800">
				<div class="grid grid-cols-12 gap-4">
					<div class="col-span-12 ">
						<div className="flex justify-between">
							<p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
								{user?.displayName || user?.email}
							</p>

							<button
								onClick={() =>
									document.getElementById("my_modal_1").showModal()
								}
								class="btn text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
							>
								Book
							</button>
						</div>

						<div role="tablist" className="tabs tabs-lifted">
							<input
								type="radio"
								name="my_tabs_2"
								role="tab"
								className="tab"
								aria-label="My Appointments"
								checked
							/>
							<div
								role="tabpanel"
								className="tab-content bg-base-100 border-base-300 rounded-box p-6"
							>
								{" "}
								<Table />
							</div>

							<input
								type="radio"
								name="my_tabs_2"
								role="tab"
								className="tab"
								aria-label="Gynacologists"
							/>
							<div
								role="tabpanel"
								className="tab-content bg-base-100 border-base-300 rounded-box p-6"
							>
								<Cards />
							</div>
						</div>
					</div>

					{/* Open the modal using document.getElementById('ID').showModal() method */}

					<dialog id="my_modal_1" className="modal">
						<div className="modal-box bg-white rounded-md  dark:bg-gray-800 ">
							<h3 className="font-bold text-lg">Make Your Booking</h3>
							<div className="modal-action">
								<form method="dialog">
									<section class="max-w-4xl p-6 mx-auto bg-white rounded-md  dark:bg-gray-800">
										<form>
											<div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
												<div>
													<label
														class="text-gray-700 dark:text-gray-200"
														for="username"
													>
														Firstname
													</label>
													<input
														id="username"
														type="text"
														class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
													/>
												</div>

												<div>
													<label
														class="text-gray-700 dark:text-gray-200"
														for="emailAddress"
													>
														Lastname
													</label>
													<input
														id="emailAddress"
														type="email"
														class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
													/>
												</div>

												<div>
													<label
														class="text-gray-700 dark:text-gray-200"
														for="password"
													>
														Email
													</label>
													<input
														id="password"
														type="email"
														class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
													/>
												</div>

												<div>
													<label
														class="text-gray-700 dark:text-gray-200"
														for="passwordConfirmation"
													>
														Description
													</label>
													<input
														id="passwordConfirmation"
														type="text"
														class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
													/>
												</div>


												<div>
													<label
														class="text-gray-700 dark:text-gray-200"
														for="passwordConfirmation"
													>
														Gynaecologist
													</label>
												<select className="select select-bordered w-full max-w-xs">
													<option disabled selected>
														Choose your Specialist
													</option>
													<option>Dr.Gupta</option>
													<option>Dr. Njathika</option>
													<option>Dr. Shree</option>
													<option>Dr. Prawagal</option>
													<option>Dr. Susan</option>
												</select>
                        </div>
											</div>

											<div class="flex justify-end mt-6">
												<button class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
													Book
												</button>
												<button className="btn ml-5">Cancel</button>
											</div>
										</form>
									</section>
								</form>
							</div>
						</div>
					</dialog>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
