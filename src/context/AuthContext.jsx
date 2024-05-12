import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from "firebase/auth";

import { setDoc, doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const AuthContext = createContext();

const Toast = Swal.mixin({
	toast: true,
	position: "top-right",
	iconColor: "red",
	customClass: {
		popup: "colored-toast",
	},
	showConfirmButton: false,
	timer: 5000,
	timerProgressBar: true,
});

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState({});

	async function googleSignIn() {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			const user = result.user;

			const gynaDocRef = doc(db, "gynas", user?.email);
			const gynaDocSnap = await getDoc(gynaDocRef);

			setDoc(doc(db, "users", user.email), {
				bookings: [],
				email: user.email,
				name: user.displayName,
				phoneNumber: "",
				age: "",
				residence: "",
				city: "",
				county: "",
				photoUrl: user.photoURL,
				isGyna: gynaDocSnap.exists() ? true : false, // Check if document exists
			});

			setDoc(doc(db, "userchats", user.email), {
				chats: [],
			});
		} catch (error) {
			console.log(error);
			Toast.fire({
				icon: "error",
				title: "Failed",
				text: "Please try another method",
			});
		}
	}

	const signUp = async (email, password) => {
		createUserWithEmailAndPassword(auth, email, password);
		const docRef = doc(db, "users", email);
		const docSnap = await getDoc(docRef);

		const gynaDocRef = doc(db, "gynas", user?.email);
		const gynaDocSnap = await getDoc(gynaDocRef).then((doc) => doc.exists());

		if (docSnap.exists()) {
			console.log("Document exist!");
			// Throws an error.
			throw new Error("Document Exist!");
		} else {
			await setDoc(docRef, {
				bookings: [],
				email: "",
				name: "",
				phoneNumber: "",
				age: "",
				residence: "",
				city: "",
				county: "",
				photoUrl: "",
				isGyna: gynaDocSnap ? true : false,
			});

			await setDoc(doc(db, "userchats", email), {
				chats: [],
			});
		}
	};

	function logIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logOut() {
		return signOut(auth);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ googleSignIn, signUp, logIn, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
}

export function UserAuth() {
	return useContext(AuthContext);
}
