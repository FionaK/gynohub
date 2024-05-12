import React, { useState } from "react";
import { db } from "../lib/firebase";
import {
	query,
	where,
	getDocs,
	doc,
	setDoc,
	collection,
} from "firebase/firestore";
import upload from "../lib/upload";
import { toast, Bounce } from "react-toastify";

const AddGyno = () => {
	const [loading, setLoading] = useState(false);
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const {
			firstname,
			lastname,
			email,
			address,
			city,
			phone,
			county,
			username,
			website,
			bio,
		} = Object.fromEntries(formData);

		// VALIDATE UNIQUE USERNAME
		const usersRef = collection(db, "gynas");
		const q = query(usersRef, where("email", "==", email));
		const querySnapshot = await getDocs(q);
		if (!querySnapshot.empty) {
			return toast.warn("Email already exists", {
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

		try {
			setLoading(true);
			const imgUrl = await upload(avatar.file);

			await setDoc(doc(db, "gynas", email), {
				firstname,
				lastname,
				email,
				address,
				city,
				county,
				phone,
				username,
				website,
				bio,
				image: imgUrl,
			});

			toast.success("Gynaecologist added")
			e.target.reset();
			setLoading(false);

		} catch (err) {
			console.log(err);
		}
	};

	return (
		<section className="p-6 dark:bg-gray-800 dark:text-gray-50">
			<form
				noValidate=""
				className="container flex flex-col mx-auto space-y-12"
				onSubmit={handleSubmit}
			>
				<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-800">
					<div className="space-y-2 col-span-full lg:col-span-1">
						<p className="font-medium">Personal Inormation</p>
						<p className="text-xs">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
							fuga autem eum!
						</p>
					</div>
					<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
						<div className="col-span-full sm:col-span-3">
							<label class="text-gray-700 dark:text-gray-200" for="firstname">
								First name
							</label>
							<input
								id="firstname"
								type="text"
								name="firstname"
								placeholder="First Name"
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
								placeholder="Last name"
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
								placeholder="Email"
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
								placeholder=""
								name="address"
								className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
							/>
						</div>
						<div className="col-span-full sm:col-span-2">
							<label htmlFor="city" className="text-sm">
								City
							</label>
							<input
								id="city"
								type="text"
								placeholder=""
								name="city"
								className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
							/>
						</div>
						<div className="col-span-full sm:col-span-2">
							<label htmlFor="state" className="text-sm">
								County
							</label>
							<input
								id="state"
								type="text"
								placeholder=""
								name="county"
								className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
							/>
						</div>
						<div className="col-span-full sm:col-span-2">
							<label htmlFor="zip" className="text-sm">
								Phone
							</label>
							<input
								id="zip"
								type="text"
								placeholder=""
								name="phone"
								className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
							/>
						</div>
					</div>
				</fieldset>
				<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-800">
					<div className="space-y-2 col-span-full lg:col-span-1">
						<p className="font-medium">Profile</p>
						<p className="text-xs">Adipisci fuga autem eum!</p>
					</div>
					<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
						<div className="col-span-full sm:col-span-3">
							<label htmlFor="username" className="text-sm">
								Username
							</label>
							<input
								id="username"
								type="text"
								name="username"
								placeholder="Username"
								className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
							/>
						</div>
						<div className="col-span-full sm:col-span-3">
							<label htmlFor="website" className="text-sm">
								Website
							</label>
							<input
								id="website"
								type="text"
								name="website"
								placeholder="https://"
								className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
							/>
						</div>
						<div className="col-span-full">
							<label htmlFor="bio" className="text-sm">
								Bio
							</label>
							<textarea
								id="bio"
								placeholder=""
								name="bio"
								className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
							></textarea>
						</div>
						<div className="col-span-full">
							<label htmlFor="bio" className="text-sm">
								Photo
							</label>
							<div className="flex flex-row items-center space-x-2">
								<label htmlFor="file">
									<img
										className="w-10 h-10 dark:bg-gray-800 rounded-full cursor-pointer"
										src={avatar.url || "./avatar.png"}
										alt=""
									/>
								</label>
								<input
									type="file"
									id="file"
									// style={{ display: "none" }}
									onChange={handleAvatar}
									className=""
								/>
							</div>
						</div>
					</div>
				</fieldset>
				<button className="btn" type="submit">
					{loading ? "Loading" : "Submit"}
				</button>
			</form>
		</section>
	);
};

export default AddGyno;
