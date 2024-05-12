import { useParams } from "react-router-dom";
import {
	doc,
	getDoc,
	setDoc,
	onSnapshot,
	arrayUnion,
	updateDoc,
} from "firebase/firestore"; // Import for fetching a single document
import { db } from "../lib/firebase"; // Assuming db is imported from your Firebase config
import { useEffect, useRef, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { toast, Bounce } from "react-toastify";
import emailjs from "@emailjs/browser";

const AboutGyna = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [gynaData, setGynaData] = useState(null);
	const { user } = UserAuth();
	const form = useRef();
	const [userDetails, setUserDetails] = useState(null);

	// console.log(userDetails)

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




	const gynaEmail = gynaData?.email;
	const gynaName = gynaData?.firstname + " " + gynaData?.lastname;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!userDetails || !userDetails.phone) {
			// Display error toast
			toast.error("Update your profile at My Profile to book a session", {
				position: "top-center",
				autoClose: 6000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Bounce,
			});
			return; // Exit the function
		}

		const formData = new FormData(e.target);
		const { date, service } = Object.fromEntries(formData);

		try {
			setLoading(true);
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
						gynaPic: gynaData?.image,
						bookingForName: userDetails?.name,
						bookingForEmail: userDetails?.email,
						bookingForPhone: userDetails?.phone,
						bookingForPic: userDetails?.photoUrl,
						bookingConfirmed: false,
						paid: false,
					}),
				});

				const templateParams = {
					toGynaEmail: gynaEmail,
					to_name: gynaName,
					from_name: "gynohub.com",
					message: `Hello, new appoitment by ${userDetails?.name} scheduled for ${date}, service is ${service}`,
					reply_to_name: userDetails?.name,
					userEmail: userDetails?.email,
					reply_message: `Your appointment by Dr. ${gynaName} has been booked. Pay for appoitment on My Appoitments Tab.`,
				};

				emailjs
					.send("service_s3comep", "template_m4qhmtv", templateParams, {
						publicKey: "HMFI3tsHD3GasUWpv",
					})
					.then(
						(response) => {
							console.log("SUCCESS!", response.status, response.text);
						},
						(error) => {
							console.log("FAILED...", error);
						}
					);

				setLoading(false);
				toast.success("Appoitment Sheduled, Pending Payment(My Appoitments)", {
					position: "top-center",
					autoClose: 6000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
					transition: Bounce,
				});
				e.target.reset();
			} else {
				// If document doesn't exist, create it
				setLoading(true);
				await setDoc(docRef, {
					bookings: [
						{
						uuid: uuidv4(),
						date,
						service,
						gynaEmail: gynaData?.email,
						gynaName: gynaData?.firstname + " " + gynaData?.lastname,
						gynaCity: gynaData?.city,
						gynaPic: gynaData?.image,
						bookingForName: userDetails?.name,
						bookingForEmail: userDetails?.email,
						bookingForPhone: userDetails?.phone,
						bookingForPic: userDetails?.photoUrl,
						bookingConfirmed: false,
						paid: false,
						},
					],
				});
				const templateParams = {
					toGynaEmail: gynaEmail,
					to_name: gynaName,
					from_name: "gynohub.com",
					message: `Hello, new appoitment by ${userDetails?.name} scheduled for ${date}, service is ${service}`,
					reply_to_name: userDetails?.name,
					userEmail: userDetails?.email,
					reply_message: `Your appointment by Dr. ${gynaName} has been booked. Pay for appoitment on My Appoitments Tab.`,
				};

				emailjs
					.send("service_s3comep", "template_m4qhmtv", templateParams, {
						publicKey: "HMFI3tsHD3GasUWpv",
					})
					.then(
						(response) => {
							console.log("SUCCESS!", response.status, response.text);
						},
						(error) => {
							console.log("FAILED...", error);
						}
					);




				setLoading(false);
				toast.success("Appoitment Sheduled, Pending Payment(My Appoitments)", {
					position: "top-center",
					autoClose: 6000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
					transition: Bounce,
				});
				e.target.reset();
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
	}, [id]);



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
							className="btn w-full mt-5 px-10 py-3 text-lg font-medium rounded-3xl dark:bg-blue-500 hover:bg-blue-300 dark:text-gray-50"
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
					<form ref={form} onSubmit={handleSubmit}>
						<input
							id="date"
							type="text"
							name="date"
							required
							placeholder="date"
							className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
						/>

						<input
							id="date"
							type="text"
							name="service"
							required
							placeholder="Briefly state your service"
							className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
						/>

						<button
							className="btn my-3 w-full bg-blue-500 hover:bg-blue-300 text-black"
							type="submit"
						>
							{loading ? "Loading" : "Submit"}
						</button>
					</form>


				</div>
			</dialog>
		</section>
	);
};

export default AboutGyna;
