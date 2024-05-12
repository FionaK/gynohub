import React, { useEffect, useState } from "react";
import {
	doc,
	onSnapshot,
	query,
	where,
	updateDoc,
	collection,
	getDoc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { toast, Bounce } from "react-toastify";

import { PaystackButton } from "react-paystack";

const Table = () => {
	const { user } = UserAuth();

	const [bookings, setBookings] = useState([]);

	// console.log(bookings);
	// console.log(bookings.bookings);

	const config = {
		reference: new Date().getTime().toString(),
		email: user?.email,
		amount: 2000,
		publicKey: "pk_live_13c11349c966c61d45a57db7df526feee4919cb5",
		currency: "KES",
	};

	useEffect(() => {
		if (!user || !user.email) return;
		const docRef = doc(db, "bookings", user?.email);

		// Subscribe to document changes
		const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
			if (docSnapshot.exists()) {
				// Update state with the new data
				const bookingsData = docSnapshot.data();
				if (bookingsData && Array.isArray(bookingsData.bookings)) {
					setBookings(bookingsData.bookings);
				} else {
					console.log("Invalid data format from Firestore");
				}
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

	const handlePaystackSuccessAction = async (reference, uuid) => {
		const userEmail = user?.email;
		const docRef = doc(db, "bookings", userEmail);

		if (reference.status === "success") {
			const index = bookings.findIndex((booking) => booking.uuid === uuid);

			if (index !== -1) {
				// Update the attribute
				const updatedBookings = [...bookings];
				updatedBookings[index].paid = true;

				try {
					await updateDoc(docRef, { bookings: updatedBookings });
					toast.success("Payment Successfull", {
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
				} catch (error) {
					toast.error("Payment Unsuccesfull", {
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
			} else {
				console.log("Booking not found");
			}
		}
	};

	const handlePaystackCloseAction = () => {
		console.log("closed");
		toast.success("Payment Successfull ghg", {
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
	};

	return (
		<div className="overflow-x-auto">
			<table className="table table-zebra">
				{/* head */}
				<thead>
					<tr>
						<th>Gynecologist</th>
						<th>Service</th>
						<th>Date</th>
						<th>Status</th>
						<th>Paid</th>
						<th>Pay</th>
					</tr>
				</thead>
				<tbody>
					{bookings?.map((booking, index) => (
						<tr key={index}>
							<td>
								<div className="flex items-center gap-3">
									<div className="mask mask-squircle w-12 h-12">
										<img src={booking?.gynaPic} alt="gyna pic" />
									</div>
									<div>
										<div className="font-bold">{booking?.gynaName}</div>
										<div className="text-sm opacity-50">
											{booking?.gynaEmail}
										</div>
									</div>
								</div>
							</td>
							<td>{booking?.service}</td>
							<td>{booking?.date}</td>
							<td>
								{booking?.bookingConfirmed ? "Confirmed" : "Not Confirmed"}
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
								{booking?.paid ? (
									<button className="btn btn-primary btn-disabled btn-xs">
										Paid
									</button>
								) : (
									<button className="btn btn-primary btn-xs">
										<PaystackButton
											{...config}
											text="Pay"
											onSuccess={(reference) =>
												handlePaystackSuccessAction(reference, booking.uuid)
											}
											onClose={handlePaystackCloseAction}
										/>
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

export default Table;
