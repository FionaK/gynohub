import React, { useEffect, useState } from "react";
import Table from "./Table";
import { UserAuth } from "../context/AuthContext";
import Cards from "./Cards";
import AddGyno from "./AddGyno";
import Profile from "./Profile";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import GynaTable from "./GynaTable";

const Dashboard = () => {
	const { user } = UserAuth();
	const [userDetails, setUserDetails] = useState(null);

	console.log(userDetails);

	useEffect(() => {
		if (!user || !user.email) return;
		const docRef = doc(db, "users", user?.email);

		// Subscribe to document changes
		const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
			if (docSnapshot.exists()) {
				// Update state with the new data
				setUserDetails(docSnapshot.data());
			} else {
				// Handle document not found scenario (optional)
				console.log("No such document!");
			}
		});

		// Clean up function to unsubscribe from the snapshot listener
		return () => {
			unsubscribe();
		};
	}, [user?.email]);

	return (
		<section class="bg-white dark:bg-gray-800">
			<div class="container px-6 py-10 mx-auto bg-white dark:bg-gray-800">
				<div class="grid grid-cols-12 gap-4">
					<div class="col-span-12 ">
						<div className="flex justify-between">
							<p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
								{user?.displayName || user?.email}
							</p>
						</div>

						<div role="tablist" className="tabs tabs-lifted dark:bg-gray-800">
							{userDetails?.isGyna ? (
								<>
									<input
										type="radio"
										name="my_tabs_2"
										role="tab"
										className="tab mx-5 my-5"
										aria-label="Manage Appointments"
									/>
									<div
										role="tabpanel"
										className="tab-content bg-base-100 border-base-300 rounded-box p-6"
									>
										<GynaTable />
									</div>
								</>
							) : (
								<>
									<input
										type="radio"
										name="my_tabs_2"
										role="tab"
										className="tab mx-5 my-5"
										aria-label="Appointments"
										checked
									/>
									<div
										role="tabpanel"
										className="tab-content bg-base-100 border-base-300 rounded-box p-6"
									>
										<Table />
									</div>
								</>
							)}

							<input
								type="radio"
								name="my_tabs_2"
								role="tab"
								className="tab mx-5 my-5"
								aria-label="Gynacologists"
							/>
							<div
								role="tabpanel"
								className="tab-content bg-base-100 border-base-300 rounded-box p-6"
							>
								<Cards />
							</div>

							{user?.email === "brian.lyonne@gmail.com" ||
							user?.email === "katefiona121@gmail.com" ? (
								<>
									<input
										type="radio"
										name="my_tabs_2"
										role="tab"
										className="tab mx-5 my-5"
										aria-label="Add Gynaecologists"
									/>
									<div
										role="tabpanel"
										className="tab-content bg-base-100 border-base-300 rounded-box p-6"
									>
										<AddGyno />
									</div>
								</>
							) : null}

							<input
								type="radio"
								name="my_tabs_2"
								role="tab"
								className="tab mx-5 my-5"
								aria-label="My Profile"
							/>
							<div
								role="tabpanel"
								className="tab-content bg-base-100 border-base-300 rounded-box p-6"
							>
								<Profile />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
