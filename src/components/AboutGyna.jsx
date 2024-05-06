import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, onSnapshot, arrayUnion, updateDoc } from "firebase/firestore"; // Import for fetching a single document
import { db } from "../lib/firebase"; // Assuming db is imported from your Firebase config
import { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { UserAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const AboutGyna = () => {
	const { id } = useParams();
	const [gynaData, setGynaData] = useState(null);
	const { user } = UserAuth();

	const config = {
		reference: new Date().getTime().toString(),
		email: "user@example.com",
		amount: 20000,
		publicKey: "pk_test_06f0f6d5f5222c1fd5316744a827130dfd91b7da",
		currency: "KES",
	};

	// you can call this function anything
	const onSuccess = (reference) => {
		// Implementation for whatever you want to do with reference and after success call.
		console.log(reference);
	};

	// you can call this function anything
	const onClose = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log("closed");
	};

	const PaystackHookExample = () => {
		const initializePayment = usePaystackPayment(config);
		return (
			<div>
				<button
					onClick={() => {
						initializePayment(onSuccess, onClose);
					}}
					className="btn mx-3 my-3"
				>
					Pay With Paystack
				</button>
			</div>
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const { date, service } = Object.fromEntries(formData);
	
		try {
			const docRef = doc(db, "bookings", user?.email);
			const docSnap = await getDoc(docRef);
	
			if (docSnap.exists()) {
				// If document exists, update it
				await updateDoc(docRef, {
					bookings: arrayUnion({
						uuid: uuidv4(),
						date,
						service,
						gynaEmail: gynaData?.email,
						gynaName: gynaData?.firstname + " " + gynaData?.lastname, 
						gynaCity: gynaData?.city,
						bookingFor: user?.email,
						bookingStatus: "pending"
					})
				});
			} else {
				// If document doesn't exist, create it
				await setDoc(docRef, {
					bookings: [{
						uuid: uuidv4(),
						date,
						service,
						gynaEmail: gynaData?.email,
						gynaName: gynaData?.firstname + " " + gynaData?.lastname, 
						gynaCity: gynaData?.city,
						bookingFor: user?.email,
						bookingStatus: "pending"
					}]
				});
			}
		} catch (err) {
			console.error("Error updating document: ", err);
		}
	};
	  

	useEffect(() => {
		const getGynaDetails = async () => {
			const docRef = doc(db, "gynas", id); // Reference the specific document
			const docSnap = await getDoc(docRef);

			if (docSnap.exists) {
				setGynaData(docSnap.data()); // Set data if document exists
			} else {
				// Handle document not found scenario (optional)
				console.log("No such document!");
			}
		};

		getGynaDetails();

		// Clean up function (optional)
		return () => {
			// Unsubscribe from any listeners or cleanup logic here (if needed)
		};
	}, [id]); // Dependency array ensures effect runs only on id change

	return (
		<section class="bg-white dark:bg-gray-800/40">
			{gynaData ? ( // Conditionally render data if available
				<div class="container flex gap-1 px-6 py-12 mx-auto ">
					<div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
						<div className="w-full h-72 bg-gray-300 bg-center bg-cover rounded-lg shadow-md">
							<img
								src={gynaData?.image}
								alt=""
								className="w-full h-full object-cover rounded-lg"
							/>
						</div>
					</div>
					<div class="lg:my-12 lg:mx-12 lg:order-2">
						<h1 class="text-3xl text-left font-semibold tracking-wide text-gray-800 dark:text-white lg:text-3xl">
							{gynaData?.firstname} {gynaData?.lastname}
						</h1>
						<p className="text-gray-700 text-left dark:text-gray-200">
							{gynaData?.bio}
						</p>
						<p class="mt-4 text-gray-600 text-left dark:text-gray-300">
							{gynaData?.description}
						</p>
						<button
							onClick={() => document.getElementById("my_modal_3").showModal()}
							className="btn w-full mt-5 px-10 py-3 text-lg font-medium rounded-3xl dark:bg-violet-600 dark:text-gray-50"
						>
							Schedule
						</button>
					</div>
				</div>
			) : (
				<p>Loading data...</p>
			)}

			{/* You can open the modal using document.getElementById('ID').showModal() method */}

			<dialog id="my_modal_3" className="modal">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">Hello!</h3>
					<p className="py-4">
						Enter the date you'd like to have an appointment
					</p>
					<form onSubmit={handleSubmit}>
						<input
							id="date"
							type="text"
							name="date"
							placeholder="date"
							className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
						/>

						<input
							id="date"
							type="text"
							name="service"
							placeholder="Briefly state your service"
							className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
						/>

						<button
							className="btn my-3 w-full bg-blue-500 text-black"
							type="submit"
						>
							{/* {loading ? "Loading" : "Submit"} */}Submit
						</button>
					</form>

					{/* <PaystackHookExample /> */}
				</div>
			</dialog>
		</section>
	);
};

export default AboutGyna;
