import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRegister } from "@/hook/useAuth";
import { useRouter } from "next/router";

const RegisterForm = () => {
    const router = useRouter();

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [formError, setFormError] = useState<string | null>(null);

    const { register, isLoading, error } = useRegister({
        onRegister: () => router.push("/"),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        if (!name || !email || !password || !confirmPassword) {
            return;
        }

        if (password.length < 8) {
            setFormError("Password must be at least 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            setFormError("Passwords do not match");
            return;
        }

        register(name, email, password);
    };

    return (
        <div className="bg-gray-800 p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold text-white mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        ref={nameRef}
                        className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white sm:text-sm bg-gray-900 text-white"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
                        className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white sm:text-sm bg-gray-900 text-white"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        ref={passwordRef}
                        className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white sm:text-sm bg-gray-900 text-white"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        ref={confirmPasswordRef}
                        className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white sm:text-sm bg-gray-900 text-white"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                >
                    Register
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {formError && <p className="text-red-500 mt-4">{formError}</p>}
            <p className="mt-4 text-white">
                Already have an account?{" "}
                <Link href="/login">
                    <span className="text-blue-400 hover:underline">Login</span>
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;
