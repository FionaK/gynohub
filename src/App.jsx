import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import AboutGyna from "./components/AboutGyna";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import Notification from "./components/Notification"

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();




  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub(); 
    };
  }, [fetchUserInfo]);

	return (
		<>
			<div className="max-w-[1280px] mx-auto p-8 text-center">
				<AuthContextProvider>
					<Navbar />

					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/" element={<Home />} />
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/gyno/:id"
							element={
								<ProtectedRoute>
									<AboutGyna />{" "}
								</ProtectedRoute>
							}
						/>
					</Routes>

					<Footer />
				</AuthContextProvider>
				<Notification />
			</div>
		</>
	);
}

export default App;
