import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const Cards = () => {
	const navigate = useNavigate();

	const handleViewClick = (id) => {
		// Navigate to the dynamic route with the item's id
		navigate(`/gyno/${id}`); // Change the route as per your requirement
	};

	const [gynas, setGynas] = useState([]);

	useEffect(() => {
		const getCollectionData = async () => {
			const collectionRef = collection(db, "gynas"); 
			const snapshot = await getDocs(collectionRef);
			const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })); // Extract data and add ID
			setGynas(data);
		};

		getCollectionData();

		// Clean up function (optional)
		return () => {
			// Unsubscribe from any listeners or cleanup logic here (if needed)
		};
	}, []);

	return (
		<div className="grid grid-cols-4 gap-4">
			{gynas.length > 0 ? (
				gynas.map((item) => (
					<div
						key={item.id}
						className="flex flex-col items-center justify-center w-full max-w-sm mx-auto"
					>
						<div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md">
							<div className="w-full h-72 bg-gray-300 bg-center bg-cover rounded-lg shadow-md">
								<img
									src={item?.image}
									alt={item?.firstname}
									className="w-full h-full object-cover rounded-lg"
								/>
							</div>
						</div>

						<div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
							<h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
								{item?.firstname} {item?.lastname}
							</h3>

							<div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
								<p className="text-gray-700 dark:text-gray-200">{item?.city}</p>

								<button
									className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
									onClick={() => handleViewClick(item?.id)}
								>
									View
								</button>
							</div>
						</div>
					</div>
				))
			) : (
				<p>Loading data...</p>
			)}
		</div>
	);
};

export default Cards;
