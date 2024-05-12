import React, { useEffect, useState } from "react";
import {
	doc,
	onSnapshot,
	updateDoc,
	query,
	where,
	collection,
	getDocs,
	collectionGroup,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { toast, Bounce } from "react-toastify";
import { filterBookings } from "../lib/filterBookings";
import emailjs from "@emailjs/browser";

const GynaTable = () => {
	const { user } = UserAuth();

	const [bookings, setBookings] = useState([]);
	const [filteredBookings, setFilteredBookings] = useState([]);

	useEffect(() => {
		if (user && user.email) {
			const unsubscribe = onSnapshot(
				collectionGroup(db, "bookings"),
				(snapshot) => {
					const bookingsData = [];
					snapshot.forEach((doc) => {
						bookingsData.push(doc.data());
					});
					const filtered = filterBookings(bookingsData, user.email);
					setBookings(bookingsData);
					setFilteredBookings(filtered);
				}
			);

			return () => {
				unsubscribe(); // Unsubscribe when component unmounts
			};
		}
	}, [user]);

	// const filteredBookings = filterBookings(bookings, user?.email);

	const handleConfirm = async (uuid, email) => {
		// Iterate over the outer array to access the 'bookings' array within each object
		for (const bookingData of bookings) {
			const bookingsArray = bookingData.bookings;

			// Search within the 'bookings' array for the booking with the matching 'uuid'
			const index = bookingsArray.findIndex((booking) => booking.uuid === uuid);

			// If the booking is found in the 'bookings' array
			if (index !== -1) {
				const docRef = doc(db, "bookings", email);

				// Update the 'bookingConfirmed' attribute
				const updatedBookings = [...bookingsArray];
				updatedBookings[index].bookingConfirmed = true;

				try {
					await updateDoc(docRef, { bookings: updatedBookings });

					toast.success("Booking Confirmed", {
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

					const templateParams = {
						toGynaEmail: email,
						to_name: email,
						from_name: "gynohub.com",
						message: `Hello, your appoitment has been confirmed`,
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
				} catch (error) {
					console.log(error);
					toast.error("Booking Confirmation Failed", {
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
				}

				// Exit the loop after processing the booking
				return;
			}
		}

		// If the booking with the given 'uuid' is not found in any 'bookings' array
		console.log("Booking not found");
	};

	return (
		<div className="overflow-x-auto">
			<table className="table table-zebra">
				{/* head */}
				<thead>
					<tr>
						<th>Client</th>
						<th>Phone</th>
						<th>Service</th>
						<th>Date</th>
						<th>Status</th>
						<th>Paid</th>
						<th>Pay</th>
					</tr>
				</thead>
				<tbody>
					{filteredBookings?.map((booking, index) => (
						<tr key={index}>
							<td>
								<div className="flex items-center gap-3">
									<div className="mask mask-squircle w-12 h-12">
										<img src={booking?.bookingForPic} alt="gyna pic" />
									</div>
									<div>
										<div className="font-bold">{booking?.bookingForName}</div>
										<div className="text-sm opacity-50">
											{booking?.bookingForEmail}
										</div>
									</div>
								</div>
							</td>
							<td>{booking?.bookingForPhone}</td>
							<td>{booking?.service}</td>
							<td>{booking?.date}</td>
							<td>
								{booking?.bookingConfirmed ? (
									<>
										<p className="text-success">Confirmed</p>
									</>
								) : (
									<>
										<p className="text-error">Not Confirmed</p>
									</>
								)}
							</td>

							<td>
								{booking?.paid ? (
									<>
										<p className="text-success">Paid</p>
									</>
								) : (
									<>
										<p className="text-error">Not Paid</p>
									</>
								)}
							</td>
							<td>
								{booking?.bookingConfirmed ? (
									<button className="btn btn-primary btn-disabled btn-xs">
										Confirmed
									</button>
								) : (
									<button
										onClick={() =>
											handleConfirm(booking?.uuid, booking?.bookingForEmail)
										}
										className="btn btn-primary btn-xs"
									>
										Confirm
									</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default GynaTable;
