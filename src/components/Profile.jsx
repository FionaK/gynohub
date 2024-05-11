import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import upload from "../lib/upload";
import { toast, Bounce } from "react-toastify";

const Profile = () => {
	const { user } = UserAuth();
	const [loading, setLoading] = useState();
	const [userDetails, setUserDetails] = useState(null);

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

	const name = userDetails?.name || user?.displayName;
	const photoUrl = userDetails?.photoUrl || user?.reloadUserInfo?.photoUrl;

	const [avatar, setAvatar] = useState({
		file: null,
		url: "",
	});

	const handleAvatar = (e) => {
		if (e.target.files[0]) {
			setAvatar({
				file: e.target.files[0],
				url: URL.createObjectURL(e.target.files[0]),
			});
		}
	};

	function separateNames(displayName) {
		// Split the display name into first name and last name
		const names = displayName.split(" ");

		// Extract first name and last name
		const firstName = names[0];
		const lastName = names.slice(1).join(" ");

		// Return an object containing both names
		return {
			firstName: firstName,
			lastName: lastName,
		};
	}

	// const displayName = user?.displayName;
	const separatedNames = name
		? separateNames(name)
		: { firstName: "", lastName: "" };

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const { firstname, lastname, address, city, phone, county } =
			Object.fromEntries(formData);

		try {
			setLoading(true);
			const updateObj = {};

			if (firstname) updateObj.name = firstname + " " + lastname;
			if (address) updateObj.residence = address;
			if (city) updateObj.city = city;
			if (county) updateObj.county = county;
			if (phone) updateObj.phone = phone;

			// If there's a file selected, upload it and update the photoUrl
			if (avatar.file) {
				const imgUrl = await upload(avatar.file);
				updateObj.photoUrl = imgUrl;
			}

			// Update only if there's at least one field to update
			if (Object.keys(updateObj).length > 0) {
				const docRef = doc(db, "users", user?.email);
				await updateDoc(docRef, updateObj);
			}



			toast.success("Profile Updated Successfully", {
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
			setLoading(false);
		} catch (err) {
			setLoading(false);
			toast.error("Profile Updating Failed", {
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
			console.log(err);
		}
	};

	return (
		<section className="p-6 dark:bg-gray-800 dark:text-gray-50">
			<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-800">
				<div className="space-y-2 col-span-full lg:col-span-1">
					<p className="font-medium">Personal Inormation</p>
					<p className="text-xs">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
						fuga autem eum!
					</p>
					<img
						className="w-24 h-24 dark:bg-gray-800 rounded-full cursor-pointer ml-16"
						src={userDetails?.photoUrl || "./avatar.png"}
						alt=""
					/>
				</div>
				<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
					<div className="col-span-full sm:col-span-3">
						<p className="text-sm text-left">First Name</p>
						<p className="block w-full text-left py-2 mt-2 text-gray-700 bg-white text-2xl font-extrabold dark:bg-gray-800 dark:text-gray-300 ">
							{separatedNames?.firstName}
						</p>
					</div>
					<div className="col-span-full sm:col-span-3">
						<p className="text-sm text-left">Last Name</p>
						<p className="block w-full text-left py-2 mt-2 text-gray-700 bg-white text-2xl font-extrabold dark:bg-gray-800 dark:text-gray-300 ">
							{separatedNames?.lastName}
						</p>
					</div>

					<div className="col-span-full sm:col-span-3">
						<p className="text-sm text-left">Email</p>
						<p className="block w-full text-left py-2 mt-2 text-gray-700 bg-white text-2xl font-extrabold dark:bg-gray-800 dark:text-gray-300 ">
							{userDetails?.email}
						</p>
					</div>
					<div className="col-span-full sm:col-span-3">
						<p className="text-sm text-left">Address</p>
						<p className="block w-full text-left py-2 mt-2 text-gray-700 bg-white text-2xl font-extrabold dark:bg-gray-800 dark:text-gray-300 ">
							{userDetails?.residence}
						</p>
					</div>
					<div className="col-span-full sm:col-span-2">
						<p className="text-sm text-left">City</p>
						<p className="block w-full text-left py-2 mt-2 text-gray-700 bg-white text-2xl font-extrabold dark:bg-gray-800 dark:text-gray-300 ">
							{userDetails?.city}
						</p>
					</div>
					<div className="col-span-full sm:col-span-2">
						{" "}
						<p className="text-sm text-left">County</p>
						<p className="block w-full text-left py-2 mt-2 text-gray-700 bg-white text-2xl font-extrabold dark:bg-gray-800 dark:text-gray-300 ">
							{userDetails?.county}
						</p>
					</div>
					<div className="col-span-full sm:col-span-2">
						<p className="text-sm text-left">Phone</p>
						<p className="block w-full text-left py-2 mt-2 text-gray-700 bg-white text-2xl font-extrabold dark:bg-gray-800 dark:text-gray-300 ">
							{userDetails?.phone}
						</p>
					</div>
				</div>
				<button
					className="btn"
					type="button"
					onClick={() => document.getElementById("my_modal_3").showModal()}
				>
					Update Profile
				</button>
			</fieldset>

			<dialog id="my_modal_3" className="modal">
				<div className="modal-box w-11/12 max-w-5xl dark:bg-gray-800">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>

					<form
						method="dialog"
						noValidate=""
						className="container flex flex-col mx-auto space-y-12 "
						onSubmit={handleSubmit}
					>
						<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-800">
							<div className="space-y-2 col-span-full lg:col-span-1">
								<p className="font-medium">Personal Information Update</p>

								<div className="col-span-full">
									<label htmlFor="bio" className="text-sm">
										Photo
									</label>
									<div className="flex flex-col items-center space-x-2">
										<label htmlFor="file">
											<img
												className="w-24 h-124 dark:bg-gray-800 rounded-full cursor-pointer"
												src={avatar.url || photoUrl}
												alt=""
											/>
										</label>
										<br />
										<input
											type="file"
											id="file"
											// style={{ display: "none" }}
											onChange={handleAvatar}
											className="pl-10"
										/>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
								<div className="col-span-full sm:col-span-3">
									<label
										class="text-gray-700 dark:text-gray-200"
										for="firstname"
									>
										First name
									</label>
									<input
										id="firstname"
										type="text"
										name="firstname"
										placeholder={
											separatedNames?.firstName
												? separatedNames?.firstName
												: "First Name"
										}
										className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									/>
								</div>
								<div className="col-span-full sm:col-span-3">
									<label htmlFor="lastname" className="text-sm">
										Last name
									</label>
									<input
										id="lastname"
										type="text"
										name="lastname"
										placeholder={
											separatedNames?.lastName
												? separatedNames?.lastName
												: "Last Name"
										}
										className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									/>
								</div>
								<div className="col-span-full sm:col-span-3">
									<label htmlFor="email" className="text-sm">
										Email
									</label>
									<input
										id="email"
										type="email"
										name="email"
										disabled
										placeholder={
											userDetails?.email ? userDetails?.email : "Email"
										}
										className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									/>
								</div>

								<div className="col-span-full sm:col-span-3">
									<label htmlFor="zip" className="text-sm">
										Phone
									</label>
									<input
										id="zip"
										type="text"
										placeholder={
											userDetails?.phone ? userDetails?.phone : "Phone"
										}
										name="phone"
										className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									/>
								</div>

								<div className="col-span-full">
									<label htmlFor="address" className="text-sm">
										Address
									</label>
									<input
										id="address"
										type="text"
										placeholder={
											userDetails?.residence
												? userDetails?.residence
												: "Residence"
										}
										name="address"
										className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									/>
								</div>
								<div className="col-span-full sm:col-span-3">
									<label htmlFor="city" className="text-sm">
										City
									</label>
									<input
										id="city"
										type="text"
										placeholder={userDetails?.city ? userDetails?.city : "City"}
										name="city"
										className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									/>
								</div>
								<div className="col-span-full sm:col-span-3">
									<label htmlFor="state" className="text-sm">
										County
									</label>
									<input
										id="state"
										type="text"
										placeholder={
											userDetails?.county ? userDetails?.county : "County"
										}
										name="county"
										className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									/>
								</div>
							</div>
						</fieldset>
						<button
							className="btn bg-blue-500 hover:bg-blue-300 text-black"
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

export default Profile;
