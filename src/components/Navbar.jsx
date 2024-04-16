import React from "react";
import Login from "./Login";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
	const { user, logOut } = UserAuth();
  const photoUrl = user?.reloadUserInfo?.photoUrl;



	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logOut();
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="navbar bg-white dark:bg-gray-800 ">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<a>Home</a>
						</li>
						<li>
							<a>Services</a>
						</li>

						<li>
							<a>Ask Fifi Bot</a>
						</li>

						<li>
							<a>Download App</a>
						</li>
					</ul>
				</div>
				<a className="btn btn-ghost text-xl">GynoHub</a>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						<a>Home</a>
					</li>
					<li>
						<a>Services</a>
					</li>

					<li>
						<a>Ask Fifi Bot</a>
					</li>

					<li>
						<a>Download App</a>
					</li>
				</ul>
			</div>
			<div className="navbar-end">
				{user?.email ? (
					<div className="flex gap-3">
						<Link
							class="btn btn-outline text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
							to="/dashboard"
						>
							Account
						</Link>

						{/* <div className="avatar">
							<div className="w-24 rounded-full">
								<img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
							</div>
						</div> */}

						<div className="dropdown dropdown-hover">
							<div className="avatar">
								<div className="w-16 rounded-full">
									<img src={photoUrl} />
								</div>
							</div>
							<ul
								tabIndex={0}
								className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
							>
								<li>
									<button
										onClick={handleLogout}
										class="btn text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
									>
										Logout
									</button>
								</li>
								<li>
									<Link
										class="btn btn-outline text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
										to="/dashboard"
									>
										Account
									</Link>
								</li>
							</ul>
						</div>
					</div>
				) : (
					<Link
						to={"/login"}
						class="btn text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
					>
						Login
					</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;
