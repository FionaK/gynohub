import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const Profile = () => {
	const { user } = UserAuth();
	const photoUrl = user?.reloadUserInfo?.photoUrl;
	const name = user?.displayName;
	console.log(name);

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
						src={photoUrl || "./avatar.png"}
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
							{user?.email}
						</p>
					</div>
					<div className="col-span-full sm:col-span-3">
						<p className="text-sm text-left">Address</p>
						<p className="block w-full text-left py-2 mt-2 text-gray-700 bg-white text-2xl font-extrabold dark:bg-gray-800 dark:text-gray-300 ">
							{user?.residence}
						</p>
					</div>
					<div className="col-span-full sm:col-span-2">
						<p className="text-sm text-left">City</p>
						<p className="block w-full text-left py-2 mt-2 text-gray-700 bg-white text-2xl font-extrabold dark:bg-gray-800 dark:text-gray-300 ">
							{user?.city}
						</p>
					</div>
					<div className="col-span-full sm:col-span-2">
						{" "}
						<p className="text-sm text-left">County</p>
						<p className="block w-full text-left py-2 mt-2 text-gray-700 bg-white text-2xl font-extrabold dark:bg-gray-800 dark:text-gray-300 ">
							{user?.county}
						</p>
					</div>
					<div className="col-span-full sm:col-span-2">
						<p className="text-sm text-left">Phone</p>
						<p className="block w-full text-left py-2 mt-2 text-gray-700 bg-white text-2xl font-extrabold dark:bg-gray-800 dark:text-gray-300 ">
							{user?.phone}
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
					<form
						method="dialog"
						noValidate=""
						className="container flex flex-col mx-auto space-y-12"
					>
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>

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
										placeholder={user?.email ? user?.email : "Email"}
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
										placeholder=""
										name={user?.phone ? user?.phone : "Phone"}
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
											user?.residence ? user?.residence : "Residence"
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
										placeholder={user?.city ? user?.city : "City"}
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
										placeholder={user?.county ? user?.county : "County"}
										name="county"
										className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									/>
								</div>
							</div>
						</fieldset>
						<button
							className="btn bg-blue-500 hover:bg-blue-300 text-black"
							type="button"
						>
							Update Profile
						</button>
					</form>
				</div>
			</dialog>
		</section>
	);
};

export default Profile;
