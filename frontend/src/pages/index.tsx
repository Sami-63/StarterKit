import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { signOut } from "@/redux/authSlice";

export default function Home() {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(signOut());
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <h1 className="text-5xl font-bold mb-8">Welcome to Our App</h1>
            {user ? (
                <div className="text-center">
                    <p className="text-xl">
                        Welcome, {user.name} ({user.email})
                    </p>
                    <p>{user.is_verified ? "Verified User" : "Not Verified"}</p>
                    <button
                        className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-700 transition duration-300 mt-4"
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="flex space-x-4">
                    <Link href="/login">
                        <p className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-700 transition duration-300">
                            Login
                        </p>
                    </Link>
                    <Link href="/register">
                        <p className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-700 transition duration-300">
                            Register
                        </p>
                    </Link>
                </div>
            )}
        </div>
    );
}
